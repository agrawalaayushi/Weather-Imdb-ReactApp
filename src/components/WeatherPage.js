import React from 'react';
import {connect} from 'react-redux';
import * as action from '../actions/action';
import WeatherImdb from './common';

class WeatherPage extends React.Component{

    componentDidMount (){
        this.getData();
    }

    getData(){
        this.props.dispatch(action.loadWeather())
    }

    render(){
        return(  
            <div> 
                {this.props.weather && <WeatherImdb data= { this.props.weather } />}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    // console.log(state.Reducer.weatherReducer)
    console.log(state)
    return{
        weather: state.reducer.weatherData
    };
}

export default connect (mapStateToProps)(WeatherPage);
  