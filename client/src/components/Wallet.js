import React, {useState} from 'react';

import {ethers} from 'ethers'

import './css/Wallet.css';
import NavBar from './NavBar';
import Footer from './Footer';

function Wallet()
{

const [errorMessage, setErrorMessage] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [userBalance, setUserBalance] = useState(null);
const [connButtonText, setConnButtonText] = useState('Connect Wallet');

const handleMetamask = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
        console.log('MetaMask Here!');

        window.ethereum.request({ method: 'eth_requestAccounts'})
        .then(result => {
            accountChangedHandler(result[0]);
            setConnButtonText('Wallet Connected');
            getAccountBalance(result[0]);
        })
        .catch(error => {
            setErrorMessage(error.message);
        });
    } else {
        console.log('Need to install MetaMask');
        setErrorMessage('Please install MetaMask browser extension to interact');
    }
}

// update account, will cause component re-render
const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
}

const getAccountBalance = (account) => {
    window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
    .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
    })
    .catch(error => {
        setErrorMessage(error.message);
    });
};

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
                <img className='walletImage' src={require('./images/metamask.png') } alt=""></img>
                <div className='walletName'>Metamask</div>
            </div>
            <div className='wallet'>
                <img className="walletImage" src={require('./images/coinbase.png') } alt=""></img>
                <div className='walletName'>Coinbase</div>
            </div>
            <div className='wallet'>
                <img className="walletImage" src={require('./images/binance.png') } alt=""></img>
                <div className='walletName'>Binance</div>
            </div>
        </div>
    </div>

    </div>
    <Footer/>
    </>
    )
}

export default Wallet