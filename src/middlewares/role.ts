import { Request, Response, NextFunction } from 'express';
import { getRepository } from "typeorm";
import { User } from '../entity/User';

export const checkRole = (roles: Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction)=>{
        //obtenemos todo el objeto del token para destructurarlo
        const { userId } = res.locals.jwtPayload;

        console.log('PAYLOAD->', userId);

        // repositorio
        const userRepository = getRepository(User);

        let user: User;

        try {
            user = await userRepository.findOneOrFail(userId);            
        } catch (error) {
            res.status(401).json({
                message: error
            });
        }
        console.log('USER->', user);

        // check

        const { role } = user;

        if(roles.includes(role)){
            next();
        }else{
            res.status(401).json({
                message: 'no autorizado'
            });
        }
    }

}