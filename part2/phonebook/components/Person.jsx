const Person = ({ person, onClick }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={onClick}>delete</button>
    </div>
  )
}

export default Person