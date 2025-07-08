import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../src/context/AppContext.js';
import axios from 'axios';
import { toast } from 'react-toastify';




const ProfileMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)

  const logout = async ()=>{
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + '/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/signup')
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className="profile-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="profile">
        <div className="avatar">{userData ?  userData.name[0].toUpperCase(): "ZU"}</div>
        <p className="username">{userData ?  userData.name.toUpperCase(): "USERID"}</p>
      </div>

      {isHovered && (
        <ul className="dropdown">
          <li><Link className="dropdown-link" to="http://localhost:3000/">Profile</Link></li>
    <li><Link className="dropdown-link" to="http://localhost:3001/dashboard">Dashboard</Link></li>
    <li><Link className="dropdown-link" to="" onClick={logout}>Logout</Link></li>
          
          
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
