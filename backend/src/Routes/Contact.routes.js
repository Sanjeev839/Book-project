import express from 'express';
import { sendMail } from '../Controllers/Contact.Controllers.js';

const router = express.Router();

router.post('/send-email', sendMail);

export default router;
