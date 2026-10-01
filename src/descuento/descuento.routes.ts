import { Router } from 'express';
import {
	add,
	findAll,
	findOne,
	remove,
	sanitizeDescuentoInput,
	update,
} from './descuento.controller.js';
import { requireRole, verifyToken } from '../auth/auth.middleware.js';

export const descuentoRouter = Router();

// el frontend necesita mostrar los niveles disponibles
descuentoRouter.get('/', findAll);
descuentoRouter.get('/:id', findOne);

// admin
descuentoRouter.post('/', verifyToken, requireRole('admin'), sanitizeDescuentoInput, add);
descuentoRouter.put('/:id', verifyToken, requireRole('admin'), sanitizeDescuentoInput, update);
descuentoRouter.patch('/:id', verifyToken, requireRole('admin'), sanitizeDescuentoInput, update);
descuentoRouter.delete('/:id', verifyToken, requireRole('admin'), remove);