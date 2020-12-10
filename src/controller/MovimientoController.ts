import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { Movimiento } from "../entity/Movimiento";
import { validate } from 'class-validator'
import { Articulo } from "../entity/Articulo";
import { Categoria } from "../entity/Categoria";

export class MovimientoController {


    static getAll = async (req: Request, res: Response) => {
        const movimientoRepository = getRepository(Movimiento);

        let movimientos: Movimiento[];

        try {

            movimientos = await movimientoRepository.find({
                relations: ["user"]
            });
    
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
        const movimientoRepository = getRepository(Movimiento);
        try {
            const movimiento = await movimientoRepository.findOneOrFail(id, {
                relations: ["user"]
            });
            return res.send(movimiento);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    //========================= buscar =========================
      static buscarMovimiento = async (req: Request, res: Response) => {

        const movimientoRepository = getRepository(Movimiento);

        const { fecha } = req.params;

        // console.log('PARAMS=>', texto);

        let movimientos: Movimiento[];
        try {
          movimientos = await movimientoRepository.find({
            relations:["user"],
            where:[
              {fecha: Like("%"+ fecha +"%")},
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

    static newMovimiento = async (req: Request, res: Response) => {

        // let articulos: Articulo[] = Array.from(req.body.articulos);
        // let { nombre, unidad, precioVenta, precioCompra, cantidad, imagen, stockMinimo, stockMaximo, stockReal, categoria } = req.body;

        // const producto = new Producto();

        // producto.nombre = nombre;
        // producto.unidad = unidad;
        // producto.precioVenta = precioVenta;
        // producto.precioCompra = precioCompra;
        // producto.cantidad = cantidad;
        // producto.imagen = imagen;
        // producto.stockMinimo = stockMinimo;
        // producto.stockMaximo = stockMaximo;
        // producto.stockReal = stockReal;
        // producto.articulos = articulos;

        // const categoriaRepository = getRepository(Categoria);
        // producto.categoria = await categoriaRepository.findOneOrFail(categoria);

        // // validaciones
        // const valOpt = {
        //     validationError: {
        //         target: false,
        //         value: false
        //     }
        // }

        // const errors = await validate(producto, valOpt);

        // if (errors.length > 0) {
        //     return res.status(400).json({
        //         errors: errors
        //     });
        // }


        // const movimientoRepository = getRepository(Movimiento);

        // try {

        //     await movimientoRepository.save(producto);

        // } catch (error) {
        //     return res.status(409).json({
        //         message: 'El recurso ya existe en la base de datos',
        //         error
        //     });
        // }

        // //respuesta al frontend        
        // return res.status(201).json({
        //     message: 'recurso creado correctamente',
        //     producto
        // });

    }

    static editMovimiento = async (req: Request, res: Response) => {
        // let producto: Producto;

        // let articulos: Articulo[] = Array.from(req.body.articulos);
        // const { id } = req.params;
        // let { nombre, unidad, precioVenta, precioCompra, cantidad, imagen, stockMinimo, stockMaximo, stockReal, categoria } = req.body;

        // //repositorio
        // const movimientoRepository = getRepository(Movimiento);

        // try {

        //     producto = await movimientoRepository.findOneOrFail(id);

        //     producto.nombre = nombre;
        //     producto.unidad = unidad;
        //     producto.precioVenta = precioVenta;
        //     producto.precioCompra = precioCompra;
        //     producto.cantidad = cantidad;
        //     producto.imagen = imagen;
        //     producto.stockMinimo = stockMinimo;
        //     producto.stockMaximo = stockMaximo;
        //     producto.stockReal = stockReal;
        //     producto.articulos = articulos;

        //     const categoriaRepository = getRepository(Categoria);
        //     producto.categoria = await categoriaRepository.findOneOrFail(categoria);
            
        // } catch (error) {
        //     return res.status(404).json({
        //         message: 'No se econtró el recurso con el id indicado'
        //     });
        // }

        // const valOpt = {
        //     validationError: {
        //         target: false,
        //         value: false
        //     }
        // }

        // // validar
        // const errors = await validate(producto, valOpt);

        // if (errors.length > 0) {
        //     return res.status(400).json({
        //         errors
        //     });
        // }

        // // listo para modificar
        // try {
        //     movimientoRepository.save(producto);
        // } catch (error) {
        //     return res.status(409).json({
        //         message: 'El recurso esta en uso'
        //     });
        // }

        // return res.status(201).json({
        //     message: 'elemento actualizado correctamente'
        // })
    }
   

    static deleteMovimiento = async (req: Request, res: Response) => {
        // let producto: Producto;
        // const { id } = req.params;
        // //repositorio
        // const movimientoRepository = getRepository(Movimiento);

        // try {
        //     producto = await movimientoRepository.findOneOrFail(id);

        //     // eliminar 
        //     await movimientoRepository.delete(id);

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