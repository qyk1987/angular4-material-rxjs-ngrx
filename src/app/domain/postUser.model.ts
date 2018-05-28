import { Post } from "./index";


export interface PostUser{
    Id?:string;
    PostId:string;
    UserId:string;
    PostDate?:Date;
    OffDate?:Date;
    PosterID?:string;
    OfferID?:string;
    Post:Post;
}