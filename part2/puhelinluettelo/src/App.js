import { useEffect, useState } from "react";
import axios from "axios";
import numberService from "./services/numberService";
import Notification from "./components/Notification";
const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  );
};

const Persons = ({ persons, filter, onDelete }) => {
  const filteredPersons = persons.filter((person) => {
    return person.name.includes(filter);
  });

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

const AddPersonForm = ({ name, number, onNameChange, onNumberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    numberService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  /**
   * Handles the form submission event.
   * If the person already exists, edits their number to the new number
   * else creates a new person
   *
   * @param {event} event - the form submission event
   * @return {undefined}
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson && window.confirm(`Replace ${newName}\'s number with ${newNumber}?`)) {
      numberService
        .editNumber(existingPerson.id, { ...existingPerson, number: newNumber })
        .then((response) => {
          notify(`Changed ${existingPerson.name}\'s number to ${newNumber}`, "ok");
          setPersons(persons.map((person) => (person.id === existingPerson.id ? response : person)));
        })
        .catch((error) => {
          notify("failed to edit", "error");
        });
    } else {
      numberService
        .postNew({ name: newName, number: newNumber })
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          notify(`Added ${newName}`, "ok");
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          notify("failed to add", "error");
        });
    }
  };

  const deletePerson = (person) => {
    const confirmation = window.confirm("Do you really want to delete this person?");
    if (!confirmation) return;

    numberService
      .deletePerson(person.id)
      .then(() => {
        notify(`Deleted ${person.name}`, "ok");
        setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch((error) => {
        notify("failed to delete", "error");
      });
  };

  const notify = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({}), 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notification} />
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <AddPersonForm
        onSubmit={handleSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
};

export default App;
