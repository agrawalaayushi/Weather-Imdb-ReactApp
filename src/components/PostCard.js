import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as action from '../actions/action';
import { deletePost } from '../actions/action';

export default class PostCard extends Component{

    deletePost(e,index){
        this.props.ondeletePost(index);
    }
    
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
                <button className="btn btn-danger btn-sm" ><span className="glyphicon glyphicon-trash" onClick = {(e) => this.deletePost(e, id)}>Delete</span></button>
            </div>
        );
    }
}