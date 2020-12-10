import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { MinLength, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Venta } from "./Venta";


@Entity()
@Unique(['username', 'dni'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nombres: string;

    @Column()
    @IsNotEmpty()
    apellidos: string;

    @Column()
    @IsNotEmpty()
    dni: string;

    @Column()
    @MinLength(6)    
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(6)
    // @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @OneToMany(type => Venta, venta => venta.user)
    ventas: Venta[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword ():void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(pws: string):boolean{
        return bcrypt.compareSync(pws, this.password);
    }

}
