import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from 'class-validator'

export class UserController {


    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);

        let users: User[];

        try {

            users = await userRepository.find();
    
            if (users.length > 0) {
                return res.status(200).json({
                    usuarios: users
                });
            } else {
                return res.status(404).json({
                    message: 'no hay resultados'
                });
            }
        } catch (error) {
            return res.status(401).json({
                error
            });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            return res.send(user);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró usuario con el id indicado'
            });
        }
    }

    static newUser = async (req: Request, res: Response) => {

        const {apellidos, nombres,dni, username, password, role } = req.body;
        const user = new User();
        user.apellidos = apellidos;
        user.nombres = nombres;
        user.dni = dni;
        user.username = username;
        user.password = password;
        user.role = role;

        // validaciones
        const valOpt = {
            validationError: {
                target: false,
                value: false
            }
        }

        const errors = await validate(user, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors: errors
            });
        }


        const userRepository = getRepository(User);

        try {
            // hash del password
            user.hashPassword();

            await userRepository.save(user);

        } catch (error) {
            return res.status(409).json({
                message: 'Usuario ya existe'
            });
        }

        //respuesta al frontend        
        return res.status(201).json({
            message: 'usuario creado',
            usuario: user
        });

    }

    static editUser = async (req: Request, res: Response) => {
        let user: User;
        const { id } = req.params;
        const { apellidos, nombres, dni, username, role } = req.body;

        //repositorio
        const userRepository = getRepository(User);

        try {
            user = await userRepository.findOneOrFail(id);
            user.apellidos = apellidos;
            user.nombres = nombres;
            user.dni = dni;
            user.username = username;
            user.role = role;
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró usuario con el id indicado'
            });
        }

        const valOpt = {
            validationError: {
                target: false,
                value: false
            }
        }

        // validar
        const errors = await validate(user, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        // listo para modificar
        try {
            userRepository.save(user);
        } catch (error) {
            return res.status(409).json({
                message: 'Usuario esta en uso'
            });
        }

        return res.status(201).json({
            message: 'usuario actualizado correctamente'
        })
    }

    static editPassword = async (req: Request, res: Response) => {

        const { id } = req.params;
        // const { oldPassword, newPassword } = req.body;
        const { newPassword } = req.body;

        //repositorio
        const userRepository = getRepository(User);

        let user = new User();

        try {

            // if (!(oldPassword && newPassword)) {
            //     return res.status(400).json({
            //         message: 'Debe indicar password anterior y nuevo password'
            //     });
            // }

            user = await userRepository.findOneOrFail(id);

            // if (!user.checkPassword(oldPassword)) {
            //     return res.status(401).json({
            //         message: 'El password anterior no coincide'
            //     });
            // }

            user.password = newPassword;

            // validaciones
            const valOpt = {
                validationError: {
                    target: false,
                    value: false
                }
            }

            const errors = await validate(user, valOpt);

            if (errors.length > 0) {
                return res.status(400).json({
                    errors
                });
            }

            user.hashPassword();
            userRepository.update(id, user);

        } catch (error) {
            return res.status(404).json({
                message: error
            });
        }

        return res.json({
            message: 'se actualizó la contraseña correctamente',
            user
        });

    }

    static deleteUser = async (req: Request, res: Response) => {
        let user: User;
        const { id } = req.params;
        //repositorio
        const userRepository = getRepository(User);

        try {
            user = await userRepository.findOneOrFail(id);

        } catch (error) {
            res.status(404).json({
                message: 'usuario no encontrado'
            });
        }

        // eliminar usuario        
        await userRepository.delete(id);

        res.status(201).json({
            message: 'usuario borrado correctamente'
        });

    }

}

// export default UserController;