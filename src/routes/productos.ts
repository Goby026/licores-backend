import { Router } from 'express'
import { ProductoController } from '../controller/ProductoController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// listar todos
// router.get('/', [checkJwt], ProductoController.getAll);
router.get('/', ProductoController.getAll);

// obtener por id
// router.get('/:id', [checkJwt], ProductoController.getById);
router.get('/:id', ProductoController.getById);

// buscar productos
router.get('/buscarProducto/:texto', ProductoController.buscarProducto);

// buscar por categoria
router.get('/buscarProducto/cat/:cod', ProductoController.buscarCat);

//crear
router.post('/newProducto', ProductoController.newProducto);

// editar
// router.patch('/:id', [checkJwt], ProductoController.editUser);
router.put('/:id', ProductoController.editProducto);

// eliminar
// router.delete('/:id', [checkJwt], ProductoController.deleteCategoria);
router.delete('/:id', ProductoController.deleteProducto);

export default router;