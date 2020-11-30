import { RoleInterface } from './../interfaces/roleInterface';
import {Entity, PrimaryColumn,BaseEntity} from "typeorm"

@Entity()
export class Role extends BaseEntity implements RoleInterface{
    @PrimaryColumn()
    type: string

    init: (roleData:RoleInterface) =>void = function(roleData:RoleInterface){
        roleData.type = this.type
    }


}