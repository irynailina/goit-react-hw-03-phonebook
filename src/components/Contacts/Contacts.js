import React, { Component } from "react";
import Form from "../Form/Form";
import ContactsList from "../ContactsList/ContactsList";
import Filter from "../Filter/Filter";
import styles from "./contacts.module.css";

class Contacts extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const {contacts} = this.state
    this.setState({
      contacts: JSON.parse(localStorage.getItem("contacts")) && contacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  getContact = (newContact) => {
    const { name } = newContact;
    const newName = this.state.contacts.some(
      (contact) => contact.name === name
    );
    if (!newName) {
      this.setState((prevstate) => {
        const addContacts = [...prevstate.contacts, newContact];
        localStorage.setItem("contacts", JSON.stringify(addContacts));
        return { contacts: addContacts };
      });
    } else alert("This contact is already in contacts!");
  };

  deleteContact = (e) => {
    const id = e.target.id;
    this.setState((prev) => {
      const resultContacts = prev.contacts.filter(
        (contact) => contact.id !== id
      );
      localStorage.setItem("contacts", JSON.stringify(resultContacts));
      return {
        contacts: resultContacts,
      };
    });
  };

  handleChangeFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  // filterContacts = (e) => {
  //   const {filter} = this.state
  //   const filteredContact = JSON.parse(localStorage.getItem('contacts')).filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  //   this.setState({
  //     filter: e.target.value,
  //     contacts: filteredContact
  //   })
  // }

  render() {
    const { filter, contacts } = this.state;
    
    console.log(contacts);
    const filteredContacts = JSON.parse(
      localStorage.getItem("contacts")
    ).filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Phonebook</h2>
          </div>
          <div className={styles.formWrap}>
            <Form getContact={this.getContact} />
          </div>
          <h2 className={styles.contacts}>Contacts</h2>
          <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
          <ContactsList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default Contacts;
