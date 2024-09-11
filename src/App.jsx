import React, { Component } from 'react';
import ContactList from './components/ContactList';
import { fetchUsers } from './api/getContacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    fetchUsers().then((users) => {
      this.setState({ contacts: users });
    });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="App">
        <ContactList users={contacts} />
      </div>
    );
  }
}

export default App;
