import React  from 'react';
import '../App.css';

class WeatherImdb extends React.Component{
    
    render(){
        return(
            <div>    
               
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
