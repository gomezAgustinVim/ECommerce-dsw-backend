import { Router } from 'express';
import {
	addFavorito,
	findAllFavoritos,
	removeFavorito,
	sanitizeFavoritoInput,
} from '../favoritos/favoritos.controller.js';
import { findOne as findOneMueble } from '../mueble/mueble.controller.js';
import {
	add,
	findAll,
	findOne,
	remove,
	sanitizeClientInput,
	sanitizeClientPatchInput,
	update,
} from './cliente.controller.js';

export const clienteRouter = Router();

clienteRouter.get('/:id/favoritos', findAllFavoritos);
clienteRouter.get('/:id/favoritos/mueble/:idMueble', findOneMueble);
clienteRouter.post('/:id/favoritos/', sanitizeFavoritoInput, addFavorito);
clienteRouter.delete('/:id/favoritos/:muebleId', removeFavorito);

// clienteRouter.post('/:id/favoritos/:muebleId', sanitizeFavoritoInput, addFavorito);
// este approach requiere el id literal del mueble en el post de REST

// CRUD independiente: /api/clientes
clienteRouter.get('/', findAll);
clienteRouter.get('/:id', findOne);
clienteRouter.post('/', sanitizeClientInput, add);
clienteRouter.put('/:id', sanitizeClientInput, update);
clienteRouter.patch('/:id', sanitizeClientPatchInput, update);
clienteRouter.delete('/:id', remove);
