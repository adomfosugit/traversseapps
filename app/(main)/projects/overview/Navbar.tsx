import Logo from "@/components/Website/Logo";
import Navigator from "./Navigator";
import Auth from "./Auth";
import { get } from "http";
import { getLoggedInUser } from "@/lib/Appwrite/api";
import { NavigationMenu } from "@/components/NavigationMenu";

const Navbar = async () => {
    const user =await getLoggedInUser()
    return (
      <div className='border-b-2  px-8 py-2 flex justify-between items-center sticky top-0 z-10 bg-white '>
      
          <Logo />
          <div className="hidden lg:flex">
            <Navigator />
          </div>
          <div className="hidden lg:flex">

          <Auth name= {user.name} />
          </div>
          <div className="flex lg:hidden">

          <NavigationMenu />
          </div>
      </div>
    )
  }
  
  export default Navbar;
