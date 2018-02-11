import React, { Component } from 'react';
import NewPost from './NewPost';

export default class PostList extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [
                {   
                    id: "1",
                    title: 'The Valverine Rabbit',
                    content: 'Story about Rabbit',
                    author: 'Rabbit',
                },
                {   id: "2",
                    title: 'The Valverine Tortoise',
                    content: 'The Valverine Tortoise',
                    author: 'Tortoise',
                },
                {   id: "3",
                    title: 'The Valverine Bear',
                    content: 'The Valverine Bear',
                    author: 'Bear',
                }
            //     {   id: "4",
            //     title: 'The Valverine Bear',
            //     content: 'The Valverine Bear',
            //     author: 'Bear',
            // }
            ]
        };
      
        this.handleAddPost =    this.handleAddPost.bind(this);
    }

    handleRemovePost(index){
        this.setState({
            posts: this.state.posts.filter(function(e, i) {
                return i != index;
            })
        })
    }
    handleAddPost(post) {
        this.setState({posts: [...this.state.posts, post]})
    }
    render(){
        return(  
            <div>
                <NewPost onAddPost={this.handleAddPost}/>
              <div className= "post-card " >
                {this.state.posts.map((post, index) =>
                <div className="list-group-item col-xs-3 col-sm-4 col-md-3 col-lg-3" key={post.id}>
                    <h4 className = "list-group-item-heading">{post.title}</h4>
                    <p className = "list-group-item-heading">{post.content}</p>
                    <p className = "list-group-item-heading">{post.author}</p>
                    <button className="btn btn-danger btn-sm" onClick={this.handleRemovePost.bind(this, index)}><span className="glyphicon glyphicon-trash">Delete</span></button>
                </div>

                )}
            </div>
            </div>
        );
      
        
    }
}