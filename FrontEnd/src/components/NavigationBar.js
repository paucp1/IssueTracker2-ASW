import React from 'react'
import '../assets/css/NavBarStyles.css'
import { Link, Outlet } from 'react-router-dom'

export const NavigationBar = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
  };


  return (
    <div>
        <nav>
            <h1 class="app-title">Issue Tracker</h1>
            <ul>
              <li>
                <Link to="/"><a>Issues</a></Link>
              </li>
              <li>
                <Link to="/activities"><a>My Activities</a></Link>
              </li>
              <li>
                <Link to="/users"><a>Users</a></Link>
              </li>
              <li>
                <Link to="/edit_profile"><a>Edit profile</a></Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout}><a>Logout</a></Link>
              </li>
            </ul>
        </nav>
        <hr />
        <Outlet/>
    </div>
  )
}