import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Stream.css'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Api, Popular } from './Api'

const cleanTitle = (text = '') =>
  text.replace(/[:()/]/g, '').replace(/\s+/g, '-')

const Stream = () => {
  const { type: value } = useParams()

  const [anime, setAnime] = useState({})
  const [anify, setAnify] = useState('')
  const [anifyep, setAnifyep] = useState(0)
  const [videos, setVideos] = useState('')
  const [server, setServer] = useState('1')
  const [episode, setEpisode] = useState([])
  const [num, setNum] = useState('1')
  const [select, setSelect] = useState('1')
  const [dataanify, setDataanify] = useState('')

  /* ---------- FETCH ANIME ---------- */
  useEffect(() => {
    if (!value) return
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${value}`)
        const json = await res.json()
        const data = json.data
        setAnime(data)
        setDataanify(data?.title || '')
      } catch (err) {
        console.error(err)
      }
    }
    fetchAnime()
  }, [value])

  /* ---------- FETCH ANIFY EPISODE ---------- */
  useEffect(() => {
    if (!dataanify) return
    const fetchAnify = async () => {
      try {
        const res = await fetch(
          `https://api.anify.tv/search?type=anime&query=${dataanify}&page=1`
        )
        const json = await res.json()
        const epId =
          json?.results?.[0]?.episodes?.data?.[1]?.episodes?.[anifyep]?.id
        setAnify(epId || '')
      } catch (err) {
        console.error(err)
      }
    }
    fetchAnify()
  }, [dataanify, anifyep])

  /* ---------- GENERATE VIDEO URL ---------- */
  const makeVideo = useCallback(() => {
    let video = ''
    if (server === '1') video = `${cleanTitle(anime.title)}-episode-${num}`
    else if (server === '2') video = cleanTitle(anify)
    else video = `${cleanTitle(anime.title_english)}-episode-${num}`
    setVideos(`https://player.ryuk.to?id=${video}`)
  }, [server, num, anime, anify])

  useEffect(() => {
    makeVideo()
  }, [makeVideo])

  /* ---------- CREATE EPISODES ARRAY ---------- */
  useEffect(() => {
    if (!anime?.episodes) return
    setEpisode(Array.from({ length: anime.episodes }, (_, i) => i + 1))
  }, [anime.episodes])

  const epistate = (e) => {
    const val = e.target.value
    setNum(val)
    setSelect(val)
    setAnifyep(val - 1)
  }

  return (
    <div style={{ backgroundColor: '#201F31' }}>
      <Helmet>
        <title>{`Aniature - Watch {anime.title} for free`}</title>
        <meta
          name="description"
          content={`Watch ${anime.title} for free in aniature. All episodes are free and other anime also free in English subbed`}
        />
      </Helmet>

      <div className="container text-center pt-4">
        <div className="d-flex row stream-flex">
          {/* Video Container */}
          <div className="video-conatiner col">
            <iframe
              title={videos}
              className="anivid"
              src={videos}
              frameBorder="0"
              allowFullScreen
            />
            <p className="color text-light text-center">
              You are watching episode {num} of {anime.title}
            </p>
            <p
              className="color text-light text-center"
              style={{ backgroundColor: '#2B2A3C', borderRadius: '10px', padding: '2px' }}
            >
              If current server doesn't work please try other servers beside. And if any problem occurs please refresh page. Some anime can't play. Enjoy your anime.
            </p>

            <div className="server">
              {['1', '2', '3'].map((s) => (
                <button
                  key={s}
                  className="epivid color"
                  onClick={() => setServer(s)}
                  style={{
                    backgroundColor: server === s ? '#FFBADE' : '#2B2A3C',
                    color: server === s ? 'black' : 'white',
                    fontWeight: 600
                  }}
                >
                  Server {s}
                </button>
              ))}
            </div>

            <h5 className="text-light d-flex m-3">All Episodes :</h5>
            {episode.map((ele) => (
              <div className="epilist" key={ele}>
                <button
                  value={ele}
                  onClick={epistate}
                  className="epivid color"
                  style={{
                    backgroundColor: ele == select ? '#FFBADE' : '#2B2A3C',
                    color: ele == select ? 'black' : 'white',
                    fontWeight: 600
                  }}
                >
                  {ele}
                </button>
              </div>
            ))}

            <p className="color text-light mt-4">{anime.synopsis}</p>

            {/* Recommended Section */}
            <div className="recommanded" style={{ textAlign: 'start' }}>
              <h2 style={{ color: '#FFBADE' }}>Recommanded For You</h2>
              <div className="animes">
                {Api.map((ele) => (
                  <div className="card mt-3" key={ele.id}>
                    <Link style={{ textDecoration: 'none' }} to={ele.link}>
                      <img src={ele.img2} className="card-img-top" alt="loading..." />
                      <p
                        className="trending-no"
                        style={{
                          margin: 0,
                          padding: '5px 10px',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: 'white',
                          borderRadius: '0 0 0 6px',
                          color: 'black',
                          fontWeight: 500
                        }}
                      >
                        {ele.id}
                      </p>
                      <div
                        className="card-body"
                        style={{
                          margin: 0,
                          backgroundColor: 'white',
                          fontWeight: 500,
                          padding: '10px',
                          borderRadius: '0 0 7px 7px',
                          height: '40px'
                        }}
                      >
                        <p className="card-text text-dark text-center">{ele.name}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details + Popular Section */}
          <div className="col">
            <div
              className="video-detail"
              style={{ backgroundColor: '#2B2A3C', padding: '15px', borderRadius: '5px' }}
            >
              <p className="color">Title: <span className="detail text-light">{anime.title}</span></p>
              <p className="color">Title Japanese: <span className="detail text-light">{anime.title_japanese}</span></p>
              <p className="color">Type: <span className="detail text-light">{anime.type}</span></p>
              <p className="color">Episodes: <span className="detail text-light">{anime.episodes}</span></p>
              <p className="color">Rank: <span className="detail text-light">{anime.rank}</span></p>
              <p className="color">Season: <span className="detail text-light">{anime.season}</span></p>
              <p className="color">Year: <span className="detail text-light">{anime.year}</span></p>
            </div>

            <h2 style={{ textAlign: 'start', color: '#FFBADE', marginBottom: '30px' }}>Most Popular</h2>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                marginBottom: '40px',
                width: '100%',
                justifyContent: 'space-between',
                gap: '10px',
                backgroundColor: '#2B2A3C',
                padding: '10px 15px',
                borderRadius: '3px'
              }}
            >
              {Popular.map((ele) => (
                <div key={ele.id} className="video-details" style={{ display: 'flex', flexFlow: 'row', gap: '8px' }}>
                  <p style={{ fontSize: '16px', color: 'white', margin: 0 }}>0{ele.id}</p>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <img src={ele.img} alt="..." style={{ height: '2.5cm', width: '2cm' }} />
                    <div style={{ textAlign: 'start' }}>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: '15px', textTransform: 'capitalize' }}>{ele.title}</p>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <p style={{ backgroundColor: '#B9E7FF', color: 'black', padding: '2px 5px' }}>
                          <i className="ri-mic-fill"></i> {ele.mic}
                        </p>
                        <li style={{ color: 'white' }}>tv</li>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended bottom section */}
        <div className="recommandeds" style={{ textAlign: 'start' }}>
          <h2 style={{ color: '#FFBADE' }}>Recommanded For You</h2>
          <div className="animes">
            {Api.map((ele) => (
              <div className="card mt-3" key={ele.id}>
                <Link style={{ textDecoration: 'none' }} to={ele.link}>
                  <img src={ele.img2} className="card-img-top" alt="loading..." />
                  <p
                    className="trending-no"
                    style={{
                      margin: 0,
                      padding: '5px 10px',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: '0 0 0 6px',
                      color: 'black',
                      fontWeight: 500
                    }}
                  >
                    {ele.id}
                  </p>
                  <div
                    className="card-body"
                    style={{
                      margin: 0,
                      backgroundColor: 'white',
                      fontWeight: 500,
                      padding: '10px',
                      borderRadius: '0 0 7px 7px',
                      height: '40px'
                    }}
                  >
                    <p className="card-text text-dark text-center">{ele.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Stream
