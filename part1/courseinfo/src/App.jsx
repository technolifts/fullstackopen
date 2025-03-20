import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const average = (good, bad, all) => all === 0 ? 0 : (good - bad) / all
const positivePercentage = (good, all) => all === 0 ? 0 : (good / all) * 100

const StatisticsLine = (props) => (
  
  <tr>
    <td>{props.text}</td>
    <td>{props.value}{props.percentage ? ' %' : ''}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, all}) => {
  if( all === 0 )
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )

  return (
    <div>    
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average(good, bad, all)} />
          <StatisticsLine text="positive" value={positivePercentage(good, all).toFixed(1)} percentage={true} />
        </tbody>
      </table>
    </div>
    )
  }


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good +1 )} text="Good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App