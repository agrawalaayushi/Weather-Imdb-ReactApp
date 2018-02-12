import React, {Component} from 'react';

export default class PostCard extends Component{

    // handleRemovePost(index){
    //     this.setState({
    //         posts: this.state.posts.filter(function(e, i) {
    //             return i !== index;
    //         })
    //     })
    // }
    render(){
        var  {
            id, 
            title, 
            content, 
            author,
        } = this.props.data;

        return(
            <div className="list-group-item col-xs-3 col-sm-4 col-md-3 col-lg-3" key={id}>
                <h4 className = "list-group-item-heading">{title}</h4>
                <p className = "list-group-item-heading">{content}</p>
                <p className = "list-group-item-heading">{author}</p>
              
            </div>
        );
    }
}