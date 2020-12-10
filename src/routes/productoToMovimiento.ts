import { Router } from 'express';
import { ProductoToMovimientoController } from '../controller/ProductoToMovimientoController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// listar todos
// router.get('/', [checkJwt], VentaController.getAll);
router.get('/:ultimos', ProductoToMovimientoController.getAll);

// obtener por id
// router.get('/:id', [checkJwt], VentaController.getById);
router.get('/:id', ProductoToMovimientoController.getById);

// buscar
router.get('/buscarVentas/:texto', ProductoToMovimientoController.buscarProToMovimiento);

//crear
router.post('/new', ProductoToMovimientoController.newProductoToMovimiento);

// editar
// router.patch('/:id', [checkJwt], VentaController.editUser);
// router.put('/:id', ProductoToMovimientoController.editVenta);

// eliminar
// router.delete('/:id', [checkJwt], VentaController.deleteCategoria);
// router.delete('/:id', ProductoToMovimientoController.deleteVenta);

export default router;