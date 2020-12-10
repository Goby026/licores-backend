import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';


export const checkJwt = (req: Request, res:Response, next: NextFunction)=>{
    console.log('REQ->', req.headers);
    const token = <string>req.headers['auth'];
    let jwtPayLoad: any;

    try {
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayLoad;
    } catch (error) {
        return res.status(401).json({
            message: error
        });
    }

    const { userId, username } = jwtPayLoad;

    const newToken = jwt.sign({userId, username}, config.jwtSecret, {expiresIn:'8h'});

    res.setHeader('token', newToken);

    //call next method

    next();
}