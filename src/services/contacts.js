//src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async (query) => {
  return await ContactsCollection.find(query);
};

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const createNewContact = async (data) => {
  const newContact = new ContactsCollection(data);
  return await newContact.save();
};

export const updateContactById = async (contactId, data) => {
  return await ContactsCollection.findByIdAndUpdate(contactId, data, { new: true });
};

export const deleteContactById = async (contactId) => {
  return await ContactsCollection.findByIdAndDelete(contactId);
};
