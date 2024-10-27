import React from 'react'
import '../styles/TopBar.css'
import SearchBar from './SearchBar'
import TopLeft from './TopLeft'

const TopBar = () => {
  return (
    <div className='TopBar'>
        <div className='logo'><h2>Collab</h2></div>
        <SearchBar />
        <TopLeft />
    </div>
  )
}

export default TopBar