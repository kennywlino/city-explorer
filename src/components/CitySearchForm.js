import React from 'react';
import axios from 'axios';

import CityDisplay from './CityDisplay';

class CitySearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city : '',
            cityData: [],
            error: false,
            errorMessage: ''
        }
    }

    getCityData = async (event) => {
        event.preventDefault();

        try {
            let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
            let cityData = await axios.get(url);
            this.setState({
                cityData: cityData.data[0],
                error: false,
            })
            console.log(cityData.data[0]);

        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message
            })
        }
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({
            city: event.target.value
        })
    }
    
    render() {
        return (
            <>
                <form onSubmit={this.getCityData}>
                    <label>Enter a city:
                        <input type="text" onInput={this.handleInput}/>
                        <button type="submit">Explore!</button>
                    </label>
                </form>
                {
                    this.state.city !== '' && this.state.cityData.length !== 0 && !this.state.error
                    ?
                    <CityDisplay
                        cityData= {this.state.cityData}
                    /> 
                    :
                    <p>{this.state.errorMessage}</p>    
                }
                {console.log(this.state.cityData)}
            </>
        );
    }
}

export default CitySearchForm;