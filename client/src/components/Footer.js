import './css/FooterStyles.css'

function Footer()
{
    return (
        <div className='footerSection'>
            <div className='navSection'>
                <div className='navColumn'>
                    <div className='navHeaderTitle'>Marketplace</div>
                    <div className='navSectionLink'>Explore</div>
                    <div className='navSectionLink'>Create</div>
                    <div className='navSectionLink'>Collections</div>
                    <div className='navSectionLink'>Profile</div>
                </div>
                <div className='navColumn'>
                    <div className='navHeaderTitle'>Categories</div>
                    <div className='navSectionLink'>3D Art</div>
                    <div className='navSectionLink'>Music / Audio</div>
                    <div className='navSectionLink'>Gif</div>
                    <div className='navSectionLink'>Images</div>
                </div>
                <div className='navColumn'>
                    <div className='navHeaderTitle'>Community</div>
                    <div className='navSectionLink'>Help Center</div>
                    <div className='navSectionLink'>Contact us</div>
                </div>
                <div className='navColumn'>
                    <div className='navHeaderTitle'>Project</div>
                    <div className='navSectionLink'>About</div>
                    <div className='navSectionLink'>Documentation</div>
                </div>
                <div className='subscribeSection'>
                    <div className='navHeaderTitle'>Be Updated With Us</div>
                    <input className='subscribeInput' placeholder='Input Your Email'/>
                    <div className='subscribeInputButton'>Subscribe</div>
                </div>
            </div>
            <div className='copyrightSection'>
                <div>© Copyright Blockchain Capstone Project 2022. All Right Reserved</div>
            </div>
        </div>
    )
}

export default Footer;