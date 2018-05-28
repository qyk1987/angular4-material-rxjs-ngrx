export interface Receipt{
    Id?:string;
    PostUserId:string;
    CreateTime:Date;
    State:number;
    ConfirmTime?: Date;
    ConfirmerID?:string;
    Value?:number;
    PosterName?:string;
    CheckUserId?:string;
}