import express from 'express';
import { 
  getContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', upload.single('photo'), createContact);
router.put('/:contactId', isValidId, upload.single('photo'), updateContact);
router.delete('/:contactId', isValidId, deleteContact);

export default router;
