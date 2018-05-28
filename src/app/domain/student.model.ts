import { PostUser } from "../domain";

export interface Student{
    Id?:string;
    Name:string;
    IdCardNO:string;
    Grade:string;
    Major:string;
    QQ:string;
    SchoolID:string;
    SignerId:string;
    MobilePhoneNO:string;
    Province:string;
    City:string;
    District:string;
    WorkPlace:string;
    IsUploaImg:boolean;
    CardPath:string;
    IsUploaCard:boolean;
    ClassName:string;
    Schedule:string;
    Nation:number;
    Education:string;
    Signer:PostUser;
    SignDate:Date;


    serviceIds?:string[];
}