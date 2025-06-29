import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';



const ProfileMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="profile-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="profile">
        <div className="avatar">ZU</div>
        <p className="username">USERID</p>
      </div>

      {isHovered && (
        <ul className="dropdown">
          <li><Link className="dropdown-link" to="http://localhost:3000/">Profile</Link></li>
    <li><Link className="dropdown-link" to="http://localhost:3000/">Setting</Link></li>
    <li><Link className="dropdown-link" to="http://localhost:3000/signup" >Logout</Link></li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
