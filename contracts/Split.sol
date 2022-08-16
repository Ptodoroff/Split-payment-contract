pragma solidity 0.8.15;

contract Split {
    function send (address payable[] memory _to, uint[] memory _amount) external payable {         // I define this fn as payable in order to spare some time cerating a separate deposit() fn
        require (_to.length == _amount.length "Rcipents and amounts array must be of the same length);
        for (uint i=0;i<_to.length;i++) {
            _to[i].transfer(_amount[i]);
        }

    }


















}