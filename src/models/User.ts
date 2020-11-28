import { UserInterface } from './../interfaces/userInterface';
import { Role } from './Role';
import {Entity,BaseEntity, Column, PrimaryColumn, ManyToMany, JoinTable} from "typeorm"
import { kMaxLength } from 'buffer';

@Entity()
export class User extends BaseEntity implements UserInterface{
    constructor(email:string,firstName:string,lastName:string, phoneNum:string,password:string,roles:Role[]){
        super()
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNum = phoneNum;
        this.password = password
        this.roles = roles
        
    }

    @PrimaryColumn()
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string
    
    @Column()
    phoneNum: string

    @Column()
    password: string

    @ManyToMany(()=>Role)
    @JoinTable()
    roles: Role[]

}