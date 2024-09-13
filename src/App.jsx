import { Component } from 'react';
import { fetchContacts } from './api/getContacts';
import { submitContact } from './api/submitContact';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import LoadingSpinner from './components/LoadingSpinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      showForm: false,
      isLoading: true,
      isAddingContact: false,
    };
  }

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    fetchContacts()
      .then((contacts) => {
        this.setState({ contacts, isLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        this.setState({ isLoading: false });
      });
  };

  handleContactCreated = (newContact) => {
    this.setState({ isAddingContact: true });
    submitContact(newContact)
      .then(() => {
        this.setState((prevState) => ({
          contacts: [...prevState.contacts, newContact],
          showForm: false,
          isAddingContact: false,
        }));
      })
      .catch((error) => {
        console.error('Error adding contact:', error);
        this.setState({ isAddingContact: false });
      });
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };

  render() {
    const { contacts, showForm, isLoading, isAddingContact } = this.state;

    return (
      <div className="App">
        {isLoading || isAddingContact ? (
          <LoadingSpinner message={isLoading ? 'Fetching contacts...' : 'Adding contact...'} />
        ) : (
          <>
            <ContactList contacts={contacts} />
            <button onClick={this.toggleForm} className="button-style">
              {showForm ? 'Hide Form' : 'Create Contact'}
            </button>
            {showForm && (
              <ContactForm
                submitContact={submitContact}
                onContactCreated={this.handleContactCreated}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
