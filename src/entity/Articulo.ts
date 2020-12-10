import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { IsNotEmpty } from 'class-validator';

import { Producto } from './Producto';


@Entity()
@Unique(['nombre'])
export class Articulo {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty()
    public nombre: string;

    @Column()
    @IsNotEmpty()
    public descripcion: string;

    @Column()
    @IsNotEmpty()
    public estado: number;

    // relaciones
    // @ManyToOne(type => Producto, producto => producto.articulos)
    // public producto!: Producto;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;    

}
