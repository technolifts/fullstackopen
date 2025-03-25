import { useState } from 'react'

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

    if(persons.some(person => person.name == newName)) {
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
      <div>
        filter shown with <input
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
      </div>

      <h2>Add a New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person => 
          <div key={person.name}>{person.name} {person.number}</div>
        )}
      </div>
    </div>
  )
}

export default App