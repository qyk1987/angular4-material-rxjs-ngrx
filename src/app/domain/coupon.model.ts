export interface Coupon{
    Id?:string;
    CouponName:string;
    Vlaue:number;
    Rule:string;
    StartDate:Date;
    OverDate:Date;
    State?:boolean;
    productIds?:string[];
    campusIds?:string[];
}