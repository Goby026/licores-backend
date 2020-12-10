import { Router } from 'express'
import { ArticuloController } from '../controller/ArticuloController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// listar todos
// router.get('/', [checkJwt], ArticuloController.getAll);
router.get('/', ArticuloController.getAll);

// obtener por id
// router.get('/:id', [checkJwt], ArticuloController.getById);
router.get('/:id', ArticuloController.getById);

// buscar artículo
router.get('/search/:art', ArticuloController.search);

//crear
router.post('/newArticulo', ArticuloController.newArticulo);

// editar
// router.patch('/:id', [checkJwt], ArticuloController.editUser);
router.put('/:id', ArticuloController.editArticulo);

// eliminar
// router.delete('/:id', [checkJwt], ArticuloController.deleteCategoria);
router.delete('/:id', ArticuloController.deleteArticulo);

export default router;