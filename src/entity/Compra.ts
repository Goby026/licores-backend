import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ProductoToCompra } from './ProductoToCompra';
import { User } from './User';

@Entity()
export class Compra{

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({name: 'fecha_compra', type: 'date'})
	@IsNotEmpty()
	public fecha_compra: Date;

	@Column()
	public proveedor: string;

	@Column()
	public ruc: string;

	@Column()
	public documento: string;

	@Column()
	public serie: string;

	@Column()
	public nro: string;

	//******************** RELACIONES ********************

	@ManyToOne(type => User, user => user.ventas)
    public user: User;
    
    @OneToMany(type => ProductoToCompra, productoToCompra => productoToCompra.compra)
    public productoToCompras!: ProductoToCompra[];

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}