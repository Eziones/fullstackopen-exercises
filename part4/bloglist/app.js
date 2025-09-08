const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
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
// requestLogger

app.use('/api/blogs', blogsRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

module.exports = app