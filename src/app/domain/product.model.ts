export interface Product{
    Id?:string;
    SubjectId:string;
    CategoryId?:string;
    SubjectName?:string;
    ProductName:string;
    Desc:string;
    Price:number;
    CoverImg:string;
    State:boolean;
    SaleCount:number;
    OverDate:Date;
    CreateDate:Date;
    IsDiscountForOld:boolean;
    DiscountValue?:number;
    AccordIdList?:string;
    IsPackage:boolean;
    IsNeedCardNo:boolean;
    PackageIdList:string;
    accordIds?:string[];
    classIds?:string[];
    serviceIds?:string[];
    couponIds?:string[];
    products?:Product[];
    packageproducts:Product[];
    Coupons:any[];
    Services:any[];
}

export interface CategoryWithCount{
   Id:string;
   CategoryName:string;
   Count:number;
}
export interface SubjectWithCount{
    Id:string;
    SubjectName:string;
    Count:number;
 }
 export interface ProductWithCount{
    Id:string;
    ProductName:string;
    Count:number;
    selected:boolean;
 }
 