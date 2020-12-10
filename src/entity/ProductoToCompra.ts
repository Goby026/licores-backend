import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Producto } from "./Producto";
import { Compra } from "./Compra";


@Entity()
// @Unique(['nombre'])
export class ProductoToCompra {

    @PrimaryGeneratedColumn()
    public id: number;

    //************************ propiedades personalizada ************************
    @Column()
    @IsNotEmpty()
    public cantidad!: number;

    @Column()
    @IsNotEmpty()
    public unidades!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public costou!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })   
    public dcto!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public igv!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public subtotal!: number;

    //******************** RELACIONES ********************
    @ManyToOne(type => Producto, producto => producto.productoToCompras)
    @JoinColumn({name: "productoId"})
    public producto!: Producto;

    @ManyToOne(type => Compra, compra => compra.productoToCompras)
    @JoinColumn({name: "compraId"})
    public compra!: Compra;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}

