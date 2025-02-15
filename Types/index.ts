export type SNewUser = {
    Email : string;
    Password:string;
    Name:string;
    Phone:string, 
    Country:string,
    officialAddress:string,
    profession:string,
    membershipID:string
    membershipAffiliation:string;
    bankName?:string;
    accountName?:string;
    accountNumber?:string;
}
export type NewUser = {
    Email : string;
    Password:string;
    Name:string;

}
export type Update = {
    ID:string;
    secret:string;
    password1: string;
}
export type TLand = {
    id: string;
    location: string;
    ImageSrc: string[];
    Listing_Title: string;
    region: string;
    dimension: number;
    dimensionUnit: string;
    Description: string;
    Price: number;
    currency: string;
    Land_Area:number;
    Zoning_Regulations:string;

  };
  