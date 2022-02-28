import { useState } from 'react';
import './css/NavBar.css'
import Logo from './images/logo.png'

import { slide as Menu } from 'react-burger-menu'

function NavBar()
{
    const [walletAddress, setAddress] = useState(null);

    return  <div className="navbar">
                <img id='logo' src={Logo} alt="Logo"/>
                
                <div className="navbar-links">
                    <div className='nv-link'><a href='#'>Marketplace</a></div>
                    <div className='nv-link'><a href='#'>Artwork</a></div>
                    <div className='nv-link'><a href='#'>Create</a></div>
                    <div className='nv-link'><a href='#'>Feed</a></div>

                    <div className="connect-wallet btn-custom">
                        <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                    </div>
                </div>

                <div id='HamMenu'>
                    <Menu width={ '280px' } right >
                        <div className='nv-link'><a href='#'>Marketplace</a></div>
                        <div className='nv-link'><a href='#'>Artwork</a></div>
                        <div className='nv-link'><a href='#'>Create</a></div>
                        <div className='nv-link'><a href='#'>Feed</a></div>

                        <div className="connect-wallet btn-custom">
                            <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                        </div>
                    </Menu>
                </div>
            </div>
}

export default NavBar;