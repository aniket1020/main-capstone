import { useState } from 'react'
import './css/UserProfile.css'
import './css/NFTCardStyles.css'
import NavBar from './NavBar'
import Footer from './Footer'

import Image from 'react-bootstrap/Image'
import Icon,{CopyOutlined, EditOutlined, SettingOutlined} from '@ant-design/icons'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );

const HeartIcon = props => <Icon component={HeartSvg} 
onClick={(e) => e.target.style.color = e.target.style.color === 'gray'?'hotpink':'gray'} {...props} />;

// Temp JSON object for NFT cards
const cards = {
    0:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    1:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    2:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    3:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    4:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    5:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    6:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
          , title:'NFT Monkeys'
          , tags:{0:'3D',1:'ART',2:'AUDIO'}
          , price:4
          , created:'sanya'
          , owner:'vijaypatil'
    },
    7:{
        'src':'https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'
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

function userItemCardBuilder(cardItem)
{
    return <div className='userItemCard'>
        <img className='cardMedia' src={cardItem.src}/>
        <div className='cardContent'>
            <HeartIcon className='heartIcon'/>
            <div className='cardRow'>
                <div className='cardTitle'>{cardItem.title}</div>
                <div className='cardTags'>
                    {Object.keys(cardItem.tags).map(tag => <div key={tag} className='cardTag'>{cardItem.tags[tag]}</div>)}
                </div>
            </div>
            <div className='cardRow'>
                <div className='cardSubTitle'>Price</div>
            </div>
            <div className='cardRow'>
                <div className='cardPrice'>{cardItem.price} ETH</div>
            </div>
            <div className='cardRow'>
                <div className='cardSubTitle'>Created by</div>
                <div className='cardSubTitle'>Owner</div>
            </div>
            <div className='cardRow'>
                <div className='cardText'>@{cardItem.created}</div>
                <div className='cardText'>@{cardItem.owner}</div>
            </div>
        </div>
    </div>
}

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
                            <div key={key} className='userItem'>
                                {userItemCardBuilder(cards[key])}
                            </div>
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