import { Router } from 'express'
import { ProductoToCompraController } from '../controller/ProductoToCompraController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// listar todos
// router.get('/', [checkJwt], VentaController.getAll);
router.get('/', ProductoToCompraController.getAll);

// obtener por id
// router.get('/:id', [checkJwt], VentaController.getById);
router.get('/:id', ProductoToCompraController.getById);

// buscar
router.get('/buscarCompras/:texto', ProductoToCompraController.buscarProductoToCompra);

//crear
router.post('/new', ProductoToCompraController.newProductoToCompra);

// editar
// router.patch('/:id', [checkJwt], VentaController.editUser);
// router.put('/:id', ProductoToCompraController.editVenta);

// eliminar
// router.delete('/:id', [checkJwt], VentaController.deleteCategoria);
// router.delete('/:id', ProductoToCompraController.deleteVenta);

export default router;