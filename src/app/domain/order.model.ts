import { OrderDetail } from "../domain";

export interface Order{
    Id?:string;
    OrderNO:string;
    StudentID:string;
    PostUserId:string;
    OrderDate:Date;
    ReceiptID?:string;
    ActualPay:number;
    State:number;
    PayDate?:Date;
    TradeNO:string;
    
    IsDebt:boolean;
    Debt?:number;
    Remark?:string;
    IsOtherDiscount:boolean;
    OtherDiscountValue?:number;
    ProductIds:string[];
    price?:number;
    discountPrice:number;
    OrderDetails:OrderDetail[];
    details?:{[id:string]:OrderDetail}
    ChannelIds:string[];
    Cashiers:Payment[];
    channels?:{[id:string]:Payment}
    pay:number;
}

export interface Payment{
    Channel:number;
    Value:number;
}