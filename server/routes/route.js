import express from 'express';
import loginUser from '../controller/user-controller.js';

const router = express.Router();

router.post('/login', loginUser);

export default router;


