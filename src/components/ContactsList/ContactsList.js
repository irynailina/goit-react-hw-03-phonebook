import React from "react";
import ContactsItem from "../ContactsItem/ContactsItem";
import styles from "./contactsList.module.css";
import PropTypes from "prop-types";

export default function ContactsList({ contacts, deleteContact }) {
  return (
    <div className={styles.contactsWrap}>
      <table className={styles.list}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, idx) => (
            <ContactsItem
              key={contact.id}
              contact={contact}
              deleteContact={deleteContact}
              idx={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  deleteContact: PropTypes.func.isRequired,
};
