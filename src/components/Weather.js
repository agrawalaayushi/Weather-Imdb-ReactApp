import React  from 'react';
import WeatherImdb from './common';

const weather_API_KEY =  '63cca6047af3f36befdd10d3220288b4';
var data;
export default class Weather extends React.Component{

    componentWillMount(){
        this.getWeather();
    }
    getWeather = async() => {
        const city= 'London';
        const  country= 'UK';
        var URL= 'http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid='+ weather_API_KEY+'&units=metric';
        const api_call = await fetch(URL);
        data = await api_call.json(); //converting api-call to json format for readability
        console.log(data);
        // this.setState({});
    };
    render(){
        console.log(data);
        return(  
            <div> 
                <WeatherImdb data={data} />
            </div>
        )
    }
}
  