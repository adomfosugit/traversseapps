import Image from "next/image";

const Logo = () => {
    return (
         <div className=" w-[100px] h-[50px]">

             <Image  src='/logo.svg' alt="logo" width={100} height={50} className="flex-shrink-0"/>
         </div>   
        
    )
}
export default Logo;