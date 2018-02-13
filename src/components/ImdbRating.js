import React  from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'; 
import Header from './Header';
import * as action from '../actions/action';
import WeatherImdb from './common';
import  '../style/common.css';

class ImdbRatingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ImdbRatingData: ""
        };
    }

    componentWillMount (){
        this.getData();
    }

    getData(){
        this.props.dispatch(action.loadImdbRating())
    }

    render(){
            return( 
                <div>
                    <Header/>
                    <div className="App-btn-div">
                        <Link to="/"><button className="App-btn" >Go Back</button></Link>
                        <Link to="/blog"><button className="App-btn" >Blog</button></Link>
                    </div>
                    {this.props.ImdbRatingData === undefined ? <div className="loader"></div>
                        :<div>
                            { this.props.ImdbRatingData && <WeatherImdb data= { this.props.ImdbRatingData} />}
                        </div>
                    }
                </div>
            )
        
    }
}

function mapStateToProps(state, ownProps){
    return{
        ImdbRatingData: state.reducer.movieData,
    };
}
  
export default connect (mapStateToProps)(ImdbRatingPage);
