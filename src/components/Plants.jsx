import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'


let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://plant-buddi-backend.herokuapp.com';
};


class Plants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plants: [],
      foundPlants: [],
      search: '',
      searchState: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount(){
    this.getPlants()
  }

  getPlants = () => {
    fetch(baseURL + '/plants')
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => this.setState({
        plants: parsedData
      }),
       err=> console.log(err))
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search === '') {
      return
    } else {
      let searchParam = this.state.search
      fetch(baseURL + '/plants/search/' + searchParam)
      .then(data => { return data.json() }, err => console.log(err))
      .then(parsedData => this.setState({
          foundPlants: parsedData.data,
          search: '',
          searchState: true
      }), err => console.log(err));
    }
  }

  handleAdd(plant) {
    const copyPlants = [...this.state.plants];
    copyPlants.unshift(plant);
    this.setState({
        plants: copyPlants,
        searchState: false
    });
  };

  render() {
    return (
      <div>
        <div className='search-container'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='search'>Search for a Plant Buddi: </label>
            <input type="text" name='search' id='search' placeholder="Enter Your Plant's Type" onChange={this.handleChange} value={this.state.search} className='search'/>
            <input className='search-button' type="submit" value="Search"/>
          </form>
        </div>
        {this.state.searchState ? 
        <Search foundPlants={this.state.foundPlants} handleAdd={this.handleAdd}/> :
        <div className='main-content'>
          <h2>Your Buddies</h2>
          <div className='plant-item-grid'>
            { this.state.plants.map( plant => {
            return (
              <div key={ plant._id } className='plant-item'>
                <Link to={`/plants/${plant._id}`}>
                <div className='plant-item-img'>
                  <img className='card-img' src={ plant.image } alt={ plant.commonName } />
                </div>
                </Link>
                <div className='plant-item-name-content'>
                  <div className='plant-item-name-content'>
                    <div className='plant-item-name'>
                      <div className='nameandwater'>
                      <h3>{ plant.commonName }</h3>
                    </div>
                  </div>
                  <div className='plant-item-watered-content'>
                    <div className='plant-item-watered'>
                      <p className='large-text'><span className='semibold-text'>Last Watered:</span> { plant.lastWatered }</p>
                      </div>
                      <div className='editandtrashbutton'>
                      <div className='edit-icon-container'>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )
            })}
          </div>
        </div>
        }
      </div>
    )
  }
}
        

export default Plants;