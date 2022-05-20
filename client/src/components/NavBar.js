import { useEffect } from 'react';
import './css/NavBar.css';
import Logo from './images/logo.png';

import { slide as Menu } from 'react-burger-menu';
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
import { setAccessToken } from '../features/accessTokenSlice';

function NavBar()
{    
    const walletAddress = useSelector((state) => state.user.value ? state.user.value.walletId : null)

    const dispatch = useDispatch();

    const location = useLocation();

    let connected = false;

    useEffect(() => {
        // listen for account changes
        window.ethereum.on('accountsChanged', accountChangedHandler);
        window.ethereum.on('chainChanged', chainChangedHandler);
    })

    // update account, will cause component re-render
    const accountChangedHandler = (newAccount) => {
        if (newAccount.length == 0)
        {
            dispatch(setUser(null));
            dispatch(setAccessToken(null));
            if (connected)
            {
                // localStorage.clear();
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

    return <>
            <ToastContainer 
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />
            <div className="navbar">
                {location.pathname === '/' ? <img id='logo' src={Logo} alt="Logo"></img> : <Link className='nv-link' to='/'><img id='logo' src={Logo} alt="Logo"></img></Link>}
                
                <div className="navbar-links">
                    <div className='nv-link'>Marketplace</div>
                    <div className='nv-link'>{location.pathname === '/userProfile' ? "Artwork" : <Link className='nv-link' style={{ textDecoration: 'none' }} to='/userProfile'>Artwork</Link>}</div>
                    <div className='nv-link'>{location.pathname === '/upload' ? "Create" : <Link className='nv-link' style={{ textDecoration: 'none' }} to='/upload'>Create</Link>}</div>
                    <div className='nv-link'>Feed</div>

                    {
                        location.pathname === '/wallet' ? 
                        <div className="connect-wallet btn-custom">
                            <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                        </div>
                        :
                        <Link to='/wallet' style={{textDecoration:'none', color:'white'}}>
                            <div className="connect-wallet btn-custom">
                                <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                            </div>
                        </Link>
                    }
                </div>

                <div id='HamMenu'>
                    <Menu width={ '280px' } right >
                        <div className='nv-link'>Marketplace</div>
                        <div className='nv-link'>{location.pathname === '/userProfile' ? "Artwork" : <Link className='nv-link' to='/userProfile'>Artwork</Link>}</div>
                        <div className='nv-link'>{location.pathname === '/upload' ? "Create" : <Link className='nv-link' to='/upload'>Create</Link>}</div>
                        <div className='nv-link'>Feed</div>

                        {
                            location.pathname === '/wallet' ? 
                            <div className="connect-wallet btn-custom">
                                <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                            </div>
                            :
                            <Link to='/wallet' style={{textDecoration:'none', color:'white'}}>
                                <div className="connect-wallet btn-custom">
                                    <div className='connect-wallet-content'>{walletAddress !== null ? String(walletAddress) : "Connect Wallet"}</div>
                                </div>
                            </Link>
                        }
                    </Menu>
                </div>
            </div>
        </> 
}

export default NavBar;