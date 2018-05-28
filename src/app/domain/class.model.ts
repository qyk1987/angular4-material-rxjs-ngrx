export interface Class{

    Id?:string;
    ClassName:string;
    ProductID:string;
    ChargerID:string;
    CampusId:string;
    OverDate:Date;
    Arrange:string;
    ClassState:number;
    StudentCount:number;
}


export interface MenuItem{

    id:string;
    name:string;
    count:number;
    isopen:boolean;
    selected:boolean;
}
export interface MenuVM{

    
    name:string;
    lists:MenuItem[];
}