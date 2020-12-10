import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { ProductoToMovimiento } from "../entity/ProductoToMovimiento";
import { validate } from 'class-validator'
import { Movimiento } from "../entity/Movimiento";
import { Producto } from '../entity/Producto';
import { User } from "../entity/User";

export class ProductoToMovimientoController {


    static getAll = async (req: Request, res: Response) => {
        const prodTomovRepository = getRepository(ProductoToMovimiento);
        const {ultimos} = req.params;

        let movimientos: ProductoToMovimiento[];

        try {

            if (parseInt( ultimos ) > 0) {
                // console.log('*******buscar ultimos 5*******', req.body.buscar);
                movimientos = await prodTomovRepository.find({
                    relations: ["movimiento","producto"],
                    take: 5,
                    order: {
                        created_at: 'DESC'
                    }
                });
            }else{
                // console.log('-----------mostrar todo-----------');
                movimientos = await prodTomovRepository.find({
                    relations: ["movimiento","producto"]
                });
            }
    
            if (movimientos.length > 0) {
                return res.status(200).json({
                    movimientos
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
        const prodTomovRepository = getRepository(ProductoToMovimiento);
        try {
            const movimiento = await prodTomovRepository.findOneOrFail(id, {
                relations: ["producto"]
            });
            return res.send(movimiento);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    //========================= buscar =========================
      static buscarProToMovimiento = async (req: Request, res: Response) => {

        const prodTomovRepository = getRepository(ProductoToMovimiento);

        const { idmovimiento } = req.params;

        // console.log('PARAMS=>', texto);

        let movimientos: ProductoToMovimiento[];
        try {
          movimientos = await prodTomovRepository.find({
            relations:["user"],
            where:[
              {movimiento: Like("%"+ idmovimiento +"%")},
              // {apellidos: Like("%"+ texto +"%")},
              // {num_documento: Like("%"+ texto +"%")},
              // {fecha_solicitud: Like("%"+ texto +"%")}
            ]
          });
          if (movimientos.length > 0) {
            return res.status(200).json({
              movimientos
            });
          } else {
            return res.status(204).json({
              message: "no hay resultados",
            });
          }
        } catch (error) {
          return res.status(401).json({
            error,
          });
        }

      }

    static newProductoToMovimiento = async (req: Request, res: Response) => {

        let productos: any[] = Array.from(req.body.addProductos);
        let movimiento: any = req.body.movimiento;
        const mov = new Movimiento();
        
        try {

        
        mov.fecha = movimiento.fecha;
        mov.observaciones = movimiento.observaciones;
        mov.tipoMovimiento = movimiento.tipoMovimiento;

        const userRepository = getRepository(User);
        mov.user = await userRepository.findOneOrFail(movimiento.userId);

        const movimientoRepository = getRepository(Movimiento);
        await movimientoRepository.save(mov);

        productos.forEach( async (item: any)=>{
            const prodToMov = new ProductoToMovimiento();
            prodToMov.cantidad = item.num;
            prodToMov.importe = item.importe;
            prodToMov.subtotal = item.subtotal;
            const productoRepository = getRepository(Producto);
            prodToMov.producto = await productoRepository.findOneOrFail(item.productoId);
            prodToMov.movimiento = mov;

            

            // validaciones
            const valOpt = {
                validationError: {
                    target: false,
                    value: false
                }
            }

            const errors = await validate(prodToMov, valOpt);

            if (errors.length > 0) {
                return res.status(400).json({
                    errors: errors
                });
            }


            const prodToMovRepository = getRepository(ProductoToMovimiento);
            await prodToMovRepository.save(prodToMov);

            });

        } catch (error) {
            return res.status(409).json({
                message: 'El recurso ya existe en la base de datos',
                error
            });
        }

        //respuesta al frontend
        return res.status(201).json({
            message: 'recurso creado correctamente',
            mov
        });

    }

    static editProductoToMovimiento = async (req: Request, res: Response) => {
        let productos: any[] = Array.from(req.body.addProductos);
        let movimiento: any = req.body.movimiento;
        const mov = new Movimiento();
        
        try {

        
        mov.fecha = movimiento.fecha;
        mov.observaciones = movimiento.observaciones;
        mov.tipoMovimiento = movimiento.tipoMovimiento;

        const userRepository = getRepository(User);
        mov.user = await userRepository.findOneOrFail(movimiento.userId);

        const movimientoRepository = getRepository(Movimiento);
        await movimientoRepository.save(mov);

        productos.forEach( async (item: any)=>{
            const prodToMov = new ProductoToMovimiento();
            prodToMov.cantidad = item.num;
            prodToMov.importe = item.importe;
            prodToMov.subtotal = item.subtotal;
            const productoRepository = getRepository(Producto);
            prodToMov.producto = await productoRepository.findOneOrFail(item.productoId);
            prodToMov.movimiento = mov;

            

            // validaciones
            const valOpt = {
                validationError: {
                    target: false,
                    value: false
                }
            }

            const errors = await validate(prodToMov, valOpt);

            if (errors.length > 0) {
                return res.status(400).json({
                    errors: errors
                });
            }


            const prodToMovRepository = getRepository(ProductoToMovimiento);
            await prodToMovRepository.save(prodToMov);

            });

        } catch (error) {
            return res.status(409).json({
                message: 'El recurso ya existe en la base de datos',
                error
            });
        }

        //respuesta al frontend
        return res.status(201).json({
            message: 'recurso creado correctamente',
            mov
        });
    }
   

    static deleteMovimiento = async (req: Request, res: Response) => {
        // let producto: Producto;
        // const { id } = req.params;
        // //repositorio
        // const prodTomovRepository = getRepository(ProductoToMovimiento);

        // try {
        //     producto = await prodTomovRepository.findOneOrFail(id);

        //     // eliminar 
        //     await prodTomovRepository.delete(id);

        // } catch (error) {
        //     res.status(404).json({
        //         message: 'elemento no encontrado'
        //     });
        // }        

        // res.status(201).json({
        //     message: 'recurso borrado correctamente'
        // });

    }

}

// export default UserController;