import React  from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import * as action from '../actions/action';
import NewPost from './NewPost';
// import axios form 'axios';


class Blog extends React.Component{
    render(){
        return( 
            <div>
                <Header/>
                <NewPost />
            </div>
        )
    }
}    

export default Blog