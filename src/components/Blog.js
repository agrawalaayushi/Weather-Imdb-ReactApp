import React  from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import PostList from './PostList';
// import axios form 'axios';


class Blog extends React.Component{
    render(){
        return( 
            <div>
                <Header/>
                <PostList />
            </div>
        )
    }
}    

export default Blog