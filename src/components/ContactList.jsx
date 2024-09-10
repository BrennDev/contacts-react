import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import './ContactList.css';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  // Método para realizar la solicitud a la API y actualizar el estado con los usuarios
  fetchUsers = () => {
    const { apiUrl } = this.props;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ users: data.data });
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        alert('An error occurred while fetching the data.');
      });
  };

  // Método para crear una fila de usuario
  createUserRow = (user) => {
    const { first_name, last_name, email, avatar, company, job_title } = user;
    return (
      <tr key={email}>
        <td className="avatar-cell">
          {avatar ? (
            <img src={avatar} alt={`${first_name} ${last_name}`} className="avatar-img" />
          ) : (
            `${first_name} ${last_name}`
          )}
        </td>
        <td>{`${first_name} ${last_name}`}</td>
        <td>{email}</td>
        <td>{company}</td> 
        <td>{job_title}</td>
      </tr>
    );
  };

  // Renderización del componente
  render() {
    const { users } = this.state;

    return (
      <div>
        <table id="user-list">
          <thead>
            <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => this.createUserRow(user))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Validación de las propTypes
ContactList.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default ContactList;
