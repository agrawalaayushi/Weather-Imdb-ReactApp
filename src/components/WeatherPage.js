import React from 'react';
import {connect} from 'react-redux';
import * as weatherActions from '../actions/weatherActions';
import WeatherImdb from './common';

class Weather extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            weatherData: undefined,
        }
      }
  
    componentWillReceiveProps(nextProps){
        this.setState({
            weatherData:nextProps.weather,
        });
    }
    render(){
        return(  
            <div> 
                <div>
                    <WeatherImdb data= { this.state.weather } />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return{
        weather: state.weatherReducer
    };
}
function mapDispatchToProps(state,ownProps){

}
export default connect (mapStateToProps)(Weather);
  