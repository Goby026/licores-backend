import { Router } from 'express'
import { VentaController } from '../controller/VentaController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// listar todos
// router.get('/', [checkJwt], VentaController.getAll);
router.get('/', VentaController.getAll);

// obtener por id
// router.get('/:id', [checkJwt], VentaController.getById);
router.get('/:id', VentaController.getById);

// buscar
router.get('/buscarVentas/:texto', VentaController.buscarVentas);

// buscar por fecha
router.get('/buscarVentasFecha/:fecha_venta', VentaController.buscarVentasFecha);

//crear
// router.post('/newVenta', VentaController.newVenta);

// editar
// router.patch('/:id', [checkJwt], VentaController.editUser);
// router.put('/:id', VentaController.editVenta);

// eliminar
// router.delete('/:id', [checkJwt], VentaController.deleteCategoria);
// router.delete('/:id', VentaController.deleteVenta);

// crear reporte
router.post('/reporte', VentaController.reporteVentas);

export default router;