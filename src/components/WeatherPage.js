import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as action from '../actions/action';
import WeatherImdb from './common';
import '../style/common.css';
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
                <div className="App-btn-div">
                    <Link to="/imdbRating"><button className="App-btn">Get IMDB Rating</button></Link>
                    <Link to="/blog"><button className="App-btn" >Blog</button></Link>
                </div>
                {this.props.weather === undefined ? <div className="loader"></div>
                    :<div> 
                        {this.props.weather && <WeatherImdb data= { this.props.weather } />}
                    </div>
                }
                
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
  