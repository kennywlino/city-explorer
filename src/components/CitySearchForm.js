import React from 'react';
import axios from 'axios';

import CityDisplay from './CityDisplay.js';
import ErrorDisplay from './ErrorDisplay.js';
import Weather from './Weather.js';

import './CitySearchForm.css';

class CitySearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city : '',
            cityData: [],
            mapImageData: '',
            forecastData: [],
            error: false,
            errorMessage: '',
            showErrorDisplay: false
        }
    }

    handOpenErrorDisplay = () => {
        this.setState({
            showErrorDisplay: true
        })
    }

    handleCloseErrorDisplay = () => {
        this.setState({
            showErrorDisplay: false
        })
    }

    getAllCityData = (event) => {
        event.preventDefault();
        this.getMapData();
        this.getForecastData();
    };

    getMapData = async () => {
        try {
            // get city data
            let cityDataurl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
            let cityData = await axios.get(cityDataurl);
            let lon = cityData.data[0].lon;
            let lat = cityData.data[0].lat;

            // get map image
            let mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=12`;
            let mapImageData = await axios.get(mapImageUrl);

            this.setState({
                cityData: cityData.data[0],
                mapImageData: mapImageData.request.responseURL,
                error: false,
            })
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDisplay: true
            })
        }
    }

    getForecastData = async () => {
        try {
            // commenting out this URL as the lat/lon values do not match completely with the sample data
            // let forecastUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`;
            let forecastUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;
            let forecastData = await axios.get(forecastUrl);
            
            this.setState({
                forecastData: forecastData.data,
                error: false,
            })
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDisplay: true
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
                <form onSubmit={this.getAllCityData}>
                    <label>Enter a location:
                        <input type="text" onInput={this.handleInput}/>
                        <button type="submit">Explore!</button>
                    </label>
                </form>
                {
                    this.state.city !== '' && this.state.cityData.length !== 0 && !this.state.error
                    ?
                    <div className='info-cards'>
                        <CityDisplay
                            cityData={this.state.cityData}
                            mapImageData={this.state.mapImageData}
                        />
                        <Weather
                            forecastData={this.state.forecastData}
                        />
                    </div>
                    :
                    this.state.city !== '' && this.state.error 
                    ?
                    <ErrorDisplay
                        errorMessage={this.state.errorMessage}
                        showErrorDisplay={this.state.showErrorDisplay}
                    />
                    :
                    <></>
                }
            </>
        );
    }
}

export default CitySearchForm;