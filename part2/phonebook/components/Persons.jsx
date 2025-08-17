import Person from "./Person"

const Persons = ({persons, handleDeletion}) => {
  return (
    <div>
      {persons.map(p => <Person key={p.name} person={p} onClick={() => handleDeletion(p)}/>)}
    </div>
  )
}

export default Persons