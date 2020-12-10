import { Router } from 'express'
import { CategoriaController } from '../controller/CategoriaController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// listar todos
// router.get('/', [checkJwt], CategoriaController.getAll);
router.get('/', CategoriaController.getAll);

// obtener por id
// router.get('/:id', [checkJwt], CategoriaController.getById);
router.get('/:id', CategoriaController.getById);

//crear
router.post('/newCategoria', CategoriaController.newCategoria);

// editar
// router.patch('/:id', [checkJwt], CategoriaController.editUser);
router.put('/:id', CategoriaController.editCategoria);

// eliminar
// router.delete('/:id', [checkJwt], CategoriaController.deleteCategoria);
router.delete('/:id', CategoriaController.deleteCategoria);

export default router;