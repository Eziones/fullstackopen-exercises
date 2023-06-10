const Header = (props) =>
{
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.title} {props.exercisesNumber}        
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part title={props.titles[0]} exercisesNumber={props.exercisesNumbers[0]} />
      <Part title={props.titles[1]} exercisesNumber={props.exercisesNumbers[1]} />
      <Part title={props.titles[2]} exercisesNumber={props.exercisesNumbers[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises: {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content titles={[part1, part2, part3]} exercisesNumbers={[exercises1,exercises2,exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App