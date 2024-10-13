import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Navbar.css';
import logo1 from '../assets/black_logo.png';
import logo2 from '../assets/white_logo.png';
import { FaHouse } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { TbMoodCheck } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

const Navbar = () => {
  const [showdiv, setshowdiv] = useState(false);
  
  return (
    <nav className='navbar'>
      <div className='nav-sec1'>
        <img src={logo1} className='nav-img' alt="Logo" />
      </div>
      <div className='nav-sec2'>
        <ul className='nav-items'>
          <li className='item'><CgProfile className='icon' />Profile</li>
          <li className='item'><FaHouse className='icon' />Home</li>
          <li className='item'><FaQuestionCircle className='icon' />About</li>
          <li className='item'><Link to="/"><MdQuestionAnswer className='icon' />Friends</Link></li>
          <li className='item'><TbMoodCheck className='icon' />Mood Tracking</li>
          <li className='item' onClick={() => setshowdiv(!showdiv)}>
            <MdExpandMore className='icon' />
            Activities
            {showdiv && (
              <ul className='inner-item'>
                <li className='item2'>Event</li>
                <li className='item2'>Journal</li>
                <li className='item2'>Blogging</li>
                <li className='item2'><Link to="/HomePage">Video Call</Link></li>
              </ul>
            )}
          </li>
          <li className='item'><Link to="/Register"><MdOutlineLogin className='icon' />Sign up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
