import express from 'express';
import userController from '../controllers/userController.js';
import {verifyToken} from '../auth/authMiddleware.js';
const router = express.Router();


router.get('/', verifyToken, userController.getAll)

router.get('/:id', verifyToken, userController.getById)

router.put('/:id', verifyToken, userController.update)

router.delete('/:id', verifyToken, userController.delete)

export default router;