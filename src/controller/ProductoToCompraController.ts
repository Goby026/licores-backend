import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { ProductoToCompra } from "../entity/ProductoToCompra";
import { validate } from "class-validator";
import { Producto } from "../entity/Producto";
import { Categoria } from "../entity/Categoria";
import { Compra } from "../entity/Compra";
import { User } from "../entity/User";

export class ProductoToCompraController {


    static getAll = async (req: Request, res: Response) => {
        const productoToCompraRepository = getRepository(ProductoToCompra);

        let prodToCompras: ProductoToCompra[];

        try {

            prodToCompras = await productoToCompraRepository.find({
                relations: ["producto", "compra"]
            });

            if (prodToCompras.length > 0) {
                return res.status(200).json({
                    prodToCompras
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
        const productoToCompraRepository = getRepository(ProductoToCompra);
        try {
            const prodToCompras = await productoToCompraRepository.findOneOrFail(id, {
                relations: ["producto", "compra"]
            });
            return res.send(prodToCompras);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    //========================= buscar =========================
    static buscarProductoToCompra = async (req: Request, res: Response) => {

        const productoToCompraRepository = getRepository(ProductoToCompra);

        const { texto } = req.params;
        try {

            const compras = await productoToCompraRepository
                .createQueryBuilder("ptc")
                .innerJoinAndSelect("ptc.producto", "prod")
                .innerJoinAndSelect("ptc.compra", "com")
                .where("prod.nombre like :nombre", { nombre: `%${texto}%` })
                .getMany();

            if (compras.length > 0) {
                return res.status(200).json({
                    compras
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
    

    static newProductoToCompra = async (req: Request, res: Response) => {
        try {

            let productos = req.body.prodToCompra;
            let reqcompra = req.body.compra;

            // primero setear la compra
            let compra = new Compra();
            compra.fecha_compra = reqcompra.fecha_compra;
            compra.proveedor = reqcompra.proveedor;
            compra.ruc = reqcompra.ruc;
            compra.documento = reqcompra.documento;
            compra.serie = reqcompra.serie;
            compra.nro = reqcompra.nro;
            const userRepository = getRepository(User);
            compra.user = await userRepository.findOneOrFail(reqcompra.user_id);
            // registrar la compra
            const compraRepository = getRepository(Compra);
            // await compraRepository.save(compra);

            console.log('[COMPRA]->', compra);

            productos.forEach( async (item: any)=>{
                let prodToCompra = new ProductoToCompra();
                prodToCompra.cantidad = item.unidades;
                prodToCompra.unidades = item.unidades * item.cantidad;
                prodToCompra.costou = item.precioCompra;
                prodToCompra.dcto = item.dcto;
                prodToCompra.igv = 0.18 * item.precioCompra;
                prodToCompra.subtotal = item.subtotal;
                prodToCompra.producto = item;
                prodToCompra.compra = compra;

                // validaciones
                const valOpt = {
                    validationError: {
                        target: false,
                        value: false
                    }
                }

                const errors = await validate(prodToCompra, valOpt);

                if (errors.length > 0) {
                    return res.status(400).json({
                        errors: errors
                    });
                }

                const productoToCompraRepository = getRepository(ProductoToCompra);

                console.log('[PRODTOCOMPRA]->', prodToCompra);

                // await productoToCompraRepository.save(prodToCompra);

                //respuesta al frontend
                return res.status(201).json({
                    message: 'recurso registrado'
                });

            });

        } catch (error) {
            return res.status(409).json({
                message: 'El recurso ya existe en la base de datos',
                error
            });
        }       

    }

    // static editProducto = async (req: Request, res: Response) => {
    //     let producto: Producto;

    //     let articulos: Articulo[] = Array.from(req.body.articulos);
    //     const { id } = req.params;
    //     let { nombre, unidad, precioVenta, precioCompra, cantidad, imagen, stockMinimo, stockMaximo, stockReal, categoria } = req.body;

    //     //repositorio
    //     const productoToCompraRepository = getRepository(Producto);

    //     try {

    //         producto = await productoToCompraRepository.findOneOrFail(id);

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
    //         productoToCompraRepository.save(producto);
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
    //     const productoToCompraRepository = getRepository(Producto);

    //     try {
    //         producto = await productoToCompraRepository.findOneOrFail(id);

    //         // eliminar 
    //         await productoToCompraRepository.delete(id);

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