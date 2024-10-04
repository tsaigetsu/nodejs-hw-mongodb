// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createNewContact = async (contactData) => {
  const newContact = new ContactsCollection(contactData);
  await newContact.save();
  return newContact;
};

export const updateContactById = async (contactId, updateData) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(contactId, updateData, { new: true });
  return updatedContact;
};

export const deleteContactById = async (contactId) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);
  return deletedContact;
};