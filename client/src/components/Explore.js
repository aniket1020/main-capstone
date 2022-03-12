import { useState } from 'react'
import './css/Explore.css'
import NavBar from './NavBar'
import Footer from './Footer'
import Card from './Card'
import {SearchOutlined} from '@ant-design/icons'


const cards = {
    0:{
            'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    1:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    2:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    3:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    4:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    5:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    6:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    7:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    8:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    9:{
        'src':'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
};

function Explore() {

    const [profileBackgroundImage, setBackgroundImage]  = useState(null);
    const [profileImage, setProfileImage]               = useState(null);
    const [profileName, setProfileName]                 = useState(null);
    const [userName, setUserName]                       = useState(null);
    const [walletAddress, setWalletAddress]             = useState(null);

    const [visibleCards, setVisibleCards] = useState(4);


    const addUserCards = () =>
    {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 4);
    }

    const userCards = Object.keys(cards).slice(0,visibleCards).map(key =>
                            <Card 
                                src={cards[key].src}            // For media src
                                title={cards[key].title}        // NFTCard title
                                tags={cards[key].tags}          // NFTCard tags
                                price={cards[key].price}        // NFTCard Price
                                created={cards[key].created}    // Creator
                                owner={cards[key].owner}        // Owner
                                key={key}                       // Unique key Id
                            />
                        );
  return (
    <>
    <NavBar/>

    <div className='Header'>
        <div className='Header__row1'> 
            | <br />
            Explore{/* #F18A24 */}
        </div>
        <div className='Header__row2'>Welcome To Explore</div> 
        <div className='Header__row3'> Home {'>'} <span>Explore</span> </div>
        
        
    </div>


    <div className="searchbar">
        <div className="searchbox"><SearchOutlined /><input type="text" placeholder='Search Items...' /></div>
        
    </div>


    <div className='exploreItemSection'>
                <div className='exploreItemCollection'>
                    {/* All Available Items */}
                    {userCards}
                </div>
                <div className='loadMore'>
                    <div className='loadMoreButton' onClick={() => addUserCards()}>
                        Load More
                    </div>
                </div>
            </div>


    <Footer/>
    </>
  )
}

export default Explore