'use server'

import { createSessionClient,createAdminClient } from "./Config";
import {ID, OAuthProvider, Query} from 'node-appwrite'
import {InputFile} from 'node-appwrite/file'
import { cookies, headers } from "next/headers";
import { parseStringify } from "@/lib/utils";
import { NewUser, SNewUser } from "@/Types";
import { redirect } from "next/navigation";
import { availableMemory } from "process";
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
const {NEXT_DATABASE_ID,  NEXT_SERVICEPROVIDER_COLLECTION_ID, NEXT_LAND_PROJECT,NEXT_USER_COLLECTION_ID,NEXT_LAND_COLLECTION_ID,NEXT_BIDDER_COLLECTION_ID,NEXT_BUCKET_ID,NEXT_BUCKET_ID_DOCS, NEXT_PUBLIC_JOBLISTING} = process.env
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
    const bidupload = await database.createDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_PROJECT!,
      ID.unique(),
      {
        bid: AcceptedBid,
        BidderEmail: BidderEmail,
        Status:'Pre-Purchase',
        Land_selection:true,
        Pay_prepurchase:true,
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
export async function createJob(land: string, project:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.createDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      project,
      {
        Job_Executer : 'Surveyor',
        LandID : land,
        AvailableForSurveyor : true,
        jobAssigned : project

      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function AssignSurveyorJob(id: string, surveyorEmail:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id,
      {
        AvailableForSurveyor : false,
        SurveyorInCharge:surveyorEmail

      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function AssignLawyerJob(id: string, surveyorEmail:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id,
      {
        AvailableForLawyer : false,
        LawyerInCharge:surveyorEmail

      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function AssignPlannerJob(id: string, PlannerEmail:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id,
      {
        AvailableForPlanner : false,
        PlannerInCharge:PlannerEmail

      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function getJobListing(Profession:string){
  try {
    const { database } = await createAdminClient()
    const JobData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      [Query.equal(`AvailableFor${Profession}`, true)]  
    
    )
      
    return JobData.documents
  } catch (error) {
    console.log(error)
  }
} 
export async function getJobListing1(Profession: string) {
  try {
    const { database } = await createAdminClient();

    
    const availableField = `AvailableFor${Profession}`;

    const JobData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      [
        Query.equal(`AvailableFor${Profession}`, true),
      ]
    );

    return JobData.documents;
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return [];
  }
}
export async function getJobListingByUserProjectID(id:string){
  try {
    const { database } = await createAdminClient()
    const JobData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      [Query.equal("jobAssigned", id)]  
    
    )
      
    return JobData.documents
  } catch (error) {
    console.log(error)
  }
} 

export async function UpdateJobSiteVisitNote1(id: string, message:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id, 
      {
        SiteVisitNote :message
      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function UpdateJobSiteVisitReport(id: string, reporturl:string,siteplanurl:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id, 
      {
        SiteVisitReport: reporturl,
        SitePlan: siteplanurl,
        SiteVisitCompletionStatus:true,
        AvailableForPlanner:true,
        AvailableForLawyer:true,

      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function UpdateJobPlannerReport(id: string, reporturl:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id, 
      {
        PlannerReport: reporturl,
        ZoningReportComplete:true
     
      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function UpdateJobPlannerReport1(id: string, reporturl: string) {
  try {
    const { database } = await createAdminClient();

    // Run both updates in parallel
    const [jobupload, zoningUpdate] = await Promise.all([
      database.updateDocument(
        NEXT_DATABASE_ID!,
        NEXT_PUBLIC_JOBLISTING!,
        id, 
        {
          PlannerReport: reporturl,
          ZoningReportComplete: true
        }
      ),
      updateUserProjectStatusZoning(id)
    ]);

    if (!zoningUpdate.success) {
      throw new Error("Failed to update zoning status");
    }

    // Return success and both operation results
    return { 
      success: true, 
      data: {
        jobUpdate: parseStringify(jobupload),
        zoningUpdate: zoningUpdate.data
      } 
    };
  } catch (error) {
    console.log(error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred while updating documents." 
    };
  }
}
export async function UpdateJobLawyerReport(id: string, reporturl:string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid document in the bids collection
    const jobupload = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id, 
      {
        LawyerSearchReport: reporturl,
        LCSearchCompletionStatus:true
     
      }
    );

    // Return success and data
    return { success: true, data: parseStringify({ jobupload }) };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return { success: false, error: error?.message || "An error occurred while submitting the bid." };
  }
}
export async function UpdateJobLawyerReport1(id: string, reporturl: string) {
  try {
    const { database } = await createAdminClient();

    // Run both updates in parallel
    const [jobupload, lawyerStatusUpdate] = await Promise.all([
      database.updateDocument(
        NEXT_DATABASE_ID!,
        NEXT_PUBLIC_JOBLISTING!,
        id, 
        {
          LawyerSearchReport: reporturl,
          LCSearchCompletionStatus: true
        }
      ),
      updateUserProjectStatusLegal(id) // <-- new helper function
    ]);

    if (!lawyerStatusUpdate.success) {
      throw new Error("Failed to update legal search status");
    }

    return { 
      success: true, 
      data: {
        jobUpdate: parseStringify(jobupload),
        legalStatusUpdate: lawyerStatusUpdate.data
      } 
    };
  } catch (error) {
    console.log(error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred while updating lawyer report." 
    };
  }
}

export async function getJobListingForSurveyor(Email:string,   Profession:string){
  try {
    const { database } = await createAdminClient()
    const JobData = await database.listDocuments(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      [Query.contains(`${Profession}InCharge`, Email)]  
    
    )
      
    return JobData.documents
  } catch (error) {
    console.log(error)
  }
} 
export async function getJobListingbyID(id:string){
  try {
    const { database } = await createAdminClient()
    const JobData = await database.getDocument(
      NEXT_DATABASE_ID!,
      NEXT_PUBLIC_JOBLISTING!,
      id )
      
    return JobData
  } catch (error) {
    console.log(error)
  }
} 

export async function UpdateJobSiteVisitReport1(id: string, reporturl: string, siteplanurl: string) {
  try {
    const { database } = await createAdminClient();

    // Run both updates in parallel
    const [jobupload, zoningUpdate] = await Promise.all([
      database.updateDocument(
        NEXT_DATABASE_ID!,
        NEXT_PUBLIC_JOBLISTING!,
        id, 
        {
          SiteVisitReport: reporturl,
          SitePlan: siteplanurl,
          SiteVisitCompletionStatus: true,
          AvailableForPlanner: true,
          AvailableForLawyer: true,
        }
      ),
      updateUserProjectStatusZoning(id)
    ]);

    if (!zoningUpdate.success) {
      throw new Error("Failed to update zoning status");
    }

    return { 
      success: true, 
      data: {
        jobUpdate: parseStringify(jobupload),
        zoningUpdate: zoningUpdate.data
      } 
    };
  } catch (error) {
    console.log(error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred while updating documents." 
    };
  }
}
export async function updateLandProjectSiteVisit(landId: string, projectId: string) {
  try {
    const { database } = await createAdminClient()

    const landUpdate = await database.updateDocument(
      process.env.NEXT_DATABASE_ID!,
      process.env.NEXT_LAND_PROJECT!,
      projectId,
      { Site_visit: true }
    )

    const jobResult = await createJob(landId, projectId)
    if (!jobResult.success) {
      throw new Error(jobResult.error)
    }

    return {
      success: true,
      data: {
        landUpdate,
        jobUpload: jobResult.data,
      },
    }
  } catch (error) {
    console.error("Update Site Visit Error:", error)
    return {
      success: false,
      error:
        //@ts-ignore
        error?.message || 'An error occurred during site visit update.',
    }
  }
}
export async function updateBidStatus1(bidId: string, decision: boolean, BidderEmail: string) {
  try {
    const { database } = await createAdminClient();

    // Step 1: Update the bid's Owner_Decision
    const updatedBid = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_BIDDER_COLLECTION_ID!,
      bidId,
      {
        Owner_Decision: decision
      }
    );

    // Step 2: Create a land project (since decision is always true)
    const AcceptedBid = bidId;
    const landProjectResult = await createLandProject(AcceptedBid, BidderEmail);

    return { success: true, data: updatedBid, landProject: landProjectResult };
  } catch (error) {
    console.error('Error updating bid status:', error);
    return { success: false, error };
  }
}
export async function updateUserProjectStatusZoning(Id: string) {
  try {
    const { database } = await createAdminClient();
    const updatedBid = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_PROJECT!,
      Id,
      {
        planning_zoning: true,
      }
    );

    return { success: true, data: updatedBid, };
  } catch (error) {
    console.error('Error updating zoning status:', error);
    return { success: false, error };
  }
}
export async function updateUserProjectStatusLegal(Id: string) {
  try {
    const { database } = await createAdminClient();
    const updatedBid = await database.updateDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_PROJECT!,
      Id,
      {
        LC_search: true,
        legal_advice:true,
      }
    );

    return { success: true, data: updatedBid, };
  } catch (error) {
    console.error('Error updating zoning status:', error);
    return { success: false, error };
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
export async function getLandProjectByID(id:string){
  try {
    const { database } = await createAdminClient()
    const landData = await database.getDocument(
      NEXT_DATABASE_ID!,
      NEXT_LAND_PROJECT!,
      id
    )
      
    return landData
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
      NEXT_BUCKET_ID!, // Your Appwrite bucket ID
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


export async function uploadDoc(file: File) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

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
      url: `https://cloud.appwrite.io/v1/storage/buckets/${NEXT_BUCKET_ID_DOCS}/files/${response.$id}/`,
      fileId: response.$id
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Re-throw the error to handle it in the calling function
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

