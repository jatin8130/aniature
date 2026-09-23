import React, { useState, useEffect, useRef } from 'react';
import './Anilist.css';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import { Popular } from './Api';

const Search = () => {
  const { type: value } = useParams();

  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);

  // cache persists across renders
  const cacheRef = useRef({});

  useEffect(() => {
    if (!value) return;

    // ✅ use cached data if exists
    if (cacheRef.current[value]) {
      setAnime(cacheRef.current[value]);
      return;
    }

    const fetchAnime = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${value}`);
        const data = await res.json();

        const list = data?.data ?? [];

        cacheRef.current[value] = list; // ✅ store cache
        setAnime(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [value]);

  return (
    <div style={{ backgroundColor: "#201F31" }}>
      <div className="container-fluid">

        {/* SEARCH RESULT */}
        <div className="anime-box">
          <div className="trending d-flex mb-2">
            <h2 style={{ color: '#FFBADE', textTransform: 'capitalize' }}>
              {value}
            </h2>
          </div>

          <div className="anime">
            {loading && <p className="text-primary">Loading...</p>}

            {!loading && anime.map((ele) => (
              <div className="card mt-3" key={ele.mal_id}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/stream/${ele.mal_id}`}
                >
                  <img
                    src={ele.images.jpg.large_image_url}
                    loading="lazy"
                    className="card-img-top"
                    alt={ele.title}
                  />
                  <div
                    className="card-body"
                    style={{
                      backgroundColor: 'white',
                      padding: '10px',
                      borderRadius: '0 0 7px 7px'
                    }}
                  >
                    <p className="card-text text-dark text-center">
                      {ele.title.length > 20
                        ? ele.title.slice(0, 20) + "..."
                        : ele.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR */}
        <h2 style={{ color: '#FFBADE', marginBottom: '30px' }}>
          Most Popular
        </h2>

        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            gap: '10px',
            backgroundColor: '#2B2A3C',
            padding: '10px 15px',
            borderRadius: '3px'
          }}
        >
          {Popular.map((ele) => (
            <div key={ele.id} className="video-details">
              <p style={{ color: 'white' }}>0{ele.id}</p>

              <img
                src={ele.img}
                loading="lazy"
                alt={ele.title}
                style={{ height: '2.5cm', width: '2cm' }}
              />

              <div>
                <p style={{ color: 'white', fontWeight: 600 }}>
                  {ele.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Search;
