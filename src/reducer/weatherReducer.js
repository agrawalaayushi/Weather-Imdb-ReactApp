import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function weatherReducer(state = initialState.weatherReducer, action){
    switch(action.type){
        case types.LOAD_WEATHER_SUCCESS:
            return action.weatherReducer
        default:
            return state;
    }
}