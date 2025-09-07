const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('persons', (req, res) =>  JSON.stringify(req.body))

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan('tiny', {
  skip: (req, res) => req.method === 'POST'
}))
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :persons`, {
  skip: (req, res) => req.method !== 'POST'
}))

let persons = 
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

app.get('/api/info', (request, response) => {
  const content = `
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </div>
  `
  
  response.send(content)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if(!person) {
    response.status(404).end()
  } else {
    response.json(person)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  
  persons = persons.filter(p => p.id !== id)

  response.status(200).json(person)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0

  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: "name missing"
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: "number missing"
    })
  }
  
  if(persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  person = {
    ...body,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);