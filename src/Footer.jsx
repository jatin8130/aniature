import React from 'react'
import './Footer.css';
import logo from './logo.png';

const Footer = () => {
    return (
        <div>
            <div className='container footer'>
                <div className='line'></div>
                <div className='logos m-4'>
                    <img className='logo' src={logo} alt='' />
                    <a style={{color: '#f954aa'}} className="navbar-brand" href="#">ature</a>
                 </div>
                <p className='text-center'>Copyright © Aniature. All Rights Reserved</p>
                <p className='text-center'>Made with <span className='heart'>❤</span> for anime users!</p>
                <p className='text-center'>Disclaimer: This site does not store any file on its server. All contents are provide by non-affiliated third parties.</p>
            </div>
        </div>
    )
}

export default Footer;
