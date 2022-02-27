import { useState } from 'react'
import './css/UserProfile.css'
import './css/NFTCardStyles.css'
import NavBar from './NavBar'
import Footer from './Footer'

import Image from 'react-bootstrap/Image'
import {CopyOutlined, EditOutlined, SettingOutlined} from '@ant-design/icons'

const card = (
    <div className='userItemCard'>
        <img className='cardMedia' src='https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif'/>
        <div className='cardContent'>
            <div className='cardRow'>
                <div className='cardTitle'>NFT Monkeys</div>
                <div className='cardTags'>
                    <div className='cardTag'>3D</div>
                    <div className='cardTag'>ART</div>
                    <div className='cardTag'>AUDIO</div>
                </div>
            </div>
            <div className='cardRow'>
                <div className='cardSubTitle'>Price</div>
            </div>
            <div className='cardRow'>
                <div className='cardPrice'>4 ETH</div>
            </div>
            <div className='cardRow'>
                <div className='cardSubTitle'>Created by</div>
                <div className='cardSubTitle'>Owner</div>
            </div>
            <div className='cardRow'>
                <div className='cardText'>@sanya</div>
                <div className='cardText'>@vijaypatil</div>
            </div>
        </div>
    </div>
);

function userItemCardBuilder()
{
    return <>{card}</>
}

function Home()
{

    const [profileBackgroundImage, setBackgroundImage]  = useState(null);
    const [profileImage, setProfileImage]               = useState(null);
    const [profileName, setProfileName]                 = useState(null);
    const [userName, setUserName]                       = useState(null);
    const [walletAddress, setWalletAddress]             = useState(null);

    return (
        <>
            <NavBar/>
            {/* Only the profile background */}
            <div className='profileBackground'>
                <img className='profileBackgroundImage' 
                    src={require('./images/backgroundUserProfileImage.jpeg')}
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
                        src={require('./images/profileDefault.png')}
                        alt='no image'
                    />
                    <div className='profileName'><strong>Angelina AK</strong></div>
                    <div className='profileUserName'>@ang_el</div>
                </div>
                <div className='profileUserSettings'>
                    <div className='walletAddress'>0xe3F77F24c65Baecb4EA0409895718F190a2ccbaD</div>
                    <div className='id-copy'><CopyOutlined /></div>
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
                    <div className='userItem'>
                        {userItemCardBuilder()}
                    </div>
                </div>
                <div className='loadMore'>
                    <div className='loadMoreButton'>
                        Load More
                    </div>
                </div>
            </div>
            <Footer />
        </>
        )
}

export default Home;