import { UserInterface } from './../interfaces/userInterface';
import { Role } from './Role';
import {Entity,BaseEntity, Column, PrimaryColumn, ManyToMany, JoinTable} from "typeorm"
import { kMaxLength } from 'buffer';

@Entity()
export class User extends BaseEntity implements UserInterface{

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

    init: (userData:UserInterface) =>void = function(userData:UserInterface){
        console.log('user.init Called')
        this.email = userData.email
        this.firstName = userData.firstName
        this.lastName = userData.lastName
        this.phoneNum = userData.phoneNum
        this.password = userData.password
        this.roles = userData.roles
    }

}