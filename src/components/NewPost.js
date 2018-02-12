import React, { Component } from 'react';
import axios from 'axios';
import '../style/NewPost.css';

// let localState = localStorage.getItem('blogPost-collection');
// let blogs = (localStorage.getItem('blogPost-collection') != null) ? JSON.parse(localState) : [
// 	{title: "Java", content: "Backend-coding Language", author: "Manu"}
// 	//{name: "Surbhi", email: "surbhi@gmail.com"},
// 	// {name: "Anubhav", email: "anubhav@gmail.com"}
// 	];
//     localStorage.setItem('blogPost-collection', JSON.stringify(blogs));
let i = 1;
class NewPost extends Component {
    constructor(props){
        super(props);

        this.state = {
                    id: 1,
                    title: '',
                    content: '',
                    author: 'Rabbit',
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmitAddPost = this.handleSubmitAddPost.bind(this);
    }
   
    handleAuthorChange(event){
        this.setState ({
            author: event.target.value
        });
    }
    handleSubmitAddPost(event){
        event.preventDefault();
        console.log("coming", this.state);
      
        let postData = {
            id: i,
            title: this.state.title, 
            content: this.state.content, 
            author: this.state.author
        };
        i = i+1;
        console.log("id",i)
        this.props.onAddPost(postData);
        console.log("PRINT ", postData);
        // localStorage.setItem("posts",JSON.stringify(this.state.postData));
        // this.props.dispatch(action.postBlog(postData));
        axios.post('http://jsonplaceholder.typicode.com/posts', postData)
            .then(response => {
                console.log("API response",response);
            });
    }
  
    render () {
        return (

            <div>
                <div className="NewPost">
                    <h3>Add a Post</h3>
                    <form  onSubmit={this.handleSubmitAddPost}>
                    <div className="display-inline form-group">
                        <label className="col-sm-5">Title</label>
                        <input type="text" className= "form-control col-sm-6" value={this.state.title} required onChange={(event) => this.setState({title: event.target.value})} />
                    </div>
                    <div className="display-inline form-group">
                    <label className="col-sm-5">Content</label>
                    <textarea rows="2" className= "form-control col-sm-6" value={this.state.content} required onChange={(event) => this.setState({content: event.target.value})} />
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
