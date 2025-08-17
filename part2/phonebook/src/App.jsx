import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from '../components/Persons'
import PersonForm from '../components/PersonForm'
import Filter from '../components/Filter'

import personService from '../services/persons'

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
    personService
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
  }, [])

  const handleDeletion = (p) => {
    if (window.confirm(`Delete ${p.name} ?`)) {
      personService
        .deletePerson(p.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
    }
  }

  const handleAddition = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name.toLowerCase() === newName.trim().toLowerCase())

    if (!person) {
      addPerson()
    } else {
      if(window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one`)) {
        updatePerson(person)
      }
    }
  }

  const addPerson = () => {
    const personToAdd = {
      name: newName,
      number: newNumber
    }

    personService
      .addPerson(personToAdd)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setNewName("")
        setNewNumber("")
      })
  }

  const updatePerson = (person) => {
    const changedPerson = {...person, number: newNumber}
    personService
      .updatePerson(person.id, changedPerson)
      .then(returnedPerson => {
        console.log("old person", person)
        console.log("new person", returnedPerson)
        setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
      })
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
        onSubmit={handleAddition}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App