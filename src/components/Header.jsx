import React, { Component } from 'react'


class Header extends Component {

  render() {
    return (
      <header className="header-content">
        <div className='app-icon-container1'></div>
        <h1>Plant Buddi</h1>
        <div className='app-icon-container2'></div>
        <h4>An app to track your plants friends!</h4>
        <button>Sign Up</button>
        <button>Log In</button>
      </header>
    )
  }

}       


export default Header;