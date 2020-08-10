
const express = require('express')
const path = require('path');
const hbs = require('hbs')
const sortData = require('./UTILS/sortData')

const port = process.env.PORT || 3000
const app = express()


// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public/')
console.log(publicDirectory)
const viewsPath = path.join(__dirname, '../views/layouts/')
const partialsPath = path.join(__dirname, '../views/partials/')

// View engine setup
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

// Routing
app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/search', (req, res) => {
    let movieTitle = req.query.movie
    if(!movieTitle){
        res.send({
            error: 'You must provide a movie title!'
        })
    }
    sortData(movieTitle, (err, data) => {
        if(err) {
            res.send(err)
        } else {
            res.send(data);
        }
    })
})

// app.get('/layout', (req, res) => {
//     res.render('layout.hbs')
// })

// app.get('*', (req, res) => {
//     res.send('404')
// })

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})