export interface Campus{
    Id?:string;
    CampusName:string;
    CampusAddress:string;
    DistrictID:string;
    CreateDate:Date;
    CampusState?:boolean;
    couponIds?:string[];
}