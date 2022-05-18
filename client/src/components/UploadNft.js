import './css/UploadNft.css'
import NavBar from './NavBar'
import Footer from './Footer'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const { Dragger } = Upload;

function UploadNft()
{

return (    
    <>
    <NavBar />
    <div className='UploadNft__Header'>
        <div className='UploadNft__Header__row1'>
        | <br />
        Explore{/* #F18A24 */}
    </div>
    <div className='UploadNft__Header__row2'>Upload Your Item</div>
    <div className='UploadNft__Header__row3'> Home {'>'} <span>Upload Item</span> </div>
    <div className='UploadNft_box'><Dragger >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        PNG, GIF, WEBP, MP4 or MP3. Max 100mb
      </p>
    </Dragger>
    </div>
    <div className='uploadNftCol'>
        <div className='uploadNftSectionHeader'>Item</div>
        <div className='uploadNftSectionRow'>
            {/* User Detail Input */}
            <div className='uploadNftSectionCol'>
                <div className='uploadNftLabel'>Item Name</div>
                <div className='uploadNftInput'>
                    <input id='firstName' className='uploadNftInputField' placeholder='Item Name' />
                </div>
            </div>
            <div className='uploadNftSectionCol'>
                <div className='uploadNftLabel'>Title</div>
                <div className='uploadNftInput'>
                    <input id='lastName' className='uploadNftInputField' placeholder='Title' />
                </div>
            </div>
        </div>
        <div className='uploadNftSectionRow'>
            {/* User Detail Input */}
            <div className='uploadNftSectionCol'>
                <div className='uploadNftLabel'>Creator</div>
                <div className='uploadNftInput'>
                    <input id='emailAddress' className='uploadNftInputField' placeholder='Creator' />
                </div>
            </div>
            <div className='uploadNftSectionCol'>
                <div className='uploadNftLabel'>Description</div>
                <div className='uploadNftInput'>
                    <input id='bio' className='uploadNftInputField' placeholder='Description' />
                </div>
            </div>
        </div>
        <div className='uploadNftSectionHeader'>Property</div>
        <div className='uploadNftSectionRow'>
            {/* User Detail Input */}
            <div className='uploadNftSectionCol'>
                <div className='uploadNftLabel'>Item Size</div>
                <div className='uploadNftInput'>
                    <input id='size' className='uploadNftInputField' placeholder='Size' />
                </div>
            </div>
            <div className='uploadNftSectionCol'>
                <div className='userDetailLabel'>Item Currency</div>
                <div className='userDetailInput'>
                    <input id='currency' className='userDetailInputField' placeholder='Currency' />
                </div>
            </div>
            <div className='uploadNftSectionCol'>
                <div className='userDetailLabel'>Item Price</div>
                <div className='userDetailInput'>
                    <input id='price' className='userDetailInputField' placeholder='Price' />
                </div>
            </div>
            <div className='userNftSectionCol'>
            <div className='updateNftSectionButton'>
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
                }>Upload Nft</div>
            </div>
            </div>
        </div>
 
    </div>




    </div>
    <Footer/>
    </>
    )
}

export default UploadNft