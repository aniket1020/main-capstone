import { useState } from 'react';
import './css/NavBar.css';
import Logo from './images/logo.png';

import { slide as Menu } from 'react-burger-menu';
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector } from 'react-redux';

function NavBar()
{
    const walletAddress = useSelector((state) => state.user.value ? state.user.value.walletId : null)

    const navigate = useNavigate();
    const location = useLocation();

    return  <div className="navbar">
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
}

export default NavBar;