// src/ConnectWallet.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const ConnectWallet = ({ setProvider, setSigner }) => {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        // Create a provider and signer using the new syntax
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Set the provider and signer in the parent component
        setProvider(provider);
        setSigner(signer);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Connect Your Wallet</h2>
      <button 
        className="btn btn-primary" 
        onClick={connectWallet}
      >
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectWallet;
