const header = document.querySelector('header');
const searchForm = document.querySelector('.search');
const searchValue = document.querySelector('.search-value');
const searchError = document.querySelector('.search-error');
const mainContainer = document.getElementsByTagName('main')[0];
const resultsContainer = document.querySelector('.results-container');
const movieData = document.querySelector('ul').children;
const footerTextButton = document.querySelector('.back-to-top')
let searchLoaded = false;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    scrollToHeader();
    hideMobileKeyboard();

    let movieTitle = searchValue.value.trim();
    const url = `/search?movie=${movieTitle}`;

    if (movieTitle == ''){
        showError();
    } else {
        fetch(url).then(response => {
            response.json().then( ({ id, credits, details } = {}) => {
                if(searchLoaded) {
                    fadeOutPrevious();
                    mainContainer.addEventListener('transitionend', () => {
                        displayDetails(details, credits);
                    })
                } else {
                    displayDetails(details, credits);
                }
            }).catch((err) => {
                // console.log(err)
                showError();
            })
        })
    }
})

footerTextButton.addEventListener('click', () => {
    scrollToHeader();
});

mainContainer.addEventListener('transitionend', () => {
    console.log('unloading results')
    searchLoaded = false;
})

const displayDetails = (details, credits) => {
    detailsDisplay(details);
    crewDisplay(credits)
    castDisplay(credits);
    footerButtonLoad();
    resultsTransition();
    hideError();
}

const detailsDisplay = ({backDrop, posterPath, releaseDate, tagline, title }) => {
    const body = document.querySelector('body');
    const movieTitle = document.querySelector('.movie-title');
    const taglineTitle = document.querySelector('.tagline');
    const moviePoster = document.querySelector('.poster-details');

    // Movie Title
    movieTitle.textContent = title;

    // Tagline
    if(tagline != undefined){
        taglineTitle.textContent = `${tagline}`
        taglineTitle.style.display = 'block';
    } else {
        taglineTitle.style.display = 'none';
    }

    // Poster
    moviePoster.children[0].src = `https://image.tmdb.org/t/p/w500/${posterPath}`;

    // Release Date
    if(releaseDate != undefined){
        movieData[0].firstChild.children[1].textContent = `${releaseDate}`;
        movieData[0].firstChild.style.display = 'block';
    } else {
        movieData[0].firstChild.style.display = 'none';
    }

    // // Background Image Update
    // resultsContainer.style.backgroundImage = `linear-gradient(to bottom right, rgba(156, 116, 88, 0.787), rgb(39, 49, 49) ), url(https://image.tmdb.org/t/p/w1280/${backDrop})`;
}

const crewDisplay = ({ crew }) => {
    // Director
    if (crew[0] != undefined){
        movieData[1].firstChild.children[1].textContent = `${crew[0]}`;
        movieData[1].firstChild.style.display = 'block';
    } else {
        movieData[1].firstChild.style.display = "none";
    } 

    if (crew[1] != undefined){
        movieData[2].firstChild.children[1].textContent = `${crew[1]}`;
        movieData[2].firstChild.style.display = 'block';
    } else {
        movieData[2].firstChild.style.display = "none";
    }
}

const castDisplay = ({ cast } ) => {
    const actorBox = document.querySelectorAll('.actor');
    const castResults = document.querySelector('.cast-container');

    for(let i = 0; i < cast.length; i++) {
        let actorImage;

        if(cast[i].profile_path == null) {
            console.log('no image found')
            castResults.querySelectorAll('img')[i].src = '/IMG/missing-face.png';
        } else {
            actorImage = cast[i].profile_path;
            castResults.querySelectorAll('img')[i].src = `https://image.tmdb.org/t/p/w500/${actorImage}`;
        }

        //update name
        actorBox[i].childNodes[3].textContent = `${cast[i].name}`;
    }
}

const scrollToHeader = () => {
    header.scrollIntoView({behavior: 'smooth'});
}

const footerButtonLoad = () => {
    footerTextButton.firstElementChild.style.display = 'block';
}

const hideMobileKeyboard = () => {
    searchValue.blur();
}

const showError = () => {
    searchError.style.visibility = 'visible';
}

const hideError = () => {
    searchError.style.visibility = 'hidden';
}

const fadeOutPrevious = () => {
    mainContainer.style.opacity = '0';
}

const resultsTransition = () => {
    searchLoaded = true;
    mainContainer.style.opacity = 1;
    mainContainer.style.display = 'flex';
}

// const changeTitleColor = () => {
//     let titleColor = header.children[0];
//     // (blue) titleColor.style.color = '#1ebdd2';  rgb(30, 189, 210)
//     //(red) titleColor.style.color = '#d2331e'; rgb(210, 51, 30)

//     if(!titleColor.style.color) {
//         titleColor.style.color = 'rgb(210, 51, 30)';
//     } else if (titleColor.style.color == 'rgb(30, 189, 210)') {
//         titleColor.style.color = 'rgb(210, 51, 30)';
//     } else {
//         titleColor.style.color = 'rgb(30, 189, 210)';
//     }
// }