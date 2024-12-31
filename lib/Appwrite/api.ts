'use server'

import { createSessionClient,createAdminClient } from "./Config";
import {ID, OAuthProvider, Query} from 'node-appwrite'
import { cookies, headers } from "next/headers";
import { parseStringify } from "@/lib/utils";
import { NewUser } from "@/Types";
import { redirect } from "next/navigation";
// Authentication 
const {NEXT_DATABASE_ID,  NEXT_SERVICEPROVIDER_COLLECTION_ID, NEXT_USER_COLLECTION_ID} = process.env
export async function createUserAccount(user:NewUser){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.create( ID.unique(), user.Email, user.Password,user.Name)
    const session = await account.createEmailPasswordSession(user.Email,user.Password);
    const cookieStore = await cookies()
  
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(promise)
  
  } catch (error) {
    console.log(error)
  }   
}
// add succews and failure urls to this
export async function loginWithGoogle() {

  
    const { account } = await createAdminClient();
    const head = await headers()
    const origin = head.get("origin");
    const redirectUrl = await account.createOAuth2Token( OAuthProvider.Google, `${origin}/api/oauth`,
		`${origin}/user-entry/sign-up`);
    return redirect (redirectUrl);
  



};

export async function signInAccount(Email:string,Password:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.createEmailPasswordSession(Email,Password);
    const cookieStore = await cookies()
    cookieStore.set("appwrite-session", promise.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(promise)
  } catch (error) {
    console.log(error)
  }   
}
export async function createAccountRecovery(Email:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.createRecovery(Email , process.env.NEXT_PUBLIC_RECOVERY_URL!)
    return parseStringify(promise)
  } catch (error) {
    console.log(error)
  }   
}
export async function createAccountUpdate(ID:string, secret:string, password:string){ 
  try {
    const {account} = await createAdminClient()
    const promise = await account.updateRecovery(ID, secret, password)
    return parseStringify(promise)
  } catch (error) {
    console.log(error)
  }   
}
export async function getLoggedInUser(){ 
  try {
    const {account} = await createSessionClient()
    const user =  await account.get()
    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }   
}
export async function LogOutUser(){ 
  try {
    const {account} = await createSessionClient()
    const cookieStore = await cookies()
    cookieStore.delete('appwrite-session')
    await account.deleteSession(parseStringify('current'))
    
  } catch (error) {
    console.log(error)
  }   
}
// Database
export async function getserviceProviderData(email:string){
  try {
    const { database } = await createAdminClient()
    const userData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_SERVICEPROVIDER_COLLECTION_ID!,
      [Query.equal("Email", [email])])
    return userData
  } catch (error) {
    console.log(error)
  }
} 
export async function createserviceProvider(Name:string, Email:string, Password:string, Phone:string, Country:string, officialAddress:string, profession:string, membershipID:string){
  try {
    const checkstatus = await getserviceProviderData(Email)
    if(!checkstatus){
     return {error:"User Already Exists"}
    }
    const { database } = await createAdminClient()
    const serviceprovider = await database.createDocument(
        NEXT_DATABASE_ID!,
        NEXT_SERVICEPROVIDER_COLLECTION_ID!,
        ID.unique(),
        {
          Name:Name,
          Email:Email,
          Password:Password,
          Phone:Phone,
          Country:Country,
          officialAddress:officialAddress,
          profession:profession,
          membershipID:membershipID,
          VerifiedServiceProvider: false
        }
      
    )
 
    return parseStringify(serviceprovider);
  } catch (error) {
    console.log(error)
  }
}
async function createServiceProvider(Name, Email, Password, Phone, Country, officialAddress, profession, membershipID) {
  try {
    // Check if the service provider already exists
    const checkstatus = await getserviceProviderData(Email);
    
    // If checkstatus is true, it means the user already exists
    if (checkstatus) {
      return { error: "User  Already Exists" };
    }

    // If the user does not exist, proceed to create a new service provider
    const { database } = await createAdminClient();
    const serviceprovider = await database.createDocument(
      NEXT_DATABASE_ID!,
      NEXT_SERVICEPROVIDER_COLLECTION_ID!,
      ID.unique(),
      {
        Name: Name,
        Email: Email,
        Password: Password, // Consider hashing the password before storing it
        Phone: Phone,
        Country: Country,
        officialAddress: officialAddress,
        profession: profession,
        membershipID: membershipID,
        VerifiedServiceProvider: false
      }
    );

    return parseStringify(serviceprovider);
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while creating the service provider." };
  }
}
// Database 


// Messaging Email
export async function sendTermsConditions( content:string , userId:string ){
  try {
    const { messages } = await createAdminClient()
    const termsMessage = await messages.createEmail(
      ID.unique(),
      'Investment Plan ',
      content,
      [],[userId],[],[],[],[], false,true
      
    )
    return termsMessage
  } catch (error) {
    
  }
}