import Logo from "@/components/Website/Logo";
import Navigator from "./Navigator";
import Auth from "./Auth";

const Navbar = () => {
    return (
      <div className='border-b-2  px-8 py-2 flex justify-between items-center sticky top-0 z-10 bg-white '>
      
          <Logo />
          <Navigator />
      
          <Auth name='kwadwo' />
      </div>
    )
  }
  
  export default Navbar;
