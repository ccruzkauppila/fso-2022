import axios from "axios";
const getAll = () => {
  const promise = axios.get("http://localhost:3001/persons");
  return promise.then((response) => response.data);
};

const postNew = (newPerson) => {
  const promise = axios.post("http://localhost:3001/persons", newPerson);
  return promise.then((response) => response.data);
};

const editNumber = (id, newNumber) => {
  const promise = axios.put(`http://localhost:3001/persons/${id}`, newNumber);
  return promise.then((response) => response.data);
};

const deletePerson = (id) => {
  const promise = axios.delete(`http://localhost:3001/persons/${id}`);
  return promise.then((response) => response.data);
};

export default { getAll, postNew, editNumber, deletePerson };
