import React, { Component } from 'react';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://plant-buddi-backend.herokuapp.com';
};

class AddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickName: '',
            image: this.props.plant.image_url,
            lastWatered: 'Not Watered Yet',
            howOftenToWater: '',
            lastFertilized: '',
            lightingRequirements: '',
            notes: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch(baseURL + '/plants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                commonName: this.props.plant.common_name,
                nickName: this.state.nickName,
                scientificName: this.props.plant.scientific_name,
                image: this.state.image,
                lastWatered: this.state.lastWatered,
                howOftenToWater: this.state.howOftenToWater,
                lastFertilized: this.state.lastFertilized,
                lightingRequirements: this.state.lightingRequirements,
                notes: this.state.notes
            })
        }).then(res => res.json())
        .then(resJson => {
            this.props.handleAdd(resJson);
            this.props.resetSearch()
            this.setState({
                nickName: '',
                image: '',
                lastWatered: '',
                howOftenToWater: '',
                lastFertilized: '',
                lightingRequirements: '',
                notes: ''
            });
        }).catch (error => console.log({ 'Error': error }))
    };

    cancel() {
        this.props.resetSearch()
    }

    render() {
        return(
            <div className='form-container'>
                <h3>{this.props.plant.common_name} - <span>{this.props.plant.scientific_name}</span></h3><br/>
                <form onSubmit={this.handleSubmit} className='add-plant-form'>
                    <div className='row'>
                        <div className='form-group'>
                            <label htmlFor="nickName" className='form-label'>Nick Name: </label>
                            <input className='text-input' type="text" name="nickName" id="nickName" onChange={this.handleChange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="image" className='form-label'>Image: </label>
                            <input type="text" name="image" id="image" onChange={this.handleChange} value={this.state.image} className='text-input'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="lastWatered" className='form-label'>Last Watered: </label>
                            <input type="text" name="lastWatered" id="lastWatered" onChange={this.handleChange} className='text-input'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group'>
                            <label className='form-label' htmlFor="howOftenToWater">How Often To Water: </label>
                            <input type="text" name="howOftenToWater" id="howOftenToWater" onChange={this.handleChange} className='text-input'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="lastFertilized" className='form-label'>Last Fertilized: </label>
                            <input type="text" name="lastFertilized" id="lastFertilized" onChange={this.handleChange} className='text-input'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="lightingRequirements" className='form-label'>Light Needs: </label>
                            <input type="text" name="lightingRequirements" id="lightingRequirements" onChange={this.handleChange} className='text-input'/>
                        </div>
                    </div>
                    <div className='row notes'>
                        <div className='form-group'>
                            <label htmlFor="notes" className='form-label'>Notes: </label>
                            <textarea  name="notes" id="notes" onChange={this.handleChange} className='textarea-input' rows='5' cols='200'/>
                        </div>
                    </div>
                    <div className='row-button'>
                        <input type="submit" value="Add Plant" className='add-search-button'/>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddForm