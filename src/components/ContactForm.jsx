import './ContactForm.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        company: '',
        email: '',
        first_name: '',
        job_title: '',
        last_name: '',
      },
      error: null,
      isFormValid: false,
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error && !this.props.error) {
      this.clearForm();
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => ({
        contact: {
          ...prevState.contact,
          [name]: value,
        },
      }),
      this.updateButtonState,
    );
  };

  validateForm = () => {
    const { first_name, last_name, email } = this.state.contact;
    return first_name && last_name && email;
  };

  updateButtonState = () => {
    this.setState({ isFormValid: this.validateForm() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true, error: null });

    if (!this.validateForm()) {
      this.setState({
        error: 'Please fill in all required fields.',
        isLoading: false,
      });
      return;
    }

    const { first_name, last_name, company, job_title, email } = this.state.contact;
    const newContact = { first_name, last_name, company, job_title, email };

    this.props
      .submitContact(newContact)
      .then((createdContact) => {
        this.props.onContactCreated(createdContact);
        this.clearForm();
      })
      .catch((error) => {
        this.setState({
          error: 'Error creating contact',
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  clearForm = () => {
    this.setState(
      {
        contact: {
          company: '',
          email: '',
          first_name: '',
          job_title: '',
          last_name: '',
        },
        isFormValid: false,
      },
      this.updateButtonState,
    );
  };

  handleCloseError = () => {
    this.setState({ error: null }, this.clearForm);
  };

  render() {
    const {
      contact: { company, email, first_name, job_title, last_name },
      error,
      isFormValid,
      isLoading,
    } = this.state;

    return (
      <div className="main-container">
        <h2 className="title-form">Create Contact</h2>
        {error && <ErrorMessage error={error} onClose={this.handleCloseError} />}
        <form className="contact-form" onSubmit={this.handleSubmit}>
          <div className="section">
            <span className="material-icons">person</span>
            <div className="input-group">
              <label className={`label-style required`}>First Name</label>
              <input
                className="input-select-style"
                name="first_name"
                onChange={this.handleInputChange}
                type="text"
                value={first_name}
              />
              <label className={`label-style required`}>Last Name</label>
              <input
                className="input-select-style"
                name="last_name"
                onChange={this.handleInputChange}
                type="text"
                value={last_name}
              />
            </div>
          </div>
          <div className="section">
            <span className="material-icons">business</span>
            <div className="input-group">
              <label className="label-style">Company</label>
              <input
                className="input-select-style"
                name="company"
                onChange={this.handleInputChange}
                type="text"
                value={company}
              />
              <label className="label-style">Job Title</label>
              <input
                className="input-select-style"
                name="job_title"
                onChange={this.handleInputChange}
                type="text"
                value={job_title}
              />
            </div>
          </div>
          <div className="section">
            <span className="material-icons">email</span>
            <div className="input-group">
              <label className={`label-style required`}>Email</label>
              <input
                className="input-select-style"
                name="email"
                onChange={this.handleInputChange}
                type="email"
                value={email}
              />
            </div>
          </div>
          <div className="save-button">
            <button type="submit" disabled={!isFormValid || isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  submitContact: PropTypes.func.isRequired,
  onContactCreated: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    company: PropTypes.string,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    job_title: PropTypes.string,
    last_name: PropTypes.string.isRequired,
  }),
  error: PropTypes.string,
};

export default ContactForm;
