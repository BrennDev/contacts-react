import { Component } from 'react';
import { submitContact } from './api/submitContact';
import ContactForm from './components/ContactForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      showForm: false,
      newContactData: {
        company: '',
        email: '',
        first_name: '',
        job_title: '',
        last_name: '',
      },
    };
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
      <div>
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              {contact.first_name} {contact.last_name} - {contact.company}
            </li>
          ))}
        </ul>
        <button onClick={this.toggleForm} className="button-style">
          {showForm ? 'Hide Form' : 'Create Contact'}
        </button>
        {showForm && (
          <ContactForm
            submitContact={submitContact}
            onContactCreated={this.handleContactCreated}
            newContactData={this.state.newContactData}
          />
        )}
      </div>
    );
  }
}

export default App;
