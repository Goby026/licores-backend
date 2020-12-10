import { Router } from 'express'
import { UserController } from '../controller/UserController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// listar todos los usuarios
// router.get('/', [checkJwt], UserController.getAll);
router.get('/', UserController.getAll);

// obtener usuario por id
// router.get('/:id', [checkJwt], UserController.getById);
router.get('/:id', UserController.getById);

//crear usuario
router.post('/newUser', UserController.newUser);

// editar usuario
// router.patch('/:id', [checkJwt], UserController.editUser);
router.patch('/:id', UserController.editUser);

// editar password
// router.patch('/editPassword/:id', [checkJwt], UserController.editPassword);
router.patch('/editPassword/:id', UserController.editPassword);

// eliminar usuario
router.delete('/:id', [checkJwt], UserController.deleteUser);

export default router;