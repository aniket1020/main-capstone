import './css/Wallet.css'
import NavBar from './NavBar'
import Footer from './Footer'

function Wallet()
{

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
            <div className='wallet'>
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