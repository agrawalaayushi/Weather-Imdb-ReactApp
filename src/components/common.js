import React  from 'react';
import {Link} from 'react-router'; 
import '../App.css';
// import {loadImdbRating} from '../actions/action';
// import {loadImdbRatingSuccess} from '../actions/action';
// import * as types from '../actions/actionTypes';


class WeatherImdb extends React.Component{
    
    render(){
        return(
            <div>    
                <div className="App-btn-div">
                    <Link to="/imdbRating"><button className="App-btn">Get IMDB Rating</button></Link>
                    <Link to="/"><button className="App-btn" >Go Back</button></Link>
                    <Link to="/blog"><button className="App-btn" >Blog</button></Link>
                </div>
                <div className="App-content">
                    {this.props.data.name && this.props.data.sys && this.props.data.sys.country &&<p> Location: {this.props.data.name}, {this.props.data.sys.country}</p>}
                    {this.props.data.main && this.props.data.main.temp && <p> Temperature: {this.props.data.main.temp} deg. Celsius</p>}
                    {this.props.data.main && this.props.data.main.humidity && <p> Humidity: {this.props.data.main.humidity}</p>}
                    {this.props.data.weather && this.props.data.weather[0].description && <p> Description: {this.props.data.weather[0].description}</p>}
                    {this.props.data.Title && <p> Title: {this.props.data.Title}</p>}
                    {this.props.data.Actors && <p> Actors: {this.props.data.Actors}</p>}
                    {this.props.data.imdbRating && <p> IMDB Rating: {this.props.data.imdbRating}</p>}
                </div>    
            </div>
        );
    }
}

export default (WeatherImdb);
