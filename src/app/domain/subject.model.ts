export interface Subject{
    Id?:string;
    Name:string;
    CategoryId:string;
    State?:boolean;
    Sort:number;
    ProductIds:string[];
}