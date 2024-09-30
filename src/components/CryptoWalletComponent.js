import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../abi/cryptoCurrency.json";
import '../App.css'; // Import the CSS file for styles

const contractAddress = "0x5236Fb1FD0c0e6f3aE9Fc904141aC188F5b0F677";

const CryptoWalletComponent = ({ provider, signer, account, isDarkMode }) => {
    const [ethBalance, setEthBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const walletContract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        const fetchBalances = async () => {
            if (signer && account) {
                try {
                    const ethBalance = await walletContract.getEthBalance(account);
                    const tokenBalance = await walletContract.getTokenBalance(account);

                    console.log("Fetched ETH Balance (raw):", ethBalance.toString());
                    console.log("Fetched Token Balance (raw):", tokenBalance.toString());

                    setEthBalance(parseFloat(ethers.formatEther(ethBalance)).toFixed(4));
                    setTokenBalance(parseFloat(ethers.formatUnits(tokenBalance, 18)).toFixed(4));
                } catch (error) {
                    console.error("Error fetching balances:", error);
                }
            }
        };

        fetchBalances();
    }, [signer, account]);

    // Log when isDarkMode changes
    useEffect(() => {
        console.log(`isDarkMode changed: ${isDarkMode ? 'Dark Mode' : 'Light Mode'}`);
    }, [isDarkMode]);

    const handleTransaction = async (transactionFn, successMessage) => {
        try {
            const tx = await transactionFn();
            await tx.wait();
            alert(successMessage);
            await getBalances();
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed!");
        }
    };

    const getBalances = async () => {
        if (account) {
            try {
                const ethBalance = await walletContract.getEthBalance(account);
                const tokenBalance = await walletContract.getTokenBalance(account);

                console.log("Fetched ETH Balance (raw):", ethBalance.toString());
                console.log("Fetched Token Balance (raw):", tokenBalance.toString());

                setEthBalance(parseFloat(ethers.formatEther(ethBalance)).toFixed(4));
                setTokenBalance(parseFloat(ethers.formatUnits(tokenBalance, 18)).toFixed(4));
            } catch (error) {
                console.error("Error fetching balances:", error);
            }
        }
    };

    const handleDeposit = () => handleTransaction(
        () => walletContract.deposit({ value: ethers.parseEther(amount) }),
        "Deposit successful!"
    );

    const handleWithdraw = () => handleTransaction(
        () => walletContract.withdraw(ethers.parseEther(amount)),
        "Withdraw successful!"
    );

    const handlePurchaseTokens = () => handleTransaction(
        () => walletContract.purchaseTokens(
            ethers.parseUnits(amount, 18),
            { value: ethers.parseEther((amount * 0.01).toString()) }
        ),
        "Tokens purchased!"
    );

    const handleTransferTokens = () => handleTransaction(
        () => walletContract.transferTokens(recipient, ethers.parseUnits(amount, 18)),
        "Tokens transferred!"
    );

    return (
        <div 
            className={`container mt-4 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-black'}`} 
            style={{ 
                borderRadius: '5px', 
                padding: '20px', 
                boxShadow: isDarkMode ? '0 4px 15px rgba(255, 255, 255, 0.1)' : '0 4px 15px rgba(0, 0, 0, 0.1)', 
                transition: 'all 0.3s ease-in-out'
            }}
        >
            <h2 className="text-center">Crypto Wallet</h2>
            <button className="btn btn-primary mb-3" onClick={getBalances}>Refresh Balances</button>
            <div className="mb-4">
                <p><strong>ETH Balance:</strong> {ethBalance} ETH</p>
                <p><strong>Token Balance:</strong> {tokenBalance} Tokens</p>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <h3>Deposit ETH</h3>
                    <input
                        type="number"
                        className={`form-control ${isDarkMode ? 'bg-dark text-white' : ''}`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in ETH"
                        style={{ color: isDarkMode ? 'white' : 'black' }} // Text color
                    />
                    <button className="btn btn-success mt-2" onClick={handleDeposit}>Deposit</button>
                </div>

                <div className="col-md-6 mb-3">
                    <h3>Withdraw ETH</h3>
                    <input
                        type="number"
                        className={`form-control ${isDarkMode ? 'bg-dark text-white' : ''}`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in ETH"
                        style={{ color: isDarkMode ? 'white' : 'black' }} // Text color
                    />
                    <button className="btn btn-danger mt-2" onClick={handleWithdraw}>Withdraw</button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <h3>Purchase Tokens</h3>
                    <input
                        type="number"
                        className={`form-control ${isDarkMode ? 'bg-dark text-white' : ''}`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in Tokens"
                        style={{ color: isDarkMode ? 'white' : 'black' }} // Text color
                    />
                    <button className="btn btn-info mt-2" onClick={handlePurchaseTokens}>Purchase</button>
                </div>

                <div className="col-md-6 mb-3">
                    <h3>Transfer Tokens</h3>
                    <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-dark text-white' : ''}`}
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Recipient Address"
                        style={{ color: isDarkMode ? 'white' : 'black' }} // Text color
                    />
                    <input
                        type="number"
                        className={`form-control mt-2 ${isDarkMode ? 'bg-dark text-white' : ''}`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in Tokens"
                        style={{ color: isDarkMode ? 'white' : 'black' }} // Text color
                    />
                    <button className="btn btn-warning mt-2" onClick={handleTransferTokens}>Transfer</button>
                </div>
            </div>
        </div>
    );
};

export default CryptoWalletComponent;
