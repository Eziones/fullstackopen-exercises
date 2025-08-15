import Person from "./Person"

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(p => <Person key={p.name} person={p} />)}
    </div>
  )
}

export default Persons