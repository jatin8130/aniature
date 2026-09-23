import React, { useState } from 'react'
import './Nav.css';
import { Link, Outlet } from 'react-router-dom';
import logo from './logo.png';

const Nav = () => {

    const [search, setsearch] = useState("");

    const inputval = (e) => {
        setsearch(e.target.value);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className='logos'>
                        <img className='logo' src={logo} alt='' />
                        <Link style={{color: '#f954aa'}} className="navbar-brand" to="#">ature</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='https://aniature.vercel.app/stream/1535' className='nav-link-name'>Death Note</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='https://aniature.vercel.app/stream/28851' className='nav-link-name'>Silent Voice</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='https://aniature.vercel.app/stream/40221' className='nav-link-name'>Tower of God</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='https://aniature.vercel.app/stream/58059' className='nav-link-name'>Wistoria</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='https://aniature.vercel.app/stream/54900' className='nav-link-name'>Wind Breaker</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input style={{
                                backgroundColor: 'white',
                                color: 'black'
                            }} className="form-control me-2" type="search" placeholder="Search Anime....." onChange={inputval} aria-label="Search" />
                            <Link to={{
                                pathname: `/search/${search}`
                            }}><button style={{
                                color: 'white',
                                backgroundColor: 'black'
                            }} className="btn" type="submit">Search</button></Link>
                        </form>
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

export default Nav;
