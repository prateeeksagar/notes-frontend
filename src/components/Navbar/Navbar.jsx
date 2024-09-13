import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = ({ userInfo, onSearchNote, getAllNotes }) => {
  const [searchQuery, setSearchQuery]= useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login")
  }

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    getAllNotes()
  }

  return (
    <div className='bg-white gap-2  flex items-center justify-between px-6 py-2 drop-shadow'>
      <Link to={'/'}><h2 className='text-xl font-medium text-black py-2 hidden sm:block'>Notes</h2></Link>
      <SearchBar 
      value={searchQuery} 
      onChange={({ target }) => {
        setSearchQuery(target.value)
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo = {userInfo} onLogout = {onLogout}/>

    </div>
  )
}

export default Navbar
