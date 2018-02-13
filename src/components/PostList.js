import React, { Component } from 'react';
import NewPost from './NewPost';
import PostCard from './PostCard';
import {connect} from 'react-redux';
import * as action from '../actions/action';

class PostList extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [
                {   
                    id: 1,
                    title: 'The Velveteen  Rabbit',
                    content: 'Story about Rabbit',
                    author: 'Rabbit',
                },
            ]
        };
      
        this.handleAddPost =    this.handleAddPost.bind(this);
        this.handleRemovePost =    this.handleRemovePost.bind(this);
    }

    componentWillMount(){
        if(localStorage.length !== 0) {
            const cachedPosts = JSON.parse(localStorage.getItem('posts'));
            this.setState({posts: cachedPosts});
        }
    
        localStorage.setItem("posts",JSON.stringify(this.state.posts));
    }

    handleRemovePost(index){
        let array = this.state.posts;
        array.splice(index, 1);
        this.setState({posts: array });
    }

    handleAddPost(post) {
        this.setState({
            posts: [...this.state.posts, post]
         });
    }
    componentWillUpdate(nextProps, newState){
        localStorage.setItem("posts",JSON.stringify(newState.posts));
    }
    render(){
        return(  
            <div>
                <NewPost onAddPost={this.handleAddPost}/>
              <div className= "post-card " >
                    {this.state.posts.map((post, index) =>   
                        <PostCard data = {post} key = {post.id} ondeletePost= {this.handleRemovePost.bind(this, index)}/>
                     )}
                </div>
            </div>
        );
    }
} 

export default (PostList);