import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Producto } from "./Producto";
import { Movimiento } from "./Movimiento";


@Entity()
// @Unique(['nombre'])
export class ProductoToMovimiento {

    @PrimaryGeneratedColumn()
    public id: number;

    //************************ propiedades personalizada ************************
    @Column()
    @IsNotEmpty()
    public cantidad!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public importe!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public subtotal!: number;

    //******************** RELACIONES ********************
    @ManyToOne(type => Producto, producto => producto.productoToMovimiento)
    @JoinColumn({name: "productoId"})
    public producto!: Producto;

    @ManyToOne(type => Movimiento, movimiento => movimiento.productoToMovimiento)
    @JoinColumn({name: "movimientoId"})
    public movimiento!: Movimiento;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}

