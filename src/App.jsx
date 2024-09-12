import React, { Component } from 'react';
import ContactList from './components/ContactList';
import { fetchContacts } from './api/getContacts';
import { submitContact } from './api/submitContact';
import ContactForm from './components/ContactForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      showForm: false,
    };
  }

  componentDidMount() {
    fetchContacts().then((contacts) => {
      this.setState({ contacts });
    });
  }

  handleContactCreated = (newContact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      showForm: false,
    }));
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };

  render() {
    const { contacts, showForm } = this.state;

    return (
      <div className="App">
        <ContactList contacts={contacts} />
        <button onClick={this.toggleForm} className="button-style">
          {showForm ? 'Hide Form' : 'Create Contact'}
        </button>
        {showForm && (
          <ContactForm submitContact={submitContact} onContactCreated={this.handleContactCreated} />
        )}
      </div>
    );
  }
}

export default App;
