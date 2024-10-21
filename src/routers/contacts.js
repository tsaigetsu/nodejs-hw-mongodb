// src/routers/contacts.js

import express from 'express';
import { 
  getContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// router.use(authenticate);

router.get('/', getContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', createContact);
router.put('/:contactId', isValidId, updateContact);
router.delete('/:contactId', isValidId, deleteContact);

export default router;
