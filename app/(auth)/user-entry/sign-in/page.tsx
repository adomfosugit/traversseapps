import UserSignIn from "@/components/UserSignIn";
import React from "react";
import Image from "next/image";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col pt-6 md:py-12 w-full max-sm:px-2">
      <div>
        <div className="flex items-center justify-between">
           <Image  src='/assets/logo.svg' alt="logo" width={120} height={50} className="flex-shrink-0 sm:hidden"/>
          <div className="text-sm  max-sm:text-white text-primary md:text-xl font-bold max-sm:font-medium max-sm:bg-primary py-1 rounded px-4 mr-2">Sign In</div>
        </div>
      </div>
      <div className="flex mt-10 md:mt-12 w-full mx-auto ">
        <UserSignIn />
      </div>
    </div>
  );
};

export default page;
