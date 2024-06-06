// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

contract Bank{
    address public owner;
    mapping(address=>uint256) public balances;

    event Deposited(address account, uint256 amount);
    event Withdrawn(address account, uint256 amount);

    constructor(){
        owner=msg.sender;
    }
    modifier onlyOwner(){
        require(msg.sender==owner,"Access to only Owner");
        _;
    }

    function deposit() external payable{
        require(msg.value>0,"you must have some currency");
        balances[msg.sender]+=msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external{
        require(balances[msg.sender]>=amount,"not enough balance");
        balances[msg.sender]-=amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender,amount);
    
    }

    function getBalance() external view returns (uint256){
        return balances[msg.sender];
    }

}
