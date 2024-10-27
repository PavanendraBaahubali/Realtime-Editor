import React from 'react'
import '../styles/SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () => {
  return (
    <div className='SearchBar'>
        <input placeholder='search something...' type = 'text'></input>
        <SearchIcon />
    </div>
  )
}

export default SearchBar