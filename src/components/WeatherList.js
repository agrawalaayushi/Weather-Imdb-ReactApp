import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const WeatherList = ({weather}) => {
    console.log("WEATHER WeatherList", weather);
    return(
        <div>
            <p key= {weather.name}>Location: {weather.name}</p>
            <p>Temperature: {weather.main && weather.main.temp} deg Celsius</p>
            <p>Humidity: {weather.main && weather.main.humidity} </p>
            <p>Description: {weather.weather && weather.weather[0].description}</p>
        </div>
    );
};

// WeatherList.protoTypes = {
//     weather: PropTypes.array.isRequired
// };
function mapStateToProps(state, ownProps){
    console.log("STATTE", state);
    return{
        weather: state.weatherReducer
    };
}
export default connect (mapStateToProps)(WeatherList);