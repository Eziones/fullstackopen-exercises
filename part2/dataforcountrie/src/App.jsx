import { useState, useEffect } from 'react'
import axios from 'axios'

import SearchBar from '../components/SearchBar'
import Countries from '../components/Countries'
import CountryDetail from '../components/CountryDetail'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)

  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  if (!countries) {
    return null
  }

  const handleSelect = (country) => {
    setCountry(country)
  }

  const handleSearch = (event) => {
    setCountry(null)
    setSearch(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(search.trim().toLowerCase()))
  const defaultCountry = countriesToShow.length === 1 ? countriesToShow[0] : null
  const selectedCountry = country || defaultCountry

  return (
    <div>
      <SearchBar value={search} onChange={handleSearch} />
      {selectedCountry
        ? <CountryDetail country={selectedCountry} />
        : <Countries countries={countriesToShow} handleSelect={handleSelect} />
      }
    </div>
  )
}

export default App
