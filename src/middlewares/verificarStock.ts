import { Request, Response, NextFunction } from 'express';
import config from '../config/config';


export const ifStock = (req: Request, res:Response, next: NextFunction)=>{

    let productos = req.body.prodToVenta;


    productos.forEach( (item)=>{
        if (item.stockReal <= 0) {
            console.log('no se puede vender, no hay stock')
            
        }
    });
    

    // next();
}