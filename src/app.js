const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//define paths for express config
const htmlLibPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const templatePartials = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(templatePartials)

//setup static directory to serve
app.use(express.static(htmlLibPath))

 app.get('',(req,res) => {
     res.render('index',{
         title: 'Weather Application',
         name: 'Boba'
     })
 })

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Poorna'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is some helpful text for my example hello',
        name: 'Chandu'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'provide address term in yor URL'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,{forecast}) => {
            if (error){
                return res.send({error}) 
            }
            //console.log(forcast)
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
    // res.send([{
    //     forecast: '28 degree C',
    //     location: 'Bangaluru',
    //     address: req.query.address
    //}])
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Poorna',
        errorMessage: 'Help Article not Found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Poorna',
        errorMessage: 'Page not found'
    })
})

app.listen(port,() => {
    console.log('server is up on port ' +port)
})
