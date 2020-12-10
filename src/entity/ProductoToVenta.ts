import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Producto } from "./Producto";
import { Venta } from "./Venta";


@Entity()
// @Unique(['nombre'])
export class ProductoToVenta {

    @PrimaryGeneratedColumn()
    public id: number;

    // @Column()
    // @IsNotEmpty()
    // public productoId!: number;
    // public postId!: number;

    // @Column()
    // @IsNotEmpty()
    // public ventaId!: number;
    // public categoryId!: number;

    //************************ propiedades personalizada ************************
    @Column()
    @IsNotEmpty()
    public cantidad!: number;

    @Column()
    @IsNotEmpty()
    public unidades!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public preciou!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })   
    public dcto!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public igv!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public subtotal!: number;

    //******************** RELACIONES ********************
    @ManyToOne(type => Producto, producto => producto.productoToVentas)
    @JoinColumn({name: "productoId"})
    public producto!: Producto;

    @ManyToOne(type => Venta, venta => venta.productoToVentas)
    @JoinColumn({name: "ventaId"})
    public venta!: Venta;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}

