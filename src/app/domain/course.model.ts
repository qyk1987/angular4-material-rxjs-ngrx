export interface Course{
    CourseID?:string;
    CourseName:string;
    CourseState:boolean;
    OverDate:Date;
    CreateDate:Date;
    Price:number;
    ClassIds:string[];
}