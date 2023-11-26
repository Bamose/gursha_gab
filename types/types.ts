import { Float } from "react-native/Libraries/Types/CodegenTypes";

export type user = {
    id:string;
    image?:any;
  
  }
  export type gabtypes={
    id:string;
    content: string;
    user:user;
    createdAt:string;
    image?:any;
    latitude:Float;
    longitude:Float;
    comment:number;
    impression:number;
    numberofShares:number;
    location:string;
  } 

  export type locationtypes = {
    latitude: Float
    longitude: Float
  }
  export type commenttypes ={
    content: string
    createdAt:string
  }