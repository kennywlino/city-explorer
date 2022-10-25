import React from 'react';
import axios from 'axios';

import CityDisplay from './CityDisplay';
import ErrorDisplay from './ErrorDisplay';

import './CitySearchForm.css';

class CitySearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city : '',
            cityData: [],
            mapImageData: '',
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

    getCityData = async (event) => {
        event.preventDefault();

        try {
            let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
            let cityData = await axios.get(url);
            let lon = cityData.data[0].lon;
            let lat = cityData.data[0].lat;
            let mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10`;
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
                    <label>Enter a location:
                        <input type="text" onInput={this.handleInput}/>
                        <button type="submit">Explore!</button>
                    </label>
                </form>
                {
                    this.state.city !== '' && this.state.cityData.length !== 0 && !this.state.error
                    ?
                    <CityDisplay
                        cityData={this.state.cityData}
                        mapImageData={this.state.mapImageData}
                    /> 
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