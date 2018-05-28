export interface Compensation{
    Id?:string;
    OrderID:string;
    ReceiptID?:string;
    Value:number;
    FeeType:number;
    State:boolean;
    Channel:number;
    CreateTime:Date;
}