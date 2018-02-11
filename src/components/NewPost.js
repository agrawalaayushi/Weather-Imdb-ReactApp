import React, { Component } from 'react';
import axios from 'axios';
import * as action from '../actions/action';
import '../style/NewPost.css';

// let localState = localStorage.getItem('blogPost-collection');
// let blogs = (localStorage.getItem('blogPost-collection') != null) ? JSON.parse(localState) : [
// 	{title: "Java", content: "Backend-coding Language", author: "Manu"}
// 	//{name: "Surbhi", email: "surbhi@gmail.com"},
// 	// {name: "Anubhav", email: "anubhav@gmail.com"}
// 	];
//     localStorage.setItem('blogPost-collection', JSON.stringify(blogs));

class NewPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [
                {   
                    id: "",
                    title: '',
                    content: '',
                    author: 'Rabbit',
                },
               
            ]
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmitAddPost = this.handleSubmitAddPost.bind(this);
    }
  
    postDataHandler = () => {
        let postData = {
            title: this.state.title, 
            body: this.state.content, 
            author: this.state.author
        };
        localStorage.setItem('blogPost-collection', JSON.stringify(postData));
        
        // console.log(blogs)
      
    }
   
    handleAuthorChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState ({
            [name]: value
        })
    }
    handleSubmitAddPost(event){
        event.preventDefault();
        console.log("coming")
        this.props.onAddPost(this.state);
        let postData = {
            title: this.setState.title, 
            body: this.setState.content, 
            author: this.setState.author
        };
      
        // this.props.dispatch(action.postBlog(postData));
        axios.post('http://jsonplaceholder.typicode.com/posts', postData)
            .then(response => {
                console.log("API response",response);
            });
    }

    componentWillMount(){
        // localStorage.getItem('blogPost-collection') && this.setState({
        //     posts: JSON.parse(localStorage.getItem('blogPost-collection'))
        //  }) ;
    }
  
    render () {
      console.log(this.state.posts.title);
        return (

            <div>
                <div className="NewPost">
                    <h3>Add a Post</h3>
                    <form  onSubmit={this.handleSubmitAddPost}>
                    <div className="display-inline form-group">
                        <label className="col-sm-5">Title</label>
                        <input type="text" className= "form-control col-sm-6" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                    </div>
                    <div className="display-inline form-group">
                    <label className="col-sm-5">Content</label>
                    <textarea rows="2" className= "form-control col-sm-6"value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                    </div>
                    <div className="display-inline form-group">
                    <label className="col-sm-5">Author</label>  
                    <select value={this.state.author} className= "form-control col-sm-6" onChange={this.handleAuthorChange} >
                    {/* onChange={(event) => this.setState({author: event.target.value})} */}
                        <option value="Rabbit">Rabbit</option>
                        <option value="Tortoise">Tortoise</option>
                    </select>
                    </div>
                    <button type= "submit" className= "form-control ">Add Post</button>
                    </form>
                </div>
            </div>
           
      
        );
    }
}

export default NewPost;
