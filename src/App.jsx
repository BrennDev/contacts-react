import React, { Component } from 'react';
import ContactList from './components/ContactList';
import { fetchUsers } from './api/getContacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [], // Estado inicial con contacts
    };
  }

  componentDidMount() {
    fetchUsers().then((contacts) => {
      this.setState({ contacts }); // Actualiza el estado con contacts
    });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="App">
        <ContactList contacts={contacts} /> 
      </div>
    );
  }
}

export default App;
