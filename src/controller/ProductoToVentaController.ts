import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { ProductoToVenta } from "../entity/ProductoToVenta";
import { validate } from "class-validator";
import { Producto } from "../entity/Producto";
import { Categoria } from "../entity/Categoria";
import { Venta } from "../entity/Venta";
import { User } from "../entity/User";

export class ProductoToVentaController {


    static getAll = async (req: Request, res: Response) => {
        const productoToVentaRepository = getRepository(ProductoToVenta);

        let prodToVentas: ProductoToVenta[];

        try {

            prodToVentas = await productoToVentaRepository.find({
                relations: ["producto", "venta"]
            });

            if (prodToVentas.length > 0) {
                return res.status(200).json({
                    prodToVentas
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
        const productoToVentaRepository = getRepository(ProductoToVenta);
        try {
            const prodToVentas = await productoToVentaRepository.findOneOrFail(id, {
                relations: ["producto", "venta"]
            });
            return res.send(prodToVentas);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    //========================= buscar =========================
    static buscarProductoToVenta = async (req: Request, res: Response) => {

        const productoToVentaRepository = getRepository(ProductoToVenta);

        const { texto } = req.params;

        // console.log('PARAMS=>', texto);

        let prodToVentas: ProductoToVenta[];
        try {
            prodToVentas = await productoToVentaRepository.find({
                relations:["producto", "venta"],
                where:[
                {id: Like("%"+ texto +"%")},
                // {apellidos: Like("%"+ texto +"%")},
                // {num_documento: Like("%"+ texto +"%")},
                // {fecha_solicitud: Like("%"+ texto +"%")}
                ]
            });
            if (prodToVentas.length > 0) {
                return res.status(200).json({
                    prodToVentas
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
    

    static newProductoToVenta = async (req: Request, res: Response) => {
        try {

            console.log('PROD TO VENTA');

            let productos = req.body.prodToVenta;
            let reqventa = req.body.venta;            

            // primero setear la venta
            let venta = new Venta();
            venta.fecha_venta = reqventa.fecha_venta;
            const userRepository = getRepository(User);
            venta.user = await userRepository.findOneOrFail(reqventa.user_id);
            // venta.user = reqventa.user_id;
            // registrar la venta
            const ventaRepository = getRepository(Venta);
            await ventaRepository.save(venta);

            productos.forEach( async (item: any)=>{
                let prodToVenta = new ProductoToVenta();
                prodToVenta.cantidad = item.cantidad;
                prodToVenta.unidades = item.unidades * item.cantidad;
                prodToVenta.preciou = item.precioVenta;
                prodToVenta.dcto = 0;
                prodToVenta.igv = 0.18 * item.precioVenta;
                prodToVenta.subtotal = item.cantidad * item.precioVenta;
                prodToVenta.producto = item;
                prodToVenta.venta = venta;

                // validaciones
                const valOpt = {
                    validationError: {
                        target: false,
                        value: false
                    }
                }

                const errors = await validate(prodToVenta, valOpt);

                if (errors.length > 0) {
                    return res.status(400).json({
                        errors: errors
                    });
                }

                const productoToVentaRepository = getRepository(ProductoToVenta);

                await productoToVentaRepository.save(prodToVenta);

            });            

        } catch (error) {
            return res.status(409).json({
                message: 'El recurso ya existe en la base de datos',
                error
            });
        }

        //respuesta al frontend
        return res.status(201).json({
            message: 'venta registrada'
        });

    }

    // static editProducto = async (req: Request, res: Response) => {
    //     let producto: Producto;

    //     let articulos: Articulo[] = Array.from(req.body.articulos);
    //     const { id } = req.params;
    //     let { nombre, unidad, precioVenta, precioCompra, cantidad, imagen, stockMinimo, stockMaximo, stockReal, categoria } = req.body;

    //     //repositorio
    //     const productoToVentaRepository = getRepository(Producto);

    //     try {

    //         producto = await productoToVentaRepository.findOneOrFail(id);

    //         producto.nombre = nombre;
    //         producto.unidad = unidad;
    //         producto.precioVenta = precioVenta;
    //         producto.precioCompra = precioCompra;
    //         producto.cantidad = cantidad;
    //         producto.imagen = imagen;
    //         producto.stockMinimo = stockMinimo;
    //         producto.stockMaximo = stockMaximo;
    //         producto.stockReal = stockReal;
    //         producto.articulos = articulos;

    //         const categoriaRepository = getRepository(Categoria);
    //         producto.categoria = await categoriaRepository.findOneOrFail(categoria);

    //     } catch (error) {
    //         return res.status(404).json({
    //             message: 'No se econtró el recurso con el id indicado'
    //         });
    //     }

    //     const valOpt = {
    //         validationError: {
    //             target: false,
    //             value: false
    //         }
    //     }

    //     // validar
    //     const errors = await validate(producto, valOpt);

    //     if (errors.length > 0) {
    //         return res.status(400).json({
    //             errors
    //         });
    //     }

    //     // listo para modificar
    //     try {
    //         productoToVentaRepository.save(producto);
    //     } catch (error) {
    //         return res.status(409).json({
    //             message: 'El recurso esta en uso'
    //         });
    //     }

    //     return res.status(201).json({
    //         message: 'elemento actualizado correctamente'
    //     })
    // }


    // static deleteProductoToVenta = async (req: Request, res: Response) => {
    //     let producto: Producto;
    //     const { id } = req.params;
    //     //repositorio
    //     const productoToVentaRepository = getRepository(Producto);

    //     try {
    //         producto = await productoToVentaRepository.findOneOrFail(id);

    //         // eliminar 
    //         await productoToVentaRepository.delete(id);

    //     } catch (error) {
    //         res.status(404).json({
    //             message: 'elemento no encontrado'
    //         });
    //     }        

    //     res.status(201).json({
    //         message: 'recurso borrado correctamente'
    //     });

    // }

}