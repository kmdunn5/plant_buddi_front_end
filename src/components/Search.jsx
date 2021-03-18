import React, { Component } from 'react';
import AddForm from './AddForm'


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addSelected: false,
            selectedPlant: ''
        }
    }

    goToAdd (plant, e) {
        e.preventDefault()

        this.setState({
            addSelected: true,
            selectedPlant: plant
        })
    }

    resetSearch() {
        this.setState({
            addSelected: false,
            selectedPlant: ''
        })
    }
    
    render() {
        return (
            <div className='search-container'>
                {this.state.addSelected ? 
                <AddForm plant={this.state.selectedPlant} handleAdd={this.props.handleAdd} resetSearch={this.props.resetSearch}/> :
                <div className='plant-item-grid'>
                {this.props.foundPlants.map(plant => {
                    return(
                        <div key={plant.id} className='search-plant-item'>
                            <div className='plant-item-img-search'>
                                <img className='search-card-img' src={plant.image_url} alt={plant.common_name}/>
                            </div>
                            <div>
                                <p className='search-name'>{plant.common_name}</p>
                            </div>
                            <div className='add-button'>
                                <form onSubmit={(e) => this.goToAdd(plant, e)}>
                                    <input className='addplantbutton' type="submit" value="+"/>
                                </form>
                            </div>
                        </div>
                    )
                })}
                </div>
                }
            </div>
        )
    }
}

export default Search