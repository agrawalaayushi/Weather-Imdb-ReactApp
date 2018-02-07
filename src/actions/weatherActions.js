import WeatherApi from '../api/WeatherApi';
import * as types from './actionTypes';

export function loadWeather(){
    return function(dispatch){
        return WeatherApi.getWeather().then(weather => {
            console.log("WORKING", weather);
            dispatch(loadWeatherSuccess(weather));
        }).catch(error =>{
            throw(error);
        });
    };
}                   

export function loadWeatherSuccess(weatherReducer){
    console.log("WORKING @", weatherReducer);
    return {type: types.LOAD_WEATHER_SUCCESS, weatherReducer};
}