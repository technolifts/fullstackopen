import { useState } from 'react'

const Filter = (props) => {
  console.log(props)
  return (
    <div>
        filter shown with <input
                            value={props.value}
                            onChange={props.onChange}
                          />
      </div>
  )
}

const PersonForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={props.addName}>
        <div>
          name: <input 
                  value={props.newName} 
                  onChange={props.handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  )

}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
        />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Handler for input change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Handler for number change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  // Handler for search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Handler for form submission
  const addName = (event) => {
    event.preventDefault() // Prevent default form submission

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('') // Clear the input field after submission
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange ={handleSearchChange} />

      <h2>Add a New</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      /> 
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App