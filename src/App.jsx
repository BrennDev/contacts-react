import { Component } from 'react';
import { fetchContacts } from './api/getContacts';
import { submitContact } from './api/submitContact';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      showForm: false,
      isLoading: true,
      isAddingContact: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    fetchContacts()
      .then((contacts) => {
        this.setState({ contacts, isLoading: false, error: null });
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        this.setState({ isLoading: false, error: `Error fetching contacts` });
      });
  };

  handleContactCreated = (newContact) => {
    this.setState({ isAddingContact: true, error: null });
    submitContact(newContact)
      .then(() => {
        this.setState((prevState) => ({
          contacts: [...prevState.contacts, newContact],
          showForm: false,
          isAddingContact: false,
          error: null,
        }));
      })
      .catch((error) => {
        console.error('Error adding contact:', error);
        this.setState({ isAddingContact: false, error: 'Error adding contact' });
      });
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };

  closeErrorMessage = () => {
    this.setState({ error: null });
  };

  render() {
    const { contacts, showForm, isLoading, isAddingContact, error } = this.state;

    return (
      <div className="App">
        {isLoading || isAddingContact ? (
          <LoadingSpinner message={isLoading ? 'Fetching contacts...' : 'Adding contact...'} />
        ) : (
          <>
            <ErrorMessage error={error} onClose={this.closeErrorMessage} />
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
