import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {

  render() {
    return (
      <header className="header-content">
        <div className='icons-title'>
          <div className='app-icon-container1'></div>
          <Link to='/'><h1>Plant Buddi</h1></Link>
          <div className='app-icon-container2'></div>
        </div>
        <Link to='/plants'><h4>Buddi Care Tracker</h4></Link>
        <div className='header-links'>
          <Link to='/plants'><h2>Plants!</h2></Link>
          <Link to='/signup'><h2>Sign Up</h2></Link>
          <Link to='/login'><h2>Log In</h2></Link>
        </div>
      </header>
    )
  }

}       


export default Header;