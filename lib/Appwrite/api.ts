'use server'

import { createSessionClient,createAdminClient } from "./Config";
import {ID, OAuthProvider, Query} from 'node-appwrite'
import {InputFile} from 'node-appwrite/file'
import { cookies, headers } from "next/headers";
import { parseStringify } from "@/lib/utils";
import { NewUser, SNewUser } from "@/Types";
import { redirect } from "next/navigation";
interface LandFormValues {
  location: { lat: number; lng: number } | null; 
  landArea: number; 
  landtype: string; 
  interestType: string; 
  imageSrc: string[]; 
  price: number; 
  title: string; 
  description: string;
  DeedCert: string; 
  Indenture: string; 
  searchresult: string; 
  transtype:string;
  landstatus:string;
  thirdpartyinterest: string
  thirdpartyifyes: string
  userEmail: string
  letigationencumberance:string
}
// Authentication 
const {NEXT_DATABASE_ID,  NEXT_SERVICEPROVIDER_COLLECTION_ID, NEXT_LAND_PROJECT,NEXT_USER_COLLECTION_ID,NEXT_LAND_COLLECTION_ID,NEXT_BIDDER_COLLECTION_ID,NEXT_BUCKET_ID,NEXT_BUCKET_ID_DOCS} = process.env
export async function createUserAccount(user:SNewUser){ 
  let promise;
  try {
    const {account,database} = await createAdminClient()
    promise = await account.create(ID.unique(), user.Email, user.Password,user.Name)
    if(!promise) throw new Error('Error Creating User')
   
    const service_provider = await database.createDocument(
      NEXT_DATABASE_ID!,
      NEXT_SERVICEPROVIDER_COLLECTION_ID!,
      ID.unique(),
      {
        Name_Entity:user.Name,
        Email:user.Email,
        Phone:user.Phone,
        Country:user.Country,
        officialAddress:user.officialAddress,
        profession:user.profession,
        membershipID:user.membershipID,
        VerifiedServiceProvider: false,
        Professional_Membership:user.membershipAffiliation,
        Bank_Name:user.bankName,
        Account_number:user.accountNumber,
        Account_name:user.accountName,

      }
    
  )
    if(!service_provider) throw new Error('Error Signing Up user')
    const session = await account.createEmailPasswordSession(user.Email,user.Password);
    const cookieStore = await cookies()
  
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(service_provider)
  
  } catch (error) {
    console.log(error)
  }   
}
export async function createSUserAccount(user:NewUser){ 

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

    //return parseStringify(promise)
    return { success: true, data: promise };
  } catch (error) {
    console.log(error)
    //@ts-ignore
    return { success: false, error: error?.message || "An unknown error occurred" }; 
  }   
}
// add succews and failure urls to this
export async function loginWithGoogle() {
    const { account } = await createAdminClient();
    const head = await headers()
    const origin = head.get("origin");
    const redirectUrl = await account.createOAuth2Token( OAuthProvider.Google, `${origin}/api/oauth`,`${origin}/user-entry/sign-up`);
    console.log(redirectUrl)
    return redirect (redirectUrl);
  

};

 

export async function signInAccount(Email: string, Password: string) {
  try {
    const { account } = await createAdminClient();
    const promise = await account.createEmailPasswordSession(Email, Password);

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", promise.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { success: true, data: promise };
  } catch (error) {
    //@ts-ignore
    console.log(error?.message);
    //@ts-ignore
    return { success: false, error: error?.message || "An unknown error occurred" };  // Explicitly return error
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
      [Query.equal("Email", `${email}`)])
    return userData.documents[0]
  } catch (error) {
    console.log(error)
  }
} 
export async function getBrokerLands(email:string){
  try {
    const { database } = await createAdminClient()
    const brokerlandData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_LAND_COLLECTION_ID!,
      [Query.equal("Email", `${email}`)])
    return brokerlandData.documents
  } catch (error) {
    console.log(error)
  }
} 
export async function getLands(){
  try {
    const { database } = await createAdminClient()
    const landData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_LAND_COLLECTION_ID!,)
      
    return landData.documents
  } catch (error) {
    console.log(error)
  }
} 
export async function getLandById(id:string){
  try {
    const { database } = await createAdminClient()
    const landData = await database.getDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_COLLECTION_ID!,
      id)
      
    return landData
  } catch (error) {
    console.log(error)
  }
} 
export async function createserviceProvider(Name:string, Email:string, Password:string, Phone:string, Country:string, officialAddress:string, profession:string, membershipID:string){
  try {
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

export async function uploadLand(data: LandFormValues) {
  const { location, landArea, landtype, interestType, imageSrc, price, title, description, DeedCert, thirdpartyinterest, thirdpartyifyes, Indenture, searchresult, transtype, landstatus, userEmail,letigationencumberance } = data;

  try {
    // Upload land
    const { database } = await createAdminClient();
    const landupload = await database.createDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_COLLECTION_ID!,
      ID.unique(),
      {
        Type_of_Interest: interestType,
        latitude: location?.lat,
        Longitude: location?.lng,
        Land_Area: landArea,
        Transaction_type: transtype,
        ImageSrc: imageSrc,
        Land_Document: DeedCert,
        Search_from_LC: searchresult,
        Listing_Title: title,
        Description: description,
        Zoning_Regulations: landtype,
        Price: price,
        Third_Party_Interest: thirdpartyinterest,
        Third_Party_Interest_if_yes: thirdpartyifyes,
        Letigation_Encumberance: letigationencumberance,
        Email: userEmail,
        Indenture: Indenture,
        Land_Registration_Status: landstatus
      }
    );

    // Return success and data
    return { success: true, data: parseStringify(landupload) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while uploading the land." };
  }
}

type BidType = {
  landOwnerId: string;
  landId: string;
  offer: number;
  originalPrice: number;
  BidderEmail: string;
  counterBid?:number
  owner_descision?: boolean;
  $id:string
};

export async function submitBid(data: BidType) {
  try {
    const { database } = await createAdminClient();

    // Generate a unique ID for the bid first
    

    // Step 1: Create the bid document in the bids collection
    const bidDocument = await database.createDocument(
      NEXT_DATABASE_ID!,
      NEXT_BIDDER_COLLECTION_ID!,
      ID.unique(), 
      {
        Land_owner_Id: data.landOwnerId,
        LandId: data.landId,
        Offer_Price: data.offer,
        BidderEmail: data.BidderEmail,
        Original_Price: data.originalPrice,
        Owner_Decision: null, 
      }
    );

    // Step 2: Get the current land document to access existing bids
    const currentLandDoc = await database.getDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_COLLECTION_ID!,
      data.landId
    );

    // Step 3: Update the land document with the new bid added to the bids array
    const landUpdate = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_COLLECTION_ID!,
      data.landId,
      {
        bid: [...(currentLandDoc.bid || []), bidDocument.$id]
      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ bidDocument, landUpdate }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function updateBidStatus(bidId: string, decision: boolean) {
  try {
    const { database } = await createAdminClient();
    
    const updatedBid = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_BIDDER_COLLECTION_ID!,
      bidId,
      {
        Owner_Decision: decision
      }
    );

    return { success: true, data: updatedBid };
  } catch (error) {
    console.error('Error updating bid status:', error);
    return { success: false, error };
  }
}
type BidType1 = {
  landOwnerId?: string;
  landId?: string;
  offer?: number;
  originalPrice?: number;
  BidderEmail?: string;
  counterBid?:number
  Owner_Decision?: boolean;
  $id:string
};

export async function updateBid(data: BidType1) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const bidupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_BIDDER_COLLECTION_ID!,
      data.$id,
      {
        Owner_Decision: data.Owner_Decision,
        CounterBid: data.counterBid
      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ bidupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function createLandProject(AcceptedBid: string, BidderEmail:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const bidupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_PROJECT!,
      ID.unique(),
      {
        Bid: AcceptedBid,
        BidderEmail: BidderEmail
      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ bidupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}

export async function getLandProject(Email:string){
  try {
    const { database } = await createAdminClient()
    const landData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_LAND_PROJECT!,
      [Query.equal("BidderEmail", Email)]  
    
    )
      
    return landData.documents
  } catch (error) {
    console.log(error)
  }
} 
// Database  land  upload documents
export async function registerLand(landimage: FormData) {
  try {
    const file = landimage.get('landimage') as File;

    // Convert the file to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const { Storage } = await createAdminClient();
    // Upload the file to Appwrite Storage
    const response = await Storage.createFile(
      NEXT_BUCKET_ID!, // Your Appwrite bucket ID
      ID.unique(), // Generate a unique file ID
      InputFile.fromBuffer(buffer, file.name) // Create InputFile from buffer
    );

    // Return the file URL
    return {
      url: `https://cloud.appwrite.io/v1/storage/buckets/${NEXT_BUCKET_ID}/files/${response.$id}/view?project=6771516200333a41d2ef&mode=admin`,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}
export async function filePreviewer(fileId:number){
  try {
    const { Storage } = await createAdminClient();
    // Upload the file to Appwrite Storage
    const response = await Storage.getFilePreview(
      NEXT_BUCKET_ID!, // Your Appwrite bucket ID
      ID.unique(), // Generate a unique file ID
      fileId
    );
      return response
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}
export async function registerLandDoc(landimage: FormData) {
  try {
    const file = landimage.get('landimage') as File;

    // Convert the file to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const { Storage } = await createAdminClient();
    // Upload the file to Appwrite Storage
    const response = await Storage.createFile(
      NEXT_BUCKET_ID_DOCS!, // Your Appwrite bucket ID
      ID.unique(), // Generate a unique file ID
      InputFile.fromBuffer(buffer, file.name) // Create InputFile from buffer
    );

    // Return the file URL
    return {
      url: `https://cloud.appwrite.io/v1/storage/buckets/${NEXT_BUCKET_ID}/files/${response.$id}/`,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}


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

