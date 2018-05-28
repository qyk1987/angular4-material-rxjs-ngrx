import { Student,OrderDetail,Compensation, Payment } from "../domain";

export interface OrderVM {
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
    pay:number;
    IsDebt:boolean;
    Debt?:number;
    Remark?:string;
    IsOtherDiscount:boolean;
    OtherDiscountValue?:number;
    ProductIds:string[];
    Compensations:Compensation[];
    HasCompensation:boolean;
    price?:number;
    discountPrice:number;
    Student:Student;
    OrderDetails:OrderDetail[];
    ChannelIds:string[];
    Cashiers:Payment[];
    
  }

  export interface StatisticData{
    ProductName:string;
    Count:number;
    Pay:number;
    Debt:number;
    Discount:number;
  }

  export interface OrderResult{
    orders:OrderVM[];
    statistic:StatisticData[];
  }