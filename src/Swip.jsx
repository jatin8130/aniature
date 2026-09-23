import React from 'react'
import "./Swip.css";
import { Api } from "./Api";
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Home = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[ Autoplay, Pagination]}
                className="mySwiper"
            >
                {
                    Api.map((ele, ind) => {
                        return (
                            <SwiperSlide key={ele.id} className='swiperslide'>
                                <div className='img-div'>
                                    <img className='imgg' src={ele.img} loading='lazy' />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    marginLeft: '20px',
                                    gap: '10px'
                                }} className='div-img'>
                                    <h5 style={{
                                        color: '#FFBADE'
                                    }}>#{ele.id} Spotlight</h5>
                                    <h2 style={{
                                        color: 'white',
                                        textAlign: 'start'
                                    }}>{ele.name}</h2>
                                    <p style={{
                                        fontSize: '0.45cm',
                                        color: 'white',
                                        textAlign: "start"
                                    }}
                                        className='synopsis'>{ele.synopsis}</p>
                                    <Link to={ele.link}>
                                        <button className='banner-btn'><i className="ri-video-on-fill"></i> Watch Now</button>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>


        </div>
    )
}

export default Home;
