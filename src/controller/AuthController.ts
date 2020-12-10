import { getRepository } from 'typeorm';
import { Request, Response, json } from "express";
import * as jwt from 'jsonwebtoken';
import config from './../config/config';
import { User } from '../entity/User'

class AuthController{
    static login = async( req: Request, res: Response )=>{

        const { username, password } = req.body;

        if(!(username && password)){
            return res.status(400).json({
                message: 'Usuario y password requerido'
            });
        }

        // entity
        const userRepository = getRepository(User);

        let user: User;

        try {
            user = await userRepository.findOneOrFail({
                where: {
                    username: username
                }
            });

        } catch (error) {
            return res.status(400).json({
                message: 'Usuario o password incorrecto'
            });
        }

        if (!user.checkPassword(password)) {
            return res.status(400).json({
                message: 'Password incorrecto'
            });
        }

        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, {expiresIn:'1h'});

        return res.json({
            usuario: user,
            token: token
        });

    }
}

export default AuthController;