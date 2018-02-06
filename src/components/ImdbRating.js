import React  from 'react';
import Header from './Header';
import WeatherImdb from './common';

var data= "";
export default class ImdbRating extends React.Component{

    getImdbRatimg = async() =>{
        var imdbURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e40c17f7';
        const imdb_api_call = await fetch(imdbURL);
        data = await imdb_api_call.json(); //converting api-call to json format for readability
        console.log(data);
        this.setState({});
        console.log(data.Title);
     } 
     componentDidMount(){
         this.getImdbRatimg();
    }
 
    render(){
        return( 
            <div>
                <Header/>
                <WeatherImdb data={data} />
            </div>
        )
    }
}
