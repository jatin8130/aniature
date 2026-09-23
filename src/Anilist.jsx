import React, { useState, useEffect } from 'react'
import './Anilist.css';
import { Link } from 'react-router-dom';
import {Api} from "./Api"

const Anilist = () => {

    const [search, setsearch] = useState("");

    const [anime, setAnime] = useState([]);

    useEffect(() => {
        getanime();
    }, []);

    const getanime = async () => {
        let limit = Math.floor((Math.random() * 21) + 11);
        await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAnime(data.data);
            });
    }

    const inputval = (e) => {
        setsearch(e.target.value);
    }

    return (
        <div className='anilist-container'>
            <div style={{
                width: '90%',
                margin: '0 auto'
            }}>
                <p style={{color: 'white'}} className='text-center'>If you enjoy the website please consider sharing it with your friends. And some anime can't support our website so they can not play support us i can upload soon that anime, thank you!</p>
                <form className="d-flex justify-content-center" role="search">
                    <input className="form-control me-2 filter" type="search" placeholder=" Search Anime....." onChange={inputval} value={search} aria-label="Search" />
                    <Link to={{
                        pathname: `/search/${search}`
                    }}><button
                        className="btn btn-outline-primary"
                        style={{
                            color: 'white',
                            border: '3px solid black',
                            backgroundColor: 'black',
                            borderRadius: 0
                        }}
                        type="submit"
                    >Filter</button></Link>
                </form>
            </div>

            {/* trending */}

            <div className='anime-box'>
                <div className='trending d-flex'>
                    <h2 style={{color: "#FFBADE"}}>Trending</h2>
                </div>
                <div className='anime'>
                    {Api.map((ele) => {
                        return (
                            <>
                                <div className="card mt-3" key={ele.id}>
                                    <Link style={{ textDecoration: 'none' }} to={ele.link}>
                                        <img src={ele.img2} loading='lazy' className="card-img-top" alt="loading..." />
                                        <p style={{
                                            margin: 0,
                                            padding: '5px 10px',
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            backgroundColor: 'white',
                                            borderRadius: '0 0 0 6px',
                                            color: 'black',
                                            fontWeight: 500
                                        }} className='trending-no'>{ele.id}</p>
                                        <div style={{
                                            margin: 0,
                                            backgroundColor: 'white',
                                            fontWeight: 500,
                                            padding: '10px',
                                            borderRadius: '0 0 7px 7px',
                                            height: '40px'
                                        }} 
                                        className="card-body">
                                            <p className="card-text text-dark text-center">{ele.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

            {/* All anime */}

            <div className='anime-box'>
                <div className='trending d-flex'>
                    <h2 style={{color: '#FFBADE'}}>All Anime</h2>
                </div>
                <div className='anime'>
                    {anime?.length ? anime.map((ele) => {
                        return (
                            <>
                                <div className="card mt-3" key={ele.mal_id}>
                                    <Link style={{ textDecoration: "none" }} to={{
                                        pathname: `/stream/${ele.mal_id}`
                                    }}><img src={ele.images.jpg.large_image_url} loading='lazy' className="card-img-top" alt="loading..." />
                                        <div style={{
                                            margin: 0,
                                            backgroundColor: 'white',
                                            fontWeight: 500,
                                            padding: '10px',
                                            borderRadius: '0 0 7px 7px',
                                            height: '40px'
                                        }} 
                                        className="card-body">
                                            <p className="card-text text-dark text-center">{ele.title}</p>
                                        </div></Link>
                                </div>
                            </>
                        )
                    }) : <p className='text-primary'>Loading...</p>}
                </div>
            </div>

        </div>
    )
}

export default Anilist;
