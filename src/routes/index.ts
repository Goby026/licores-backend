import { Router } from 'express';

import auth from './auth';

import user from './user';
import categoria from './categoria';
import articulos from './articulos';
import productos from './productos';
import ventas from './ventas';
import productoToVenta from './productoToVenta';
import productoToCompra from './productoToCompra';
import productoToMovimiento from './productoToMovimiento';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/categorias', categoria);
routes.use('/articulos', articulos);
routes.use('/productos', productos);
routes.use('/ventas', ventas);
routes.use('/prod-venta', productoToVenta);
routes.use('/prod-compra', productoToCompra);
routes.use('/prod-movimiento', productoToMovimiento);

export default routes;