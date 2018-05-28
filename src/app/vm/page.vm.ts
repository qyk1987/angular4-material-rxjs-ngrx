export interface PageVM {
    pageSize:number;
    currentPage:number;
    count:number;
    isAsc:boolean;
    order:string;
    totalPage:number;
    pages:number[]
  }
export interface PageResult{
  Data:any[];
  Count:number;
  CurrentPage:number;
  IsAsc:boolean;
  Order:string;
}
