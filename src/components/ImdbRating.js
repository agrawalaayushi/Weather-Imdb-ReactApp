import React  from 'react';
import Header from './Header';
import WeatherImdb from './common';

export default class ImdbRatingPage extends React.Component{

    render(){
        return( 
            <div>
                <Header/>
                <WeatherImdb  />
            </div>
        )
    }
}
