const Weather = ({weather}) => {
  return (
    <div>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather