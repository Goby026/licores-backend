import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable, ManyToOne} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { ProductoToVenta } from './ProductoToVenta';
import { User } from './User';


@Entity()
// @Unique(['nombre'])
export class Venta {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: 'fecha_venta', type: 'date'})
    @IsNotEmpty()
    public fecha_venta: Date;

    //******************** RELACIONES ********************

    @ManyToOne(type => User, user => user.ventas)
    public user: User;
    
    @OneToMany(type => ProductoToVenta, productoToVenta => productoToVenta.venta)
    public productoToVentas!: ProductoToVenta[];

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;

}

