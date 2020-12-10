import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { Producto } from "../entity/Producto";
import { validate } from 'class-validator'
import { Articulo } from "../entity/Articulo";
import { Categoria } from "../entity/Categoria";

export class ProductoController {


    static getAll = async (req: Request, res: Response) => {
        const productoRepository = getRepository(Producto);

        let productos: Producto[];

        try {

            productos = await productoRepository.find({
                relations: ["articulos", "categoria"]
            });
    
            if (productos.length > 0) {
                return res.status(200).json({
                    productos
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

    static buscarCat = async (req: Request, res: Response) => {

        const {cod} = req.params;

        const productoRepository = getRepository(Producto);

        try {

            console.log('[PARAMS]->', cod);

            const productos = await productoRepository
                .createQueryBuilder("p")
                .innerJoinAndSelect("p.categoria", "cat")
                .where("cat.id = :id", { id: cod })
                .getMany();
    
            return res.status(200).json({
                    productos
            });

        } catch (error) {
            return res.status(401).json({
                error
            });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const productoRepository = getRepository(Producto);
        try {
            const producto = await productoRepository.findOneOrFail(id, {
                relations: ["articulos", "categoria"]
            });
            return res.send(producto);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    //========================= buscar =========================
      static buscarProducto = async (req: Request, res: Response) => {

        const productoRepository = getRepository(Producto);

        const { texto } = req.params;

        // console.log('PARAMS=>', texto);

        let productos: Producto[];
        try {
          productos = await productoRepository.find({
            relations:["categoria", "articulos"],
            where:[
              {nombre: Like("%"+ texto +"%")}
            ]
          });
          if (productos.length > 0) {
            return res.status(200).json({
              productos
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

    static newProducto = async (req: Request, res: Response) => {

        let articulos: Articulo[] = Array.from(req.body.articulos);
        let { nombre, unidad, precioVenta, precioCompra, cantidad, imagen, stockMinimo, stockMaximo, stockReal, categoria } = req.body;

        const producto = new Producto();

        producto.nombre = nombre;
        producto.unidad = unidad;
        producto.precioVenta = precioVenta;
        producto.precioCompra = precioCompra;
        producto.cantidad = cantidad;
        producto.imagen = imagen;
        producto.stockMinimo = stockMinimo;
        producto.stockMaximo = stockMaximo;
        producto.stockReal = stockReal;
        producto.articulos = articulos;

        const categoriaRepository = getRepository(Categoria);
        producto.categoria = await categoriaRepository.findOneOrFail(categoria);

        // validaciones
        const valOpt = {
            validationError: {
                target: false,
                value: false
            }
        }

        const errors = await validate(producto, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors: errors
            });
        }


        const productoRepository = getRepository(Producto);

        try {

            await productoRepository.save(producto);

        } catch (error) {
            return res.status(409).json({
                message: 'El recurso ya existe en la base de datos',
                error
            });
        }

        //respuesta al frontend        
        return res.status(201).json({
            message: 'recurso creado correctamente',
            producto
        });

    }

    static editProducto = async (req: Request, res: Response) => {
        let producto: Producto;

        let articulos: Articulo[] = Array.from(req.body.articulos);
        const { id } = req.params;
        let { nombre, unidad, precioVenta, precioCompra, cantidad, imagen, stockMinimo, stockMaximo, stockReal, categoria } = req.body;

        //repositorio
        const productoRepository = getRepository(Producto);

        try {

            producto = await productoRepository.findOneOrFail(id);

            producto.nombre = nombre;
            producto.unidad = unidad;
            producto.precioVenta = precioVenta;
            producto.precioCompra = precioCompra;
            producto.cantidad = cantidad;
            producto.imagen = imagen;
            producto.stockMinimo = stockMinimo;
            producto.stockMaximo = stockMaximo;
            producto.stockReal = stockReal;
            producto.articulos = articulos;

            const categoriaRepository = getRepository(Categoria);
            producto.categoria = await categoriaRepository.findOneOrFail(categoria);
            
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró el recurso con el id indicado'
            });
        }

        const valOpt = {
            validationError: {
                target: false,
                value: false
            }
        }

        // validar
        const errors = await validate(producto, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        // listo para modificar
        try {
            productoRepository.save(producto);
        } catch (error) {
            return res.status(409).json({
                message: 'El recurso esta en uso'
            });
        }

        return res.status(201).json({
            message: 'elemento actualizado correctamente'
        })
    }
   

    static deleteProducto = async (req: Request, res: Response) => {
        let producto: Producto;
        const { id } = req.params;
        //repositorio
        const productoRepository = getRepository(Producto);

        try {
            producto = await productoRepository.findOneOrFail(id);

            // eliminar 
            await productoRepository.delete(id);

        } catch (error) {
            res.status(404).json({
                message: 'elemento no encontrado'
            });
        }        

        res.status(201).json({
            message: 'recurso borrado correctamente'
        });

    }

}

// export default UserController;