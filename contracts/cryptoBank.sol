// SPDX-License-Identifier: MIT
// 0x5236Fb1FD0c0e6f3aE9Fc904141aC188F5b0F677
pragma solidity ^0.8.0;

contract SimpleCryptoWallet {
    
    // State variables
    address public owner; // Contract owner
    mapping(address => uint256) public balances; // Track ETH balances for each address
    mapping(address => uint256) public tokenBalances; // Track token balances for each address
    
    uint256 public totalSupply; // Total supply of the token
    string public tokenName = "MyToken"; // Name of the token
    string public tokenSymbol = "MTK"; // Symbol of the token
    uint8 public decimals = 18; // Decimal places for token
    
    // Token price (in wei per token)
    uint256 public tokenPrice = 1e16; // 0.01 ETH per token
    
    // Events
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed receiver, uint256 amount);
    event TokenPurchased(address indexed buyer, uint256 amount);
    event TokenTransfer(address indexed from, address indexed to, uint256 amount);
    
    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
        totalSupply = 1000000 * 10 ** uint256(decimals); // 1 million tokens with 18 decimals
        tokenBalances[owner] = totalSupply; // Assign all tokens to the contract owner initially
    }

    // Modifier to restrict certain functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this function");
        _;
    }
    
    // Function to deposit ETH into the wallet
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Function to withdraw ETH from the wallet
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, _amount);
    }
    
    // Function to purchase tokens with ETH
    function purchaseTokens(uint256 _tokenAmount) public payable {
        uint256 cost = _tokenAmount * tokenPrice;
        require(msg.value >= cost, "Insufficient ETH sent to purchase tokens");
        require(tokenBalances[owner] >= _tokenAmount, "Not enough tokens available for sale");
        
        tokenBalances[owner] -= _tokenAmount;
        tokenBalances[msg.sender] += _tokenAmount;
        
        // Refund excess ETH if sent more than needed
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
        
        emit TokenPurchased(msg.sender, _tokenAmount);
    }

    // Function to transfer tokens to another user
    function transferTokens(address _to, uint256 _amount) public {
        require(tokenBalances[msg.sender] >= _amount, "Insufficient token balance");
        require(_to != address(0), "Cannot transfer to the zero address");

        tokenBalances[msg.sender] -= _amount;
        tokenBalances[_to] += _amount;
        
        emit TokenTransfer(msg.sender, _to, _amount);
    }

    // Function to check the ETH balance of the wallet for a specific user
    function getEthBalance(address _user) public view returns (uint256) {
        return balances[_user];
    }

    // Function to check the token balance for a specific user
    function getTokenBalance(address _user) public view returns (uint256) {
        return tokenBalances[_user];
    }

    // Fallback function to accept ETH sent to the contract directly
    receive() external payable {
        deposit();
    }
    
    // Withdraw all ETH from the contract to the owner
    function withdrawAll() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds available to withdraw");
        payable(owner).transfer(contractBalance);
    }
}
