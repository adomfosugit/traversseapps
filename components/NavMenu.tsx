import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DropdownMenuSubTrigger } from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
  
const NavMenu = () => {
    return (
        <DropdownMenu >
        <DropdownMenuTrigger className=" outline-none block lg:hidden"><MenuIcon size={25} /></DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={20} className=" rounded-none place-items-center w-[200px] lg:w-[300px]">
          <DropdownMenuLabel className="text-primary">Traverse</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary shadow-xl"/>
          <DropdownMenuItem >About Us</DropdownMenuItem>
          <DropdownMenuItem >Contact</DropdownMenuItem>
          <DropdownMenuItem>FAQs</DropdownMenuItem>
          <DropdownMenuItem >Careers</DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
export default NavMenu;