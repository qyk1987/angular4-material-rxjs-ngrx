export interface Category{
    Id?:string;
    CategoryName:string;
    State?:boolean;
    Sort:number;
    SubjectIds:string[];
}