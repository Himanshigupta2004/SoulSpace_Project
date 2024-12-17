import React from 'react'
import './Topbar.css'
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
const Topbar = () => {
  return (
    <div className='topbar'>
      <div className='topbar-inner-div'><input type="search" placeholder='search'className='search-bar' /><div className='side-div'><FaSearch className='search-icon'/></div></div>
      <div className='user-div'><FaUser className='user-icon'/></div>
    </div>
  )
}

export default Topbar
