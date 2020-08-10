const request = require('postman-request')
const { key } = require('./config')

const getMovieID = (title, callback) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${title}&page=1&include_adult=false`;

    request({url, json: true}, (error, { body } = {}) => {
        if(body.total_results === 0) {
            callback('No Results', undefined)
        } else if (error) {
            callback('Unable to connect!', undefined)
        } else {
            callback(undefined, body.results[0])
        }
        })
}

module.exports = getMovieID