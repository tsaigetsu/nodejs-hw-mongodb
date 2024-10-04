// src/routers/contacts.js

import { Router } from 'express';
import { 
  getContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContacts));

router.get('/:contactId', ctrlWrapper(getContactById));

router.post('/', ctrlWrapper(createContact));

router.patch('/:contactId', ctrlWrapper(updateContact)); 

router.delete('/:contactId', ctrlWrapper(deleteContact));

export default router;
