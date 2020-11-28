import { RoleInterface } from './../interfaces/roleInterface';
import { User } from './User';

import {Entity, PrimaryColumn, JoinTable, BaseEntity, ManyToMany} from "typeorm"

@Entity()
export class Role extends BaseEntity implements RoleInterface{
    @PrimaryColumn()
    type: string


}