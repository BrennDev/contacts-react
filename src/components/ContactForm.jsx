import { Component } from 'react';
import PropTypes from 'prop-types';
import './contactForm.css';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      company: '',
      job_title: '',
      email: '',
      isLoading: false,
      errorMessage: null,
      isFormValid: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.updateButtonState);
  };

  validateForm = () => {
    const { first_name, last_name, email } = this.state;
    return first_name && last_name && email;
  };

  updateButtonState = () => {
    this.setState({ isFormValid: this.validateForm() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true, errorMessage: null });

    if (!this.validateForm()) {
      this.setState({
        errorMessage: 'Please fill in all required fields.',
        isLoading: false,
      });
      return;
    }

    const newContact = this.getContactDataForm();
    this.props
      .submitContact(newContact)
      .then((createdContact) => {
        this.props.onContactCreated(createdContact);
        this.clearForm();
      })
      .catch(() => {
        this.setState({
          errorMessage: 'Error creating contact',
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  getContactDataForm = () => {
    const { first_name, last_name, company, job_title, email } = this.state;
    return { first_name, last_name, company, job_title, email };
  };

  clearForm = () => {
    this.setState(
      {
        first_name: '',
        last_name: '',
        company: '',
        job_title: '',
        email: '',
        isFormValid: false,
      },
      this.updateButtonState,
    );
  };

  render() {
    const {
      first_name,
      last_name,
      company,
      job_title,
      email,
      isLoading,
      errorMessage,
      isFormValid,
    } = this.state;

    return (
      <div className="main-container">
        <h2 className="title-form">Create Contact</h2>
        <form className="contact-form" onSubmit={this.handleSubmit}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="section">
            <span className="material-icons">person</span>
            <div className="input-group">
              <label className={`label-style required`}>First Name</label>
              <input
                className="input-select-style"
                type="text"
                name="first_name"
                value={first_name}
                onChange={this.handleInputChange}
              />
              <label className={`label-style required`}>Last Name</label>
              <input
                className="input-select-style"
                type="text"
                name="last_name"
                value={last_name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="section">
            <span className="material-icons">business</span>
            <div className="input-group">
              <label className="label-style">Company</label>
              <input
                className="input-select-style"
                type="text"
                name="company"
                value={company}
                onChange={this.handleInputChange}
              />
              <label className="label-style">Job Title</label>
              <input
                className="input-select-style"
                type="text"
                name="job_title"
                value={job_title}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="section">
            <span className="material-icons">email</span>
            <div className="input-group">
              <label className={`label-style required`}>Email</label>
              <input
                className="input-select-style"
                type="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="save-button">
            <button type="submit" disabled={!isFormValid || isLoading}>
              Save
            </button>
          </div>
          {isLoading && <p>Loading...</p>}
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  submitContact: PropTypes.func.isRequired,
  onContactCreated: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    company: PropTypes.string,
    job_title: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

export default ContactForm;
