// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ethers } from 'ethers';
import NavBar from './components/Navbar';
import ConnectWallet from './components/ConnectWallet';
import CryptoWalletComponent from './components/CryptoWalletComponent';
import About from './components/About';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
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
    <Router>
      <div className="App">
        <NavBar account={account} onConnectWallet={connectWallet} />
        <div className="container mt-5">
          <ConnectWallet setProvider={setProvider} setSigner={setSigner} setAccount={setAccount} />
          <Routes>
            <Route path="/" element={signer && <CryptoWalletComponent provider={provider} signer={signer} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
