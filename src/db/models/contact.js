// src/db/models/contact.js

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  isFavourite: { type: Boolean, default: false },
  contactType: { type: String, enum: ['work', 'home', 'personal'], default: 'personal' },
  photo: { type: String },
});

export default mongoose.model('Contact', contactSchema);

