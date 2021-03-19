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
      lastWatered: '',
      howOftenToWater: '',
      lastFertilized: '',
      lightingRequirements: '',
      notes: '',
      update: false,
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

  }

  componentDidMount() {
    fetch(baseURL + '/plants/' + this.props.match.params.id)
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => this.setState({
        plant: parsedData,
        nickName: parsedData.nickName,
        image: parsedData.image,
        lastWatered: parsedData.lastWatered,
        howOftenToWater: parsedData.howOftenToWater,
        lastFertilized: parsedData.lastFertilized,
        lightingRequirements: parsedData.lightingRequirements,
        notes: parsedData.notes,
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
    }).then(setTimeout(()=> {this.setState({ 
        redirect: true 
    })}, 1000))
  }

  // HANDLE FORM CHANGE EVENT
  handleChange = ( event ) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  // HANDLE UPDATE FRONTEND
  handleUpdatePlant = ( plant ) => {
    this.setState({
      plant: plant,
      nickName: plant.nickName,
      image: plant.image,
      lastWatered: plant.lastWatered,
      howOftenToWater: plant.howOftenToWater,
      lastFertilized: plant.lastFertilized,
      lightingRequirements: plant.lightingRequirements,
      notes: plant.notes,
      update: false
    })
  }

  // HANDLE UPDATE BACKEND
  handleUpdate = ( event, idOfPlant ) => {
    event.preventDefault()

    fetch( baseURL + '/plants/' + this.props.match.params.id, {
      method: 'PUT',
      body: JSON.stringify(
        { nickName: this.state.nickName,
          image: this.state.image,
          lastWatered: this.state.lastWatered,
          howOftenToWater: this.state.howOftenToWater,
          lastFertilized: this.state.lastFertilized,
          lightingRequirements: this.state.lightingRequirements,
          notes: this.state.notes
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then ( res => res.json() )
      .then ( resJson => {
        this.handleUpdatePlant( resJson )
    }).catch ( error => console.error( {'Error': error} ))
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
              <img src={this.state.plant.image} alt={ this.state.plant.commonName } />
            </div>
            <div className='show-plant-content'>
              <div className='show-plant-name'>
                { this.state.plant.nickName === '' &&
                  <h2>{ this.state.plant.commonName }</h2>
                }
                { this.state.plant.nickName !== '' &&
                <h2>{ this.state.plant.nickName } - { this.state.plant.commonName }</h2>
                }
                { this.state.plant.scientificName !== '' &&
                <p className='large-text'><strong>Scientific name:</strong> { this.state.plant.scientificName }</p>
                }
              </div>
              <div className='show-plant-info'>
                <div className='show-plant-info-text'>
                  <p className='large-text'><strong>Last watered:</strong> { this.state.plant.lastWatered }</p>
                  { this.state.plant.howOftenToWater !== '' &&
                  <p className='large-text'><strong>Water every:</strong>  { this.state.plant.howOftenToWater }</p>
                  }
                  { this.state.plant.lastFertilized !== '' &&
                  <p className='large-text'><strong> Last fertilized:</strong> { this.state.plant.lastFertilized }</p>
                  }
                  { this.state.plant.lightingRequirements !== '' &&
                  <p className='large-text'><strong>Light needs:</strong> { this.state.plant.lightingRequirements }</p>
                  }
                </div>
                { this.state.plant.notes !== '' &&
                <div className='show-plant-info-notes'>
                  <p className='large-text'><strong>Notes on your buddi</strong></p>
                  <p>{ this.state.plant.notes }</p>
                </div>
                }
              </div>
            </div>
          </div>
          <Link to='/plants'> <button className='primary-button'>Back to plants</button></Link>
        </div>
        ) : (
          <div className='form-container'>
          <h1>Edit Plant</h1>
          <form onSubmit={ ( event ) => this.handleUpdate( event, this.state.plant._id ) } className='add-plant-form'>
          <div className='row'>
            <div className='form-group'>
              <label htmlFor="nickName">Nick Name: </label>
              <input type="text" name="nickName" id="nickName" onChange={this.handleChange} value={ this.state.nickName } className='text-input'/>
            </div>
            <div className='form-group'>
              <label htmlFor="image">Image: </label>
              <input type="text" name="image" id="image" onChange={this.handleChange} value={ this.state.image } className='text-input'/>
            </div>
            <div className='form-group'>
              <label htmlFor="lastWatered">Last Watered: </label>
              <input type="text" name="lastWatered" id="lastWatered" onChange={this.handleChange} value={ this.state.lastWatered } className='text-input'/>
            </div>
            </div>
            <div className='row'>
            <div className='form-group'>
              <label htmlFor="howOftenToWater">How Often To Water: </label>
              <input type="text" name="howOftenToWater" id="howOftenToWater" onChange={this.handleChange} value={ this.state.howOftenToWater } className='text-input'/>
            </div>
            <div className='form-group'>
              <label htmlFor="lastFertilized">Last Fertilized: </label>
              <input type="text" name="lastFertilized" id="lastFertilized" onChange={this.handleChange} value={ this.state.lastFertilized } className='text-input'/>
            </div>
            <div className='form-group'>
              <label htmlFor="lightingRequirements">Light Needs: </label>
              <input type="text" name="lightingRequirements" id="lightingRequirements" onChange={this.handleChange} value={ this.state.lightingRequirements } className='text-input'/>
            </div>
            </div>
            <div className='row'>
            <div className='form-group'>
              <label htmlFor="notes">Notes: </label>
              <input type="text" name="notes" id="notes" onChange={this.handleChange} value={ this.state.notes } className='textarea-input'/>
            </div>
            </div>
            <div className='row-button'>
              <button className='primary-button' type="submit">Update plant buddi</button>
              <button className='secondary-button' onClick={ () => this.toggleUpdateView( ) }>Cancel</button>
            </div>
          </form>
        </div> 
        )}
      </div>
    )
  }
}
       


export default ShowPlant;