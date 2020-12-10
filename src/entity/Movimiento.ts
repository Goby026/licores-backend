import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ProductoToMovimiento } from './ProductoToMovimiento';
import { User } from './User';

@Entity()
export class Movimiento{

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({name: 'fecha_compra', type: 'date'})
	@IsNotEmpty()
	public fecha: Date;

	@Column()
	public observaciones: string;

	@Column()
	public tipoMovimiento: number;

	//******************** RELACIONES ********************

	@ManyToOne(type => User, user => user.ventas)
    public user: User;
    
    @OneToMany(type => ProductoToMovimiento, productoToMovimiento => productoToMovimiento.movimiento)
    public productoToMovimiento!: ProductoToMovimiento[];

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}