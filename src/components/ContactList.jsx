import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactList.css';
import InitialCircle from './InitialCircle';

class ContactList extends Component {
  createContactRow = (contact) => {
    const { first_name, last_name, email, avatar, company, job_title } = contact;

    return (
      <tr key={email}>
        <td className="avatar-cell">
          {avatar ? (
            <img src={avatar} alt={`${first_name} ${last_name}`} className="avatar-img" />
          ) : (
            <InitialCircle firstName={first_name} />
          )}
        </td>
        <td>{`${first_name} ${last_name}`}</td>
        <td>{email}</td>
        <td>{company || ''}</td>
        <td>{job_title || ''}</td>
      </tr>
    );
  };

  render() {
    const { contacts } = this.props;

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
          <tbody>{contacts.map((contact) => this.createContactRow(contact))}</tbody>
        </table>
      </div>
    );
  }
}



ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      company: PropTypes.string,
      job_title: PropTypes.string,
    }),
  ).isRequired,
};

export default ContactList;
