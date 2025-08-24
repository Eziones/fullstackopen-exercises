import { useState, useEffect } from 'react'

import axios from 'axios'

const CountryDetail = ({country}) => {
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  if(!weather) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {
          Object.values(country.languages).map(lan => <li key={lan}>{lan}</li>)
        }
      </ul>
      <img src={country.flags['png']} alt={country.flags['alt']} />
      <h2>Weather in {country.capital}</h2>
      <div>Temperature {weather.main.temp } Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default CountryDetail