import WeatherApi from '../api/WeatherApi';
import ImdbRatingApi from '../api/ImdbRatingApi';
import * as types from './actionTypes';

export function loadWeather(){ // getting API response, dispatch response to action
    return function(dispatch){
        return WeatherApi.getWeather().then(response => {
            dispatch(loadWeatherSuccess(response));
        }).catch(error =>{
            throw(error);
        });
    };
}                   

export function loadWeatherSuccess(weatherReducer){
    return {
        type: types.LOAD_WEATHER_SUCCESS, 
        weatherReducer
    };
}

export function loadImdbRating(){  
    return function(dispatch){
        return ImdbRatingApi.getImdbRating().then(response => {
            dispatch(loadImdbRatingSuccess(response));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadImdbRatingSuccess(imdbRatingReducer){
    return{
        type: types.LOAD_IMDBRATING_SUCCESS,
        imdbRatingReducer
    }
}

