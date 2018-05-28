export interface User{
    Id?:string;
    IsUploaImg?:boolean;
    Name:string;
    Img:string;
    Email:string;
    PhoneNumber:string;
    UserName:string;
}

export interface Address {
    id?: number;
    province: string;
    city: string;
    district: string;
    street?: string;
  }