'use client';
import { ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';

const WayYouBuild2 = () => {
  return (
    <div id='AboutUs' className="text-center mt-16">
      <div className="mt-20 lg:mt-32 font-semibold">
        <p className="mb-10 lg:text-3xl text-2xl">
         Easing your burden
        </p>
        <div className="inline-grid grid-cols-1  w-5/6 lg:gap-y-20 lg:gap-x-8">
          <div className="my-auto text-left lg:row-start-1">
            <div
              id="remote"
              className="mt-10 font-inter font-normal text-gray-500 text-sm"
            >
              <p className="font-inter lg:text-left text-center text-xl text-black font-semibold lg:text-2xl">
                
                Leases & Land Title Applications
              </p>
              <p className="mt-4 text-gray-500 text-left lg:mr-20 lg:text-lg">
              We understand the complexities involved in getting your property registered at Lands Commission. Traverse provides the platform that enables you upload your lease document, get free consultation and quotation on the how to get your property registered. 
              </p>
              <div className="flex items-center mt-4">
                
                <p className="ml-2 lg:text-lg flex items-center">
                <ShieldCheckIcon size={30} className=' text-[#12b76a] ring-none' fill='#d1fadf' />
                Create an account on Traverse 
                </p>
              </div>
              <div className="flex items-center mt-4">
                
                <p className="ml-2 lg:text-lg flex items-center">
                <ShieldCheckIcon size={30} className=' text-[#12b76a] ring-none' fill='#d1fadf' />
                Upload all documents required for title application
                </p>
              </div>
              <div className="flex items-center mt-4">
                
                <p className="ml-2 lg:text-lg flex items-center">
                <ShieldCheckIcon size={30} className=' text-[#12b76a] ring-none' fill='#d1fadf' />
                Answer some few question to enable us understand your situation. 
                </p>
              </div>
              <div className="flex items-center mt-4">
                
                <p className="ml-2 lg:text-lg flex items-center">
                <ShieldCheckIcon size={30} className=' text-[#12b76a] ring-none' fill='#d1fadf' />
                A summary of information will be shared with you on the steps required to register your land at  Lands Commission
                </p>
              </div>
              <div className="flex items-center mt-4 ">
                
                <p className="ml-2 lg:text-lg flex items-center">
                <ShieldCheckIcon size={30} className=' text-[#12b76a] ring-none' fill='#d1fadf' />
                Personalized user portal to receive regular comprehensive update on registration process. 
                </p>
              </div>
            </div>
          </div>
          <div className="m-auto row-start-1 transition ease-in-out delay-150 hover:-translate-y-2 duration-300">
            <Image
              src="/assets/easet.svg"
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

export default WayYouBuild2;
