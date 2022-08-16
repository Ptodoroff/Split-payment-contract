pragma solidity 0.8.15;

contract Split {

    address owner;
    modifier onlyOwner {
        require(owner ==msg.sender, "Only the owner can execute this fn()!");
        _;
    }

    constructor (){
        owner = msg.sender;
    }

    function send (address payable[] memory _to, uint[] memory _amount) external payable onlyOwner{         // I define this fn as payable in order to spare some time cerating a separate deposit() fn
        require (_to.length == _amount.length, "Recipients and amounts array must be of the same length");
        for (uint i=0;i<_to.length;i++) {
            _to[i].transfer(_amount[i]);
        }
    }
     
     function balanceOfContract () external view returns (uint) {
        return address(this).balance;
     }

          function balanceOfRecipient (address _address) external view returns (uint) {
        return _address.balance;
     }

    }


















