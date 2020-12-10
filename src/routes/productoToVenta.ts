import { Router } from 'express'
import { ProductoToVentaController } from '../controller/ProductoToVentaController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
import { ifStock } from '../middlewares/verificarStock';

const router = Router();

// listar todos
// router.get('/', [checkJwt], VentaController.getAll);
router.get('/', ProductoToVentaController.getAll);

// obtener por id
// router.get('/:id', [checkJwt], VentaController.getById);
router.get('/:id', ProductoToVentaController.getById);

// buscar
router.get('/buscarVentas/:texto', ProductoToVentaController.buscarProductoToVenta);

//crear
router.post('/new', [ifStock], ProductoToVentaController.newProductoToVenta);

// editar
// router.patch('/:id', [checkJwt], VentaController.editUser);
// router.put('/:id', ProductoToVentaController.editVenta);

// eliminar
// router.delete('/:id', [checkJwt], VentaController.deleteCategoria);
// router.delete('/:id', ProductoToVentaController.deleteVenta);

export default router;