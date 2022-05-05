import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'

import './css/Wallet.css';
import NavBar from './NavBar';
import Footer from './Footer';

import { useDispatch } from 'react-redux';
import { setWalletAddress } from '../features/walletAddressSlice';
import { setAccessToken } from '../features/accessTokenSlice';

function Wallet() {

    const dispatch = useDispatch()

    let connected = false;

    const handleMetamask = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask Here!');

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                    toast.success('Metamask wallet connected successfully', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
                    // POST Backend
                    axios.post('http://127.0.0.1:5000/connectWallet',{
                        walletId: result[0]
                        })
                    .then(res => 
                        {
                            dispatch(setAccessToken(res.data.accessToken));
                            dispatch(setWalletAddress(result[0]));
                        })
                    .catch(err => console.log(err));
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Error connecting to wallet', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
                });
        } else {
            console.log('Need to install MetaMask');
            toast.error('Please install MetaMask browser extension to interact', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    // update account, will cause component re-render
    const accountChangedHandler = (newAccount) => {

        if (newAccount.length == 0)
        {
            dispatch(setWalletAddress(null));
            if (connected)
            {
                toast.error('Metamask wallet disconnected', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                connected = false;
            }
        }
        else 
        {
            connected = true;
        }
    }

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }

    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    return (
        <>
            <NavBar />
            <ToastContainer 
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />
            <div className='Wallet__Header'>
                <div className='Wallet__Header__row1'>
                    | <br />
                    Explore{/* #F18A24 */}
                </div>
                <div className='Wallet__Header__row2'>Connect Your Wallet</div>
                <div className='Wallet__Header__row3'> Home {'>'} <span>Wallet</span> </div>
                <div className='walletSection'>
                    <div className='walletRow'>
                        <div className='wallet' onClick={() => handleMetamask()}>
                            <img className='walletImage' src={require('./images/metamask.png')} alt=""></img>
                            <div className='walletName'>Metamask</div>
                        </div>
                        <div className='wallet'>
                            <img className="walletImage" src={require('./images/coinbase.png')} alt=""></img>
                            <div className='walletName'>Coinbase</div>
                        </div>
                        <div className='wallet'>
                            <img className="walletImage" src={require('./images/binance.png')} alt=""></img>
                            <div className='walletName'>Binance</div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Wallet