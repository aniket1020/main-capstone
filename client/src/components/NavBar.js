import { useState } from 'react';
import './css/NavBar.css';
import Logo from './images/logo.png';

import { slide as Menu } from 'react-burger-menu';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
import { setAccessToken } from '../features/accessTokenSlice';

import axios from 'axios';

function NavBar()
{    
    const walletAddress = useSelector((state) => state.user.value ? state.user.value.walletId : null)

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    let connected = false;

    // update account, will cause component re-render
    const accountChangedHandler = (newAccount) => {
        if (newAccount.length == 0)
        {
            dispatch(setUser(null));
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
            // POST Backend
            console.log("**",newAccount, walletAddress);
            if (!(walletAddress in newAccount))
            {
                axios.post('http://127.0.0.1:5000/connectWallet',{
                walletId: newAccount[0]
                })
                .then(res => 
                {
                    console.log("-->",res);
                    dispatch(setAccessToken(res.data.accessToken));
                    dispatch(setUser(res.data.user));
                })
                .catch(err => console.log(err));
            }
        }
    }

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }

    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    return <>
            <ToastContainer 
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />
            <div className="navbar">
                <img id='logo' src={Logo} onClick={() => location.pathname === '/' ? {} : navigate('/')} alt="Logo"/>
                
                <div className="navbar-links">
                    <div className='nv-link'><a href='#'>Marketplace</a></div>
                    <div className='nv-link'><a href='#'>Artwork</a></div>
                    <div className='nv-link'><a href='#'>Create</a></div>
                    <div className='nv-link'><a href='#'>Feed</a></div>

                    <div className="connect-wallet btn-custom" onClick={() => location.pathname === '/wallet' ? {} : navigate('/wallet')}>
                        <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                    </div>
                </div>

                <div id='HamMenu'>
                    <Menu width={ '280px' } right >
                        <div className='nv-link'><a href='#'>Marketplace</a></div>
                        <div className='nv-link'><a href='#'>Artwork</a></div>
                        <div className='nv-link'><a href='#'>Create</a></div>
                        <div className='nv-link'><a href='#'>Feed</a></div>

                        <div className="connect-wallet btn-custom" onClick={() => location.pathname === '/wallet' ? {} : navigate('/wallet')}>
                            <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                        </div>
                    </Menu>
                </div>
            </div>
        </> 
}

export default NavBar;