const Split = artifacts.require("Split");
let split;

contract (" Split", (accounts) =>{
    let  recipients = [accounts[1],accounts[2], accounts[3]];                                               // I define the accounts and dummy balances in two arrays, for better readability and less verbosity
    let amounts = [20,30,50];
  
    beforeEach(async () => {
        split = await Split.deployed();
    })
   it ("Sends funds to multiple addresses at the same time", async () =>{
    const initialBalances = await Promise.all(recipients.map (address=>{ return web3.eth.getBalance(address);           // I get the initial balance for every wallet in the recipient array, but I bundle them  together via Promise.all() and map() methods
    }));
    await split.send(recipients, amounts,{from:accounts[0],value:100});
    const newBalances=await Promise.all (recipients.map (address=>{ return web3.eth.getBalance(address);              // I query the to get the updated balances
    }));
    

    recipients.forEach((_item,i)=>{
        const finalBalance = web3.utils.toBN(newBalances[i]);                                                               // I convert the balance into a big number instance in order to avoid problems with manipulating the data
        const  initialBalance = web3.utils.toBN(initialBalances[i]);
        assert (finalBalance.sub(initialBalance).toNumber() === amounts[i], "Amounts are transferred to the corresponding recepients.");   // I  subtract the finitial from the fianl balances and convert them to an oridnary number, which i then ompare to the amounts array
    });
    

   });

   it ("does not allow anyone else except for the deployer of the contract to disperse funds.", async ()=>{
       try {
        await split.send(recipients, amounts,{from:accounts[1],value:100});
       }
       catch(e){
        assert(e.message.includes("Only the owner can execute this fn()!"));
        return;
       }
       assert(false,"Throws an error when another user attempts to execute the fn().")

       
   })

   it ("Throws an error when the recipents are less then the amounts or vice versa", async ()=>{
    try {
     await split.send(recipients, [amounts[0],amounts[1]],{from:accounts[0],value:100});
    }
    catch(e){
     assert(e.message.includes("Recipients and amounts array must be of the same length"));
     return;
    }
    assert(false,"Throws an error if recipients or amounts array that are passed as argumetns are of different lengths")




});

})