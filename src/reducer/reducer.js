import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function reducer(state = initialState, action){
    switch(action.type){
        case types.LOAD_WEATHER_SUCCESS:{
            // return action.weatherReducer
            return {
                ...state,
                weatherData: action.weatherReducer
            }
        }

        case types.LOAD_IMDBRATING_SUCCESS:{
            // return action.imdbRatingReducer
            return {
                ...state,
                movieData: action.imdbRatingReducer
            }
        }

        default:{
            return state;   
        }
    }
}