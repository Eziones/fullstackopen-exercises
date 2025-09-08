import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from '../components/Persons'
import PersonForm from '../components/PersonForm'
import Filter from '../components/Filter'
import Notification from '../components/Notification'

import personService from '../services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
  }, [])

  const handleDeletion = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson => {
          console.log("deleted -> ", deletedPerson)
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
        .catch(error => {
          setMessage({ message: `Informations of ${person.name} has already been removed from server`, type: 'error' })
          setPersons(persons.filter(p => p.id !== person.id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleAddition = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name.toLowerCase() === newName.trim().toLowerCase())

    if (!person) {
      addPerson()
    } else {
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one`)) {
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

        setMessage({ message: `Added ${returnedPerson.name}` })
        setTimeout(() => {
          setMessage(null)
        }, 5000)

        setNewName("")
        setNewNumber("")
      }).catch(error => {
        setMessage({ message: error.response.data.error, type: 'error' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updatePerson = (person) => {
    const changedPerson = { ...person, number: newNumber }
    personService
      .updatePerson(person.id, changedPerson)
      .then(returnedPerson => {
        setMessage({ message: `Updated ${returnedPerson.name}` })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))

        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        setMessage({ message: error.response.data.error, type: 'error' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <Notification message={message} />
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