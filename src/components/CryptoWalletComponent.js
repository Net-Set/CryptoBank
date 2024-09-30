import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../abi/cryptoCurrency.json";
import ConnectWallet from './ConnectWallet';

// Set your contract address here
const contractAddress = "0x5236Fb1FD0c0e6f3aE9Fc904141aC188F5b0F677";

const CryptoWalletComponent = ({ provider, signer, account }) => {
    const [ethBalance, setEthBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState("");
    const [signerState, setSigner] = useState(signer); // State to manage signer
    const [accountState, setAccount] = useState(account); // State to manage account

    // Create the contract instance using ethers.js
    const walletContract = new ethers.Contract(contractAddress, contractABI, signerState);

    // Fetch ETH and Token balances when the signer or account changes
    useEffect(() => {
        if (signerState && accountState) {
            getBalances(); // Fetch balances when signer/account changes
        }
    }, [signerState, accountState]);

    const getBalances = async () => {
        try {
            // Fetch ETH balance using the smart contract
            const ethBalance = await walletContract.getEthBalance(accountState);
            // Fetch token balance using the smart contract
            const tokenBalance = await walletContract.getTokenBalance(accountState);

            // Format balances and update state
            setEthBalance(ethers.formatEther(ethBalance));
            setTokenBalance(ethers.formatUnits(tokenBalance, 18)); // Assuming token has 18 decimals
        } catch (error) {
            console.error("Error fetching balances:", error);
        }
    };

    const handleTransaction = async (transactionFn, successMessage) => {
        try {
            const tx = await transactionFn();
            await tx.wait();
            alert(successMessage);
            getBalances(); // Refresh balances after a successful transaction
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed!");
        }
    };

    const handleDeposit = () => handleTransaction(
        () => walletContract.deposit({ value: ethers.parseEther(amount.toString()) }),
        "Deposit successful!"
    );

    const handleWithdraw = () => handleTransaction(
        () => walletContract.withdraw(ethers.parseEther(amount.toString())),
        "Withdraw successful!"
    );

    const handlePurchaseTokens = () => handleTransaction(
        () => walletContract.purchaseTokens(
            ethers.parseUnits(amount.toString(), 18),
            { value: ethers.parseEther((amount * 0.01).toString()) }
        ),
        "Tokens purchased!"
    );

    const handleTransferTokens = () => handleTransaction(
        () => walletContract.transferTokens(recipient, ethers.parseUnits(amount.toString(), 18)),
        "Tokens transferred!"
    );

    return (
        <div className="container mt-4">
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
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in ETH"
                    />
                    <button className="btn btn-success mt-2" onClick={handleDeposit}>Deposit</button>
                </div>

                <div className="col-md-6 mb-3">
                    <h3>Withdraw ETH</h3>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in ETH"
                    />
                    <button className="btn btn-danger mt-2" onClick={handleWithdraw}>Withdraw</button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <h3>Purchase Tokens</h3>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in Tokens"
                    />
                    <button className="btn btn-info mt-2" onClick={handlePurchaseTokens}>Purchase</button>
                </div>

                <div className="col-md-6 mb-3">
                    <h3>Transfer Tokens</h3>
                    <input
                        type="text"
                        className="form-control"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Recipient Address"
                    />
                    <input
                        type="number"
                        className="form-control mt-2"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in Tokens"
                    />
                    <button className="btn btn-warning mt-2" onClick={handleTransferTokens}>Transfer</button>
                </div>
            </div>
        </div>
    );
};

export default CryptoWalletComponent;
