import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const average = (props) => props.all === 0 ? 0 : (props.good - props.bad) / props.all
const positivePercentage = (good, all) => all === 0 ? 0 : (good / all) * 100

const StatisticsLine = (props) => {
  if (props.text === "positive") {
    return <p>{props.text}: {props.value} %</p>
  }
  return <p>{props.text}: {props.value}</p>
}

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
      <p>Good: {good}</p>
      <StatisticsLine text="good" value={good} />
      <p>Neutral: {neutral}</p>
      <StatisticsLine text="neutral" value={neutral} />
      <p>Bad: {bad}</p>
      <StatisticsLine text="bad" value={bad} />
      <p>all: {all}</p>
      <StatisticsLine text="all" value={all} />
      <p>average: {average({good, bad, all})}</p>
      <StatisticsLine text="average" value={average({good, bad, all})} />
      <p>positive: {positivePercentage(good, all)} %</p>
      <StatisticsLine text="positive" value={positivePercentage(good, all)} />
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