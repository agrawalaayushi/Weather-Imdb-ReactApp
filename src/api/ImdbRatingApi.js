
export default class ImdbRatingApi{
    static getImdbRating(){
        const imdbURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e40c17f7';
        return fetch(imdbURL).then(res => {
            console.log("IMDB RATING API",res);
            return res.json();
        }).catch(error => {
            return error;
        });
    }
}