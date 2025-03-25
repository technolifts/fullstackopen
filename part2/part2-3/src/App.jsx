import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  // Handler for input change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Handler for form submission
  const addName = (event) => {
    event.preventDefault() // Prevent default form submission
    
    const nameObject = {
      name: newName
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('') // Clear the input field after submission
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      {/* Debug element */}
      <div>debug: {newName}</div>
      
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <div key={person.name}>{person.name}</div>
        )}
      </div>
    </div>
  )
}

export default App