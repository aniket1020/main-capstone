import { useState } from 'react'
import './css/UserProfile.css'
import NavBar from './NavBar'
import Footer from './Footer'
import Card from './Card'

import Image from 'react-bootstrap/Image'
import Icon,{CopyOutlined, EditOutlined, SettingOutlined} from '@ant-design/icons'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Temp JSON object for NFT cards
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
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    9:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
};

function UserProfile()
{
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
            {/* Only the profile background */}
            <div className='profileBackground'>
                <img className='profileBackgroundImage' 
                    src={ profileBackgroundImage !== null ? profileBackgroundImage : require('./images/backgroundUserProfileImage.jpeg') }
                    alt='no image'/>
            </div>
            {/* Profile user settings */}
            <div className='profileId'>
                <div className='profileCard'>
                    <Image
                        className='profileImage'
                        roundedCircle
                        height={160}
                        width={160}
                        src={profileImage !== null ? profileImage : require('./images/profileDefault.png')}
                        alt='no image'
                    />
                    <div className='profileName'>
                        <strong>
                            {profileName !== null ? profileName : <i>No Name Set</i>}
                        </strong>
                    </div>
                    <div className='profileUserName'>
                            {userName !== null ? "@"+userName : <i>No Username Set</i>}
                    </div>
                </div>
                <div className='profileUserSettings'>
                    <div className='walletAddress'>
                        {walletAddress !== null ? walletAddress : <i>No wallet address</i>}
                    </div>
                    <div className='id-copy'>
                        <CopyOutlined onClick={() => {
                            if(walletAddress)
                            {    
                                navigator.clipboard.writeText(String(walletAddress));
                                toast.success('Copied to clipboard successfully', {
                                    position: "bottom-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: false,
                                    progress: undefined,
                                });
                            }
                            else 
                            {
                                toast.error('Failed to copy to clipboard', {
                                    position: "bottom-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: false,
                                    progress: undefined,
                                });
                            }
                        }}/>
                        <ToastContainer 
                            toastStyle={{ backgroundColor: "black", color: "white" }}
                        />
                    </div>
                    <div className='id-btn editProfileBtn'><EditOutlined style={{fontSize:"16.5px"}}/>&nbsp; Edit Profile</div>
                    <div className='id-btn settingsBtn'><SettingOutlined style={{fontSize:"16.5px"}}/>&nbsp; Settings</div>
                </div>
            </div>
            <div className='userCollectionFilter'>
                <div className='userCollectionFilterOptions'>
                    <a className='userCollectionFilters'>Owned</a>
                    <a className='userCollectionFilters'>Created</a>
                    <a className='userCollectionFilters'>Artwork</a>
                    <a className='userCollectionFilters'>Liked</a>
                    <a className='userCollectionFilters'>History</a>
                </div>
            </div>
            <div className='userItemSection'>
                <div className='userItemCollection'>
                    {/* User item collection */}
                    {userCards}
                </div>
                <div className='loadMore'>
                    <div className='loadMoreButton' onClick={() => addUserCards()}>
                        Load More
                    </div>
                </div>
            </div>
            <Footer />
        </>
        )
}

export default UserProfile;