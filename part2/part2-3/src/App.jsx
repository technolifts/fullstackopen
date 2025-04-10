import { useState, useEffect } from 'react'
import noteService from './services/persons'
import './index.css';


const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

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

const Person = ({ name, number, onDelete, id }) => {
  return (
    <div>
      {name} {number}
      <button onClick={() => onDelete(id)}>delete</button> {/* Add the delete button */}
    </div>
  )
}

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id} 
          onDelete={onDelete} // Receive the onDelete function as a prop
        />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({ message: null, type: 'success' })

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll() // Fetch initial persons from the server
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
        showNotification('Failed to fetch contacts from server', 'error');
      });
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: 'success' });
    }, 5000);
  };

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

    const existingPerson = persons.find(person => person.name == newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        noteService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson));
            setNewName('');
            setNewNumber('');
            console.log(`Number updated for ${returnedPerson.name} on server`);
            showNotification(`Updated ${returnedPerson.name}'s number successfully`);
          })
          .catch(error => {
            // Check if the error is a 404 Not Found (resource has been deleted)
            if (error.response && error.response.status === 404) {
              showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error');
              // Remove the deleted person from the state as well
              setPersons(persons.filter(p => p.id !== existingPerson.id));
            } else {
              showNotification(`Failed to update the number for ${existingPerson.name}`, 'error');
            }
            console.error('Error updating person:', error);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
    
      noteService
      .create(personObject) // Send the new person to the server
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('') // Clear the input field after submission
        setNewNumber('')
        console.log("New person added to server")
        showNotification(`Added ${returnedPerson.name} to the phonebook`);
      })
      .catch(error => {
        showNotification('Failed to add the person. Please try again.', 'error');
        console.error('Error adding person:', error);
      });
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id);
    const confirmDeletion = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDeletion) {
      noteService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          console.log(`Person with id ${id} deleted from server`);
        })
        .catch(error => {
          alert(`Failed to delete ${personToDelete.name}.`);
          console.error('Error deleting person:', error);
        });
    }
  };

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
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      /> 
      
      <h2>Numbers</h2>
      <Notification message={notification.message} type={notification.type} />
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App