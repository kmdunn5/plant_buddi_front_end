import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://plant-buddi-backend.herokuapp.com';
};

class ShowPlant extends Component {
  constructor ( props ) {
    super( props )
    this.state = {
      plant: '',
      nickName: '',
      image: '',
      lastWatered: 'Not Watered Yet',
      howOftenToWater: '',
      lastFertilized: '',
      lightingRequirements: '',
      notes: '',
      update: false,
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this)

  }

  // HANDLE FORM CHANGE EVENT
  handleChange = ( event ) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  componentDidMount() {
    fetch(baseURL + '/plants/' + this.props.match.params.id)
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => this.setState({
        plant: parsedData
      }),
       err=> console.log(err))
  }

  
  // TOGGLE UPDATE VIEW
  toggleUpdateView() {
    this.setState({
      update: !this.state.update
    })
  }

  deletePlant = () => {
    fetch( baseURL + '/plants/' + this.props.match.params.id, {
      method: 'DELETE'
    }).then(this.setState({ 
        redirect: true 
    }))
  }

  render() {
    if (this.state.redirect) {
      return(
        <Redirect to='/plants' />
      )
    }
    return (
      <div>
        { !this.state.update ? (
        <div className='show-plants-content'>
          <div className='user-actions-header'>
            <h2>Your Plant Buddi</h2>
            <div className='user-action-options'>
              <button className='primary-button' onClick={ () => this.toggleUpdateView() }>Edit</button>
              <button className='secondary-button' onClick={ () => this.deletePlant() }>Delete</button>
            </div>
          </div>
          <div className='show-plant-container'>
            <div className='show-plant-img'>
              <img src={this.state.plant.image} alt='Plant' />
            </div>
            <div className='show-plant-content'>
              <div className='show-plant-name'>
                <h2>{ this.state.plant.nickName } - { this.state.plant.commonName }</h2>
                <p>{ this.state.plant.scientificName }</p>
              </div>
              <div className='show-plant-info'>
                <div className='show-plant-info-text'>
                  <p className='large-text'>Last watered: { this.state.plant.lastWatered }</p>
                  <p className='large-text'>Water every: { this.state.plant.howOftenToWater }</p>
                  <p className='large-text'>Last fertilized: { this.state.plant.lastFertilized }</p>
                  <p className='large-text'>Light needs: { this.state.plant.lightingRequirements }</p>
                </div>
                <div className='show-plant-info-notes'>
                  <p className='large-text'>Notes on your buddi</p>
                  <p>{ this.state.plant.notes }</p>
                </div>
              </div>
            </div>
          </div>
          <Link to='/plants'> <button className='primary-button'>Back to plants</button></Link>
        </div>
        ) : (
          <div>
          <h1>Edit Plant</h1>
          <form>
            <div className='input-couple'>
              <label htmlFor="nickName">Nick Name: </label>
              <input type="text" name="nickName" id="nickName" onChange={this.handleChange} value={ this.state.plant.nickName }/>
            </div>
            <div className='input-couple'>
              <label htmlFor="image">Image: </label>
              <input type="text" name="image" id="image" onChange={this.handleChange} value={ this.state.plant.image }/>
            </div>
            <div className='input-couple'>
              <label htmlFor="lastWatered">Last Watered: </label>
              <input type="text" name="lastWatered" id="lastWatered" onChange={this.handleChange} value={ this.state.lastWatered }/>
            </div>
            <div className='input-couple'>
              <label htmlFor="howOftenToWater">How Often To Water: </label>
              <input type="text" name="howOftenToWater" id="howOftenToWater" onChange={this.handleChange} value={ this.state.plant.howOftenToWater } />
            </div>
            <div className='input-couple'>
              <label htmlFor="lastFertilized">Last Fertilized: </label>
              <input type="text" name="lastFertilized" id="lastFertilized" onChange={this.handleChange} value={ this.state.plant.lastFertilized }/>
            </div>
            <div className='input-couple'>
              <label htmlFor="lightingRequirements">Light Needs: </label>
              <input type="text" name="lightingRequirements" id="lightingRequirements" onChange={this.handleChange} value={ this.state.plant.lightingRequirements } />
            </div>
            <div className='input-couple'>
              <label htmlFor="notes">Notes: </label>
              <input type="text" name="notes" id="notes" onChange={this.handleChange} value={ this.state.plant.notes }/>
            </div>
            <div className='form-actions'>
              <button className='primary-button' type="submit">Update plant buddi</button>
              <button className='secondary-button' onClick={ () => this.toggleUpdateView( this.state.plant._id ) }>Cancel</button>
            </div>
          </form>
        </div> 
        )}
      </div>
    )
  }
}
       


export default ShowPlant;