import './css/NavBar.css'
import Logo from './images/logo.png'

function NavBar()
{
    return  <div className="navbar">
                <img id='logo' src={Logo} alt="Logo"/>
                
                <div className="navbar-links">
                    <div className='nv-link'><a href='#'>Marketplace</a></div>
                    <div className='nv-link'><a href='#'>Artwork</a></div>
                    <div className='nv-link'><a href='#'>Create</a></div>
                    <div className='nv-link'><a href='#'>Feed</a></div>

                    <div className="connect-wallet btn-custom">
                        Connect Wallet
                    </div>
                </div>
            </div>
}

export default NavBar;