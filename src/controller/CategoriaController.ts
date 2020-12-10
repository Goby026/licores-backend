import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Categoria } from "../entity/Categoria";
import { validate } from 'class-validator'

export class CategoriaController {


    static getAll = async (req: Request, res: Response) => {
        const categoriaRepository = getRepository(Categoria);

        let categorias: Categoria[];

        try {

            categorias = await categoriaRepository.find();
    
            if (categorias.length > 0) {
                return res.status(200).json({
                    categorias: categorias
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
        const categoriaRepository = getRepository(Categoria);
        try {
            const categoria = await categoriaRepository.findOneOrFail(id);
            return res.send(categoria);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    static newCategoria = async (req: Request, res: Response) => {

        const {nombre, descripcion } = req.body;
        const categoria = new Categoria();

        categoria.nombre = nombre;
        categoria.descripcion = descripcion;
        categoria.estado = 1;

        // validaciones
        const valOpt = {
            validationError: {
                target: false,
                value: false
            }
        }

        const errors = await validate(categoria, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors: errors
            });
        }


        const categoriaRepository = getRepository(Categoria);

        try {

            await categoriaRepository.save(categoria);

        } catch (error) {
            return res.status(409).json({
                message: 'El recurso ya existe en la base de datos'
            });
        }

        //respuesta al frontend        
        return res.status(201).json({
            message: 'recurso creado correctamente',
            categoria
        });

    }

    static editCategoria = async (req: Request, res: Response) => {
        let categoria: Categoria;
        const { id } = req.params;
        const {nombre, descripcion } = req.body;

        //repositorio
        const categoriaRepository = getRepository(Categoria);

        try {

            categoria = await categoriaRepository.findOneOrFail(id);
            categoria.nombre = nombre;
            categoria.descripcion = descripcion;
            
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
        const errors = await validate(categoria, valOpt);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        // listo para modificar
        try {
            categoriaRepository.save(categoria);
        } catch (error) {
            return res.status(409).json({
                message: 'El recurso esta en uso'
            });
        }

        return res.status(201).json({
            message: 'elemento actualizado correctamente'
        })
    }
   

    static deleteCategoria = async (req: Request, res: Response) => {
        let categoria: Categoria;
        const { id } = req.params;
        //repositorio
        const categoriaRepository = getRepository(Categoria);

        try {
            categoria = await categoriaRepository.findOneOrFail(id);

        } catch (error) {
            res.status(404).json({
                message: 'elemento no encontrado'
            });
        }

        // eliminar 
        await categoriaRepository.delete(id);

        res.status(201).json({
            message: 'recurso borrado correctamente'
        });

    }

}

// export default UserController;