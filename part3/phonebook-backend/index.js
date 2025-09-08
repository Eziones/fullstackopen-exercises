require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('persons', (req, res) => JSON.stringify(req.body))

app.use(express.static('dist'))
app.use(express.json())

app.use(morgan('tiny', {
  skip: (req, res) => req.method === 'POST'
}))
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :persons`, {
  skip: (req, res) => req.method !== 'POST'
}))

const Person = require('./models/person')

/*let persons =
  [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ]
*/


app.get('/api/info', (request, response) => {
  
  Person.countDocuments({}).then(result => {
    const content = `
    <div>
      <p>Phonebook has info for ${result} people</p>
      <p>${new Date()}</p>
    </div>
  `

    response.send(content)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    console.log(result)
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      response.status(200).json(deletedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: "name missing"
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing"
    })
  }

  // if (persons.find(p => p.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique"
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`);