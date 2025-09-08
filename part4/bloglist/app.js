const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('an error occured:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
// requestLogger to be added ?

app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app