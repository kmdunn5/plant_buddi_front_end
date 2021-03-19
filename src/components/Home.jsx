import React, { Component } from 'react'


class Home extends Component {

  render() {
    return (
      <div>
        <div className='header-container'>
          <div className='hero'>
            <div className='center-hero'>
              <h1 className='hero-header'>Plant Buddi</h1>
              <p className='large-text'>Your Buddi Care Tracker</p>
            </div>
          </div>
        </div>
        <div className='form-content'>
          <h1>What Does Plant Buddi Do?</h1>
          <div className='feature-group'>
            <img src="https://i.ibb.co/w4x4jFC/3df51f155b9083e5facd284384d85c70c7605e8c.jpg" border="0" alt='wild hops' className='feature-image'/>
            <div className='feature-group-text'>
              <h2>Plant Buddi Do Dis</h2>
              <p>Plant Buddi allows you to list out all of the Buddis you love and take care of! Get a new Buddi? You can add it! Revived an old Buddi? Add it! Sent your Buddi to a farm somewhere upstate? Delete it!</p>
            </div>
          </div>
          <div className='feature-group'>
            <div className='feature-group-text'>
              <h2>Plant Buddi Do Dat</h2>
              <p>Plant Buddi also lets you keep track of how well you are taking care of your Buddis! Want to see how often you should water them? List it here! Want to know when you last fertilized them? Update that as you go! Need to make sure you don't over water? We got you! Record it here and never forget again!</p>
            </div>
            <img src="https://i.ibb.co/Bcqyh6T/IMG-8264.jpg" alt='red flower' className='feature-image'/>
          </div>
          <div className='feature-group'>
            <img src="https://i.ibb.co/Kjk2ZJV/grape-hyacinths-royalty-free-image-115961090-1544041991.jpg" alt="grape hyacinths" border="0" className='feature-image'/>
            <div className='feature-group-text'>
              <h2>Plant Buddi Do It All</h2>
              <p>Plant Buddi is your one-stop-shop for all things home plant care. Anything you want to know, we can keep track of it for you! And don't forget to give your Buddi a nickname! That way we can love your Buddi too!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

}       


export default Home;