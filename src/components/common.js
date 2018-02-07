import React  from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'; 
import '../App.css';

const WeatherImdb = ({weather}) => {
        return(
            <div>    
                <div className="App-btn-div">
                    <Link to="/imdbRating"><button className="App-btn">Get IMDB Rating</button></Link>
                    <Link to="/"><button className="App-btn">Go Back</button></Link>
                </div>
                <div className="App-content">
                    <p key= {weather.name}>Location: {weather.name}</p>
                    <p>Temperature: {weather.main && weather.main.temp} deg Celsius</p>
                    <p>Humidity: {weather.main && weather.main.humidity} </p>
                    <p>Description: {weather.weather && weather.weather[0].description}</p>
                </div>    
            </div>
        );
    };

function mapStateToProps(state, ownProps){
    return{
        weather: state.weatherReducer
    };
}
export default connect (mapStateToProps)(WeatherImdb);
