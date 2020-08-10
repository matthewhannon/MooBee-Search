const request = require('postman-request')
const { key } = require('./config')

const getDetails = (ID, callback) => {
    const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${key}&language=en-US`;

    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect!', undefined)
        } else {
            callback(undefined, {
                backDrop: body.backdrop_path,
                posterPath: body.poster_path,
                title: body.title,
                releaseDate: body.release_date,
                tagline: body.tagline
            });
        }
    })
}

module.exports = getDetails