'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutUser } from "@/lib/Appwrite/api"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export  function NavigationMenu() {
    const router = useRouter
    const logoutuser = async () => {
        const logout = await LogOutUser()
        // @ts-ignore
        if(logout) router.push('/')
        
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
            <MenuIcon size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
       
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <Link href={'/home'}>
            
          <DropdownMenuItem>
            Home 
          </DropdownMenuItem>
            
            </Link>
            <Link href={'/projects'}>
            
          <DropdownMenuItem>
            Projects        
          </DropdownMenuItem>
            
            </Link>
            <Link href={'/settings'}>
            
          <DropdownMenuItem>
            Settings       
          </DropdownMenuItem>
            
            </Link>

            <Link href={'/faq'}>
            
          <DropdownMenuItem>
            FAQ
          </DropdownMenuItem>
            </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutuser}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
