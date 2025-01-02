export type SNewUser = {
    Email : string;
    Password:string;
    Name:string;
    Phone:string, 
    Country:string,
    officialAddress:string,
    profession:string,
    membershipID:string
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