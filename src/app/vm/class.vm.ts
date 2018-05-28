export interface ClassVM{
    
        Id?:string;
        ClassName:string;
        ProductID:string;
        ChargerID:string;
        CampusId:string;
        OverDate:Date;
        Arrange:string;
        ClassState:number;

        canAddCount:number;
        StudentCount:number;
        chargerName:string;
        ProductName:string;
        Services?:ServicesPercent[];


        showMenu?:boolean;
        enableToggle:boolean;

    }
export interface ChargerVM{
    Id:string;
    Name:string;
}
export interface CanAddStudent{
    Id:string;
    OrdId:string;
    StudentName:string;
    SchoolName:string;
    OrderDate:Date;
}
export interface ServicesPercent{
    Id:string;
    CompleteCount:number;
    ServiceName:string;
}

