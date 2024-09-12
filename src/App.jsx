import React, { Component } from 'react';
import ContactList from './components/ContactList';
import { fetchContacts } from './api/getContacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    fetchContacts().then((contacts) => {
      this.setState({ contacts }); 
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
