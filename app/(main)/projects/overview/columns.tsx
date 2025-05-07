"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProjectData = {
  Status:string
  BidderEmail:string
  $id: string
  $createdAt:Date
  bid:{
    Land_owner_Id: string,
      LandId: string,
      Offer_Price: number,
      Original_Price: number,
      BidderEmail: string,
      Owner_Decision: true,
  }

}

export const columns: ColumnDef<ProjectData>[] = [
    { 
    
        accessorKey: ("$createdAt") ,
         header: ({ column }) => {
          return (
          <p>Date Started</p>
         
          )
        },
        cell: ({ row }) => {
          const date = new Date(row.original.$createdAt);
          return (
            <div className="">
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </div>
          )
        }
      },
  {
    accessorKey: '$id',
    header: "PROJECT ID",
  },
  {
    accessorKey: "Status",
    header: "CURRENT STAGE",
  },
  { 
    
    accessorKey: ('$id') ,
     header: ({ column }) => {
      return (
      <p>STATUS</p>
     
      )
    },
    cell: ({ row }) => {
      return (
        <Link href={`/projects/${row.original.$id}`} className="text-sm text-blue-500 hover:underline">
           View Project
        </Link>
      )
    }
  },
]
