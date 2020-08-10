const getMovieID = require('./get-movie-id')
const getDetails = require('./get-movie-details')
const getMovieCast = require('./get-movie-cast')

const sortData = (movieTitle, callback) => {
    getMovieID(movieTitle, (err, { id } = {}) => {
        if(err){
            callback(err, undefined)
        } else {
            getDetails(id, (err, details) => {
                if(err) {
                    callback('there was an error getting the details', undefined)
                } else {
                    getMovieCast(id, (err, credits) => {
                        if(err){
                            callback(err, undefined)
                        } else {
                            callback(undefined, {
                                id,
                                details,
                                credits
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports = sortData
