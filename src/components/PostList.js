import React, { Component } from 'react';
import NewPost from './NewPost';

export default class PostList extends Component {
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
                // {   id: "2",
                //     title: 'The Velveteen  Tortoise',
                //     content: 'The Valverine Tortoise',
                //     author: 'Tortoise',
                // },
                // {   id: "3",
                //     title: 'The Velveteen  Bear',
                //     content: 'The Valverine Bear',
                //     author: 'Bear',
                // }
            ]
        };
      
        this.handleAddPost =    this.handleAddPost.bind(this);
    }

    componentWillMount(){
        console.log("POSTS", this.state.posts);
        if(localStorage.length !== 0) {
            console.log("GOING", localStorage.length);
            const cachedPosts = JSON.parse(localStorage.getItem('posts'));
            console.log("GET", cachedPosts);
            this.setState({posts: cachedPosts});
        }
        localStorage.setItem("posts",JSON.stringify(this.state.posts));
    }

    handleRemovePost(index){
        this.setState({
            posts: this.state.posts.filter(function(e, i) {
                return i !== index;
            })
        })
    }
    handleAddPost(post) {
        console.log("post", post);
        this.setState(
            { posts: [...this.state.posts, post]
            });
        console.log("CAlled", this.state.posts);
       
    }

    componentWillUpdate(nextProps, newState){
        console.log("Called");
        localStorage.setItem("posts",JSON.stringify(newState.posts));
    }
    render(){
        console.log("This.setstate", this.state.posts);
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