import React from 'react'
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './Home';
import Nav from './Nav'
import Stream from './Stream';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './Search';

const App = () => {
  return (
    <div style={{backgroundColor: "#201F31"}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Nav />}>
            <Route index element={<Home />} />
            <Route path='/stream/:type' element={<Stream />} />
            <Route path='/search/:type' element={<Search />} />
            <Route path='*' element={<h1 className='text-center' style={{ color: "rgba(255, 255, 255, 0.464)", padding: "50vh 0%" }}>This type of page not existed!!!</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
