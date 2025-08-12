import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const allVotes = good + neutral + bad

  if (allVotes === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={allVotes} />
            <StatisticLine text={"average"} value={(good - bad) / allVotes} />
            <StatisticLine text={"positive"} value={good / allVotes * 100} percent={"%"} />
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticLine = ({ text, value, percent }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {percent}</td>
    </tr>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGood} text={"good"} />
        <Button onClick={handleNeutral} text={"neutral"} />
        <Button onClick={handleBad} text={"bad"} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App