import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { MinLength, IsNotEmpty } from 'class-validator';


@Entity()
@Unique(['empresa'])
export class Empresa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    empresa: string;

    @Column()
    @IsNotEmpty()
    representante: string;

    @Column()
    @IsNotEmpty()
    ruc: string;

    @Column()
    @IsNotEmpty()
    telefono: string;

    @Column()
    email: string;

    @Column()
    @IsNotEmpty()
    direccion: string;

    @Column()
    web: string;

    @Column()
    rubro: string;
    
    @Column()
    logo: string;

    @Column()
    pais: string;

    @Column()
    provincia: string;

    @Column()
    ciudad: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;    

}
