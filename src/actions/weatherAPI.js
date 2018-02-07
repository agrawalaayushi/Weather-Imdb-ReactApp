import * as types from './actionTypes';  
import weatherAPI from '../api/WeatherApi';

export function loadWeatherSuccess(weather){
    return {
        type: 'LOAD_WEATHER_SUCCESS', weather}; // specifies type of action and includes the weather payload object
    }

// export const getImdbRating = ()=>{
//     return{
//         type: 'GET_IMDBRATING',
//     }
// }

// export const goBack = () =>{
//     return{
//         type:'GET_WEATHER',
//     }
// }