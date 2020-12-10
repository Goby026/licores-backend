import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { Articulo } from "../entity/Articulo";
import { validate } from 'class-validator'

export class ArticuloController {


    static getAll = async (req: Request, res: Response) => {
        const articuloRepository = getRepository(Articulo);

        let articulos: Articulo[];

        try {

            articulos = await articuloRepository.find();
    
            if (articulos.length > 0) {
                return res.status(200).json({
                    articulos
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

    static search = async (req: Request, res: Response) => {
        const { art } = req.params;
        const articuloRepository = getRepository(Articulo);
        try {
            const articulo = await articuloRepository.find({
                where:[
                  {nombre: Like("%"+ art +"%")}
                ]
            });
            return res.send(articulo);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }

        // return res.status(200).json({
        //     message: 'articulo',
        //     art
        // });
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const articuloRepository = getRepository(Articulo);
        try {
            const articulo = await articuloRepository.findOneOrFail(id);
            return res.send(articulo);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    static newArticulo = async (req: Request, res: Response) => {

        const {nombre, descripcion } = req.body;
        const articulo = new Articulo();

        articulo.nombre = nombre;
        articulo.descripcion = descripcion;
        articulo.estado = 1;

        // validaciones
        const valOpt = {
            validationError: {
                target: false,
                value: false
            }
        }

        const errors = await validate(articulo, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors: errors
            });
        }


        const articuloRepository = getRepository(Articulo);

        try {

            await articuloRepository.save(articulo);

        } catch (error) {
            return res.status(409).json({
                message: 'El recurso ya existe en la base de datos'
            });
        }

        //respuesta al frontend        
        return res.status(201).json({
            message: 'recurso creado correctamente',
            articulo
        });

    }

    static editArticulo = async (req: Request, res: Response) => {
        let articulo: Articulo;
        const { id } = req.params;
        const {nombre, descripcion } = req.body;

        //repositorio
        const articuloRepository = getRepository(Articulo);

        try {

            articulo = await articuloRepository.findOneOrFail(id);
            articulo.nombre = nombre;
            articulo.descripcion = descripcion;
            
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
        const errors = await validate(articulo, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        // listo para modificar
        try {
            articuloRepository.save(articulo);
        } catch (error) {
            return res.status(409).json({
                message: 'El recurso esta en uso'
            });
        }

        return res.status(201).json({
            message: 'elemento actualizado correctamente'
        })
    }
   

    static deleteArticulo = async (req: Request, res: Response) => {
        let articulo: Articulo;
        const { id } = req.params;
        //repositorio
        const articuloRepository = getRepository(Articulo);

        try {
            articulo = await articuloRepository.findOneOrFail(id);

            // eliminar 
            await articuloRepository.delete(id);

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