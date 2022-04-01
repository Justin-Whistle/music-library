import './App.css';
import React, { useState, useRef } from 'react'
import Gallery from './components/Gallery.js';
import SearchBar from './components/SearchBar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataContext } from './context/DataContext.js'
import { SearchContext } from './context/SearchContext.js';
import AlbumView from './components/AlbumView.js';
import ArtistView from './components/ArtistView.js';



const App = () => {
  
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
}
    return (
        <div className="App">
            <h2>{message}</h2>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <React.Fragment> 
                            <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
                                <SearchBar />     
                            </SearchContext.Provider>
                            <DataContext.Provider value={data}> 
                                <Gallery />
                            </DataContext.Provider>
                        </React.Fragment>
                    } />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>  
            </Router>
        </div>
    )
}          

export default App