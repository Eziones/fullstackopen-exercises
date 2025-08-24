const Countries = ({ countries, handleSelect }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  return (
    <div>
      {countries.map(country => {
        return (
          <div key={country.name.official}>
            {country.name.common} <button onClick={() => handleSelect(country)}>Show</button>
          </div>
        )
      })}
    </div>
  )
}

export default Countries