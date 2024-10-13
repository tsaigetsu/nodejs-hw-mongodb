//src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async (queryParams) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = queryParams;

  const query = {};
  if (type) query.contactType = type;
  if (isFavourite !== undefined) query.isFavourite = isFavourite === 'true';

  const skip = (page - 1) * perPage;
  const totalItems = await ContactsCollection.countDocuments(query);
  const totalPages = Math.ceil(totalItems / perPage);

  const contacts = await ContactsCollection.find(query)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(Number(perPage));

  return {
    data: contacts,
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
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
  return await ContactsCollection.findByIdAndDelete(contactId);
};
