import{PostUser} from './index';
export interface Post{
    Id?:string;
    RoleId:string;
    PostName:string;
    UserId?:string;
    CreaterId?:string;
    SupperId?:string;
    State?:boolean;
    CreateTime:Date;
    DistrictId:string;
    CampusId?:string;
    SpotId?:string;
    PostUsers?:PostUser[];
 
}