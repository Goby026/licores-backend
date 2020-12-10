import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable, ManyToOne} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Articulo } from "./Articulo";
import { Categoria } from "./Categoria";
import { ProductoToVenta } from './ProductoToVenta';
import { ProductoToCompra } from './ProductoToCompra';
import { ProductoToMovimiento } from './ProductoToMovimiento';


@Entity()
@Unique(['nombre'])
export class Producto {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: 'nombre'})
    @IsNotEmpty()
    public nombre: string;

    @Column()
    @IsNotEmpty()
    public unidad: string;
    
    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public precioVenta: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    @IsNotEmpty()
    public precioCompra: number;

    @Column({ type: 'integer' })
    @IsNotEmpty()
    public cantidad: number;

    @Column()    
    public imagen: string;

    @Column()
    @IsNotEmpty()
    public stockMinimo: number;

    @Column()
    @IsNotEmpty()
    public stockMaximo: number;

    @Column()
    @IsNotEmpty()
    public stockReal: number;

    //******************** RELACIONES ********************
    @ManyToMany(type => Articulo)
    @JoinTable()
    public articulos! : Articulo[];
    
    @OneToMany(type => ProductoToVenta, productoToVenta => productoToVenta.producto)
    public productoToVentas!: ProductoToVenta[];

    @OneToMany(type => ProductoToCompra, productoToCompra => productoToCompra.producto)
    public productoToCompras!: ProductoToCompra[];

    @OneToMany(type => ProductoToMovimiento, productoToMovimiento => productoToMovimiento.producto)
    public productoToMovimiento!: ProductoToMovimiento[];

    @ManyToOne(type => Categoria, categoria => categoria.productos)
    public categoria!: Categoria;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}

