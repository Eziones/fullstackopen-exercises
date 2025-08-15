import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from '../components/Persons'
import PersonForm from '../components/PersonForm'
import Filter from '../components/Filter'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  })

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase())) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const personToAdd = {
      name: newName,
      number: newNumber
    } 
    setPersons(persons.concat(personToAdd))

    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App