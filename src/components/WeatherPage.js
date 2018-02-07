import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as weatherActions from '../actions/weatherActions';
import WeatherImdb from './common';
import WeatherList from './WeatherList';

class Weather extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            weatherData: undefined,
            temp: undefined
        }
      }

  
    componentWillReceiveProps(nextProps){
        console.log("nextprops", nextProps.weather);
        this.setState({
            weatherData:nextProps.weather,
            temp: nextProps.weather.main.temp
        });
        console.log("this.state.weatherData", this.state.weatherData);
        console.log("this.state.temp", this.state.temp);
    }
    render(){
        console.log("this.state.weatherData", this.state.weatherData);
        console.log("this.state.temp", this.state.temp);
        console.log("this.prop.weatherData", this.props.weather);
        return(  
            <div> 
                {/* <WeatherImdb ={data} /> */}
                <div>
                    this app is working
                    <WeatherList data= { this.state.weather } />
                </div>
            </div>
        )
    }
}
// Weather.propTypes = {
//     weather: PropTypes.array.isRequired
// };

function mapStateToProps(state, ownProps){
    console.log("STATTEWeather", state);
    return{
        weather: state.weatherReducer
    };
}
function mapDispatchToProps(state,ownProps){

}
export default connect (mapStateToProps)(Weather);
  