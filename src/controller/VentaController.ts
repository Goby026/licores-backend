import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { Producto } from "../entity/Producto";
import { Venta } from "../entity/Venta";
import { validate } from 'class-validator';
const pdf = require('html-pdf');
const fs = require('fs');

export class VentaController {


    static getAll = async (req: Request, res: Response) => {
        const ventaRepository = getRepository(Venta);

        let ventas: Venta[];

        try {

            ventas = await ventaRepository.find({
                relations: ["user", "productoToVentas"]
            });

            if (ventas.length > 0) {
                return res.status(200).json({
                    ventas
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
        const ventaRepository = getRepository(Venta);
        try {
            const venta = await ventaRepository.findOneOrFail(id, {
                relations: ["user", "productoToVentas"]
            });
            return res.send(venta);
        } catch (error) {
            return res.status(404).json({
                message: 'No se econtró elemento con el id indicado'
            });
        }
    }

    //========================= buscar =========================
    static buscarVentas = async (req: Request, res: Response) => {

        const ventaRepository = getRepository(Venta);
        const { texto } = req.params;

        // console.log('PARAMS=>', texto);

        let ventas: Venta[];
        try {
            ventas = await ventaRepository.find({
                relations: ["user", "productoToVentas"],
                where:[
                {fecha_venta: Like("%"+ texto +"%")},
                // {apellidos: Like("%"+ texto +"%")},
                // {num_documento: Like("%"+ texto +"%")},
                // {fecha_solicitud: Like("%"+ texto +"%")}
                ]
            });
            if (ventas.length > 0) {
                return res.status(200).json({
                    ventas
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

    //========================= buscar por fecha =========================
    static buscarVentasFecha = async (req: Request, res: Response) => {

        const ventaRepository = getRepository(Venta);
        const { fecha_venta } = req.params;

        console.log('PARAMS=>', fecha_venta);

        let ventas: Venta[];
        try {
            const ventas = await ventaRepository
            .createQueryBuilder("ventas")
            .innerJoinAndSelect("ventas.productoToVentas", "productoToVenta")
            .innerJoinAndSelect("productoToVenta.producto", "producto")
            .where("ventas.fecha_venta = :fecha", { fecha: fecha_venta })
            .getMany();

            return res.status(200).json({
                ventas
            });
        } catch (error) {
            return res.status(401).json({
                error,
            });
        }

    }


    // crear reportes
    static reporteVentas = (req: Request, res: Response) => {        
        let content = fs.readFileSync('./test/businesscard.html', 'utf8');
        let options = { format: 'A4' };
        

            pdf.create(content, options).toFile('./reportes/html-pdf.pdf', function(err, pdf) {
                if (err){
                    return console.log(err);
                } else {
                    // let dataFile = fs.readFileSync('./reportes/html-pdf.pdf');
                    // res.setHeader('Content-type', 'application/pdf');
                    // res.send(dataFile);
                    res.send(pdf);
                }
            });

            // pdf.create(content, options).toStream(function(err, stream){                
            //       stream.pipe(fs.createWriteStream('./reportes/html-pdf.pdf'));
            //     });
    }
}