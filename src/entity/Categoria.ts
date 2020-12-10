import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { MinLength, IsNotEmpty } from 'class-validator';
import { Producto } from "./Producto";


@Entity()
@Unique(['nombre'])
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nombre: string;

    @Column()
    @IsNotEmpty()
    descripcion: string;

    @Column()
    @IsNotEmpty()
    estado: number;

    @OneToMany( type => Producto, producto => producto.categoria)
    productos: Producto[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;    

}
