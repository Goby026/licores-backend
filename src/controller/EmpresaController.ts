import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from 'class-validator'
import { Empresa } from '../entity/Empresa';

export class EmpresaController {
// ****************** listar todo ******************
	static getAll = async (req: Request, res: Response) => {
        const empresaRepository = getRepository(Empresa);

        let empresas: Empresa[];

        try {

            empresas = await empresaRepository.find();
    
            if (empresas.length > 0) {
                return res.status(200).json({
                    empresas
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

// ****************** Obtener por id ******************
	static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const empresaRepository = getRepository(Empresa);
        try {
            const empresa = await empresaRepository.findOneOrFail(id);
            return res.send(empresa);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }
// ****************** Registrar ******************
    static newEmpresa = async (req: Request, res: Response) => {

        // const {nombre, descripcion } = req.body;
        // const empresa = new Empresa();

        // categoria.nombre = nombre;
        // categoria.descripcion = descripcion;
        // categoria.estado = 1;
        
        // const valOpt = {
        //     validationError: {
        //         target: false,
        //         value: false
        //     }
        // }

        // const errors = await validate(categoria, valOpt);

        // if (errors.length > 0) {
        //     return res.status(400).json({
        //         errors: errors
        //     });
        // }


        // const categoriaRepository = getRepository(Categoria);

        // try {

        //     await categoriaRepository.save(categoria);

        // } catch (error) {
        //     return res.status(409).json({
        //         message: 'El recurso ya existe en la base de datos'
        //     });
        // }

        // return res.status(201).json({
        //     message: 'recurso creado correctamente',
        //     categoria
        // });

    }




}