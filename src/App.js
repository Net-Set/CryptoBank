import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ethers } from 'ethers';
import ResponsiveNavbar from './components/Navbar';
import ConnectWallet from './components/ConnectWallet'; // Ensure this component exists
import CryptoWalletComponent from './components/CryptoWalletComponent';
import About from './components/About';

function ConnectWalletMessage({ onConnectWallet }) {
    return (
        <div className="text-center">
            <h2>Please connect your wallet</h2>
            <button onClick={onConnectWallet} className="btn btn-primary">Connect Wallet</button>
        </div>
    );
}

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true); // Manage dark mode state

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

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <Router>
            <div className="App">
                <ResponsiveNavbar 
                    account={account} 
                    onConnectWallet={connectWallet} 
                    toggleDarkMode={toggleDarkMode} 
                    isDarkMode={isDarkMode} 
                />
                <div className="container mt-5">
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                signer ? (
                                    <CryptoWalletComponent 
                                        provider={provider} 
                                        signer={signer} 
                                        account={account}  
                                        isDarkMode={isDarkMode} 
                                    />
                                ) : (
                                    <ConnectWalletMessage onConnectWallet={connectWallet} />
                                )
                            } 
                        />
                        <Route path="/about" element={<About isDarkMode={isDarkMode} />} /> {/* Pass isDarkMode prop */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
