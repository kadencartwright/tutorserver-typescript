import { User } from '../models/User';
import {Service} from  'typedi'
@Service()
export default class UserService{

    constructor(){}
    getUser: (email:string)=>Promise<User> = async function(email:string){
        let result:User = await User.findOne(email)
        return result
    }
    

}