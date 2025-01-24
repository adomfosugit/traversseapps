'use client';
import { ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';

const WayYouBuild = () => {
  return (
    <div id='AboutUs' className="text-center mt-16">
      <div className="mt-20 lg:mt-32 font-semibold">
        <p className="mb-10 lg:text-3xl text-2xl">
          Revolutionizing the way you build
        </p>
        <div className="inline-grid grid-cols-1  w-5/6 lg:gap-y-20 lg:gap-x-8">
          <div className="my-auto text-left lg:row-start-1">
            <div
              id="remote"
              className="mt-10 font-inter font-normal text-gray-500 text-sm"
            >
              <p className="font-inter lg:text-left text-center text-xl text-black font-semibold lg:text-2xl">
                Remote Property Development
              </p>
              <p className="mt-4 text-gray-500 text-left lg:mr-20 lg:text-lg flex items-center ">
               
              The Traverse platform enables anyone around the world to acquire land and build  remotely. 
              </p>
              <div className="mt-4 text-gray-500 text-left lg:mr-20 lg:text-lg flex items-center">
              <ShieldCheckIcon size={30} className=' text-[#12b76a]' fill='#d1fadf' />
                <p className="ml-2 lg:text-lg">
                  
                There are Real Estate Lawyers on our portal ready to handle your due diligence & conveyancing.
                </p>
              </div>
              <div className="mt-4 text-gray-500 text-left lg:mr-20 lg:text-lg flex items-center">
           
                <p className="ml-2 lg:text-lg">
                Certified Architects, Engineers & Building Constructors are ready to build take up your construction. 
                </p>
              </div>
              <div className="mt-4 text-gray-500 text-left lg:mr-20 lg:text-lg flex items-center">
              
                <p className="ml-2 lg:text-lg">
                Make secured and seamless online payments against your project schedules. 
                </p>
              </div>
              <div className="mt-4 text-gray-500 text-left lg:mr-20 lg:text-lg flex ">
          
                <p className="ml-2 lg:text-lg">
                Personalized user portal to receive regular comprehensive project updates; including buiding designs,  invoices,  pictures and drone video footage.  of your construction project in its entirety.
                </p>
              </div>
            </div>
          </div>
          <div className="m-auto row-start-1 transition ease-in-out delay-150 hover:-translate-y-2 duration-300">
            <Image
              src="/assets/cuate.svg"
              object-fit="contain"
              width="0"
              height="0"
              alt="Construction"
              title="Construction"
              className="mx-auto h-auto w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WayYouBuild;
