

export interface OrderDetail{
    Id?:string;
    OrderId?:string;
    ProductId:string;
    CouponID?:string;
    IsDiscountForOld:boolean;
    CampusId:string;
    State:boolean;
    Debt:number;
    ActualPay:number;
    Discount:number;
    Count:number;
    //附加属性
    productName:string;
    price:number;
    isCanOld:boolean;
    couponName:string;
    discount:number;
    discountPrice:number;
    canOldValue:number;
    IsDebt:boolean;
    
}
export interface OrderFilterData{
    startDate:Date;
    endDate:Date;
    productIds:string[];
  }