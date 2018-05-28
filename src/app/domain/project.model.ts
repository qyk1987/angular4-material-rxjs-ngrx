export interface Project{
    id?:string;
    name:string;
    desc?:string;
    coverImg:string;
    enabled?: boolean;
    taskLists?:string[];//存储列表id
    members?:string[];//存储成员id
}