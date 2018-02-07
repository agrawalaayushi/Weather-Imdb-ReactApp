import React  from 'react';
const weather_API_KEY =  '63cca6047af3f36befdd10d3220288b4';

export default class WeatherApi{
    static getWeather(){
        const city= 'London';
        const  country= 'UK';
        var URL= 'http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid='+ weather_API_KEY+'&units=metric';
        return fetch(URL).then(response => {
            console.log("COMING HERE", response);
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}