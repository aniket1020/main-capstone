import { useState } from 'react'
import './css/EditProfile.css'
import NavBar from './NavBar'
import Footer from './Footer'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Image from 'react-bootstrap/Image'

function EditProfile()
{

    const [profileBackgroundImage, setBackgroundImage]  = useState(null);
    const [profileImage, setProfileImage]               = useState(null);

    return (
        <>
            <NavBar/>
            <ToastContainer 
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />
            <div className='profileBackground'>
                <img className='profileBackgroundImage' 
                    src={ profileBackgroundImage !== null ? profileBackgroundImage : require('./images/backgroundUserProfileImage.jpeg') }
                    alt='no image'
                />
                <img id='editProfileBackground'
                    src={ require('./images/verticalCross.png') }
                    alt='no image'
                    onClick={() => {}}
                />
            </div>
            <div className='userDetails'>
                <div className='imageCol'>
                    <div className='profileImageCol'>
                        <Image
                            className='userProfileImage'
                            roundedCircle
                            height={160}
                            width={160}
                            src={profileImage !== null ? profileImage : require('./images/profileDefault.png')}
                            alt='no image'
                        />
                        <img id='editProfileImage'
                            src={ require('./images/verticalCross.png') }
                            alt='no image'
                            onClick={() => {}}
                        />
                    </div>
                    <div className='editButton'>Upload from computer</div>
                    <div className='editButton'>Delete this Image</div>
                </div>
                <div className='userDetailsCol'>
                    <div className='userDetailSectionHeader'>Account Information</div>
                    <div className='userDetailSectionRow'>
                        {/* User Detail Input */}
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>First Name</div>
                            <div className='userDetailInput'>
                                <input id='firstName' className='userDetailInputField' placeholder='First Name' />
                            </div>
                        </div>
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>Last Name</div>
                            <div className='userDetailInput'>
                                <input id='lastName' className='userDetailInputField' placeholder='Last Name' />
                            </div>
                        </div>
                    </div>
                    <div className='userDetailSectionRow'>
                        {/* User Detail Input */}
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>Email Address</div>
                            <div className='userDetailInput'>
                                <input id='emailAddress' className='userDetailInputField' placeholder='Email Address' />
                            </div>
                        </div>
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>Bio</div>
                            <div className='userDetailInput'>
                                <input id='bio' className='userDetailInputField' placeholder='Bio' />
                            </div>
                        </div>
                    </div>
                    <div className='userDetailSectionHeader'>Social Information</div>
                    <div className='userDetailSectionRow'>
                        {/* User Detail Input */}
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>Your website</div>
                            <div className='userDetailInput'>
                                <input id='personalWebsite' className='userDetailInputField' placeholder='Your website' />
                            </div>
                        </div>
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>Facebook</div>
                            <div className='userDetailInput'>
                                <input id='facebookId' className='userDetailInputField' placeholder='Facebook' />
                            </div>
                        </div>
                    </div>
                    <div className='userDetailSectionRow'>
                        {/* User Detail Input */}
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>Twitter</div>
                            <div className='userDetailInput'>
                                <input id='twitterId' className='userDetailInputField' placeholder='Twitter' />
                            </div>
                        </div>
                        <div className='userDetailSectionCol'>
                            <div className='userDetailLabel'>Instagram</div>
                            <div className='userDetailInput'>
                                <input id='instagramId' className='userDetailInputField' placeholder='Instagram' />
                            </div>
                        </div>
                    </div>
                    <div className='userDetailSectionRow'>
                        <div className='updateProfileSectionButton'>
                            <div className='updateProfileButton' onClick={() => 
                                {
                                    toast.success('Profile updated successfully', {
                                        position: "bottom-center",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                    });
                                }
                            }>Update Your Profile</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default EditProfile;