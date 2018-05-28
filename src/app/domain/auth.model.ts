import { User,Err } from "./index";

export interface Auth{
    access_token?:string;
    expires_in?:number;
    token_type?:string;
    userName?:string;
    user?:User;
    userId?:string;
    text?:string;
    isLogin?:boolean;
    issend:boolean;
    error:boolean;
    currentDutyId?:string;
    dutys?:{[key: string]: Duty;};
}

export interface Duty{
    Id:string;
    PostId:string;
    RoleId:string;
    PostName:string;
    DistrictId?:string;
    CampusId?:string;
    SpotId?:string;
    RoleName?:string;
    RoleLabel?:string;
    DistrictName?:string;
    CampusName?:string;
    SpotName?:string;
    selected?:boolean;
    Ids:string[]
}


export interface RoleList{
    districts:dis[];
    campus:cam[];
    spots:spt[];
    posts:Duty[]
}
export interface dis{
    id:string;
    name:string;
    selected:boolean
}
export interface cam{
    id:string;
    disId:string;
    name:string;
    selected:boolean
}
export interface spt{
    id:string;
    camId:string;
    name:string;
    selected:boolean
}
export interface VerifyResult{
    number:string;
    token:string;
    type:string;
}

