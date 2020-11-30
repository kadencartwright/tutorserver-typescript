import { CourseInterface } from './interfaces/courseInterface';
import { AvailabilityInterface } from './interfaces/availabilityInterface';
import { RoleInterface } from './interfaces/roleInterface';
import { SessionInterface } from './interfaces/sessionInterface';
import { UserInterface } from './interfaces/userInterface';
import faker from 'faker'

let rounds:number = 10;//number of fake entries in for each data type

let roles:RoleInterface[]= [
    {type:'student'},
    {type:'tutor'},
    {type:'admin'}
];
//courses
let courses:CourseInterface[] = [{name:'math1303'},{name:'math:1308'},{name:'math1401'},{name:'math1402'},{name:'math2301'},{name:'math3301'}]
//users
let users: userInit[] = []
for (let i = 0;i<rounds;i++){
    let roleTypes:RoleInterface[] = []

    //need some roles to be tutor/admins andsome to be just student or tutor or admin  

        if (faker.random.number(3)==1){
            roleTypes.push(roles[1],roles[2])
        }else{
            roleTypes.push(roles[faker.random.number({min:0,max:2})])
        }
    users.push({
        userData:
        {
            firstName:faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: 'testpassword',
            email: faker.internet.email()
        },
        roleTypes: roleTypes
    })

}
//availability
let availabilities: availabilityInit[] = [];
for (let i = 0;i<rounds;i++){
    availabilities.push({Availability:{startTime:12345},tutorEmail:''})
}

//sessions
let sessions:sessionInit[] = [];



export {users,sessions,roles,availabilities,courses}

interface userInit{
    userData:UserInterface,
    roleTypes:RoleInterface[]
}
interface availabilityInit{
    Availability:AvailabilityInterface,
    tutorEmail:string
}


interface sessionInit{
    session:SessionInterface,
    userEmail:string,
    tutorEmail:string
    courseName:string

}