const request = require('postman-request')
const { key } = require('./config')

const getMovieCast = (ID, callback) => {
    const url = `https://api.themoviedb.org/3/movie/${ID}/credits?api_key=${key}`;

    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect!', undefined)
        } else {
            let cast = body.cast.slice(0,6)
            let crewArray = body.crew
            let crew = sortCrew(crewArray);

            callback(undefined, {
                cast,
                crew
            } )
        }
    })
}

const sortCrew = function(crewArr){
    let shortList = crewArr.slice(0,30);

    let director;
    let screenPlay;
    let cinematographer;
    
    //looking for 3 crew positions
    let crew = shortList.map((crewMember, index)=>{
        let crewJob = crewMember.job;

        if(crewJob == 'Director'){
            return director = crewMember.name;//there might be multiples
        }else if (crewJob == 'Director of Photography'){
            return cinematographer = crewMember.name;
        } else if (crewJob == 'Screenplay'){ //there might be multiples
            return screenPlay = crewMember.name;
        }
    })
    return [director, screenPlay, cinematographer]
};

module.exports = getMovieCast