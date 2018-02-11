import axios from 'axios';

export default class BlogApi{
    static postBlogContent(postData){
        axios.post('http://jsonplaceholder.typicode.com/posts')
        .then(response => {
            console.log(response);
         return response.json();
        }).catch(error => {
            return error;
        });
    }
}