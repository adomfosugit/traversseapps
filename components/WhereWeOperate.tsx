import Image from 'next/image'
import React from 'react'

type Props = {}

const WhereWeOperate = (props: Props) => {
  return (
    <div className="text-center   bg-white flex flex-col place-items-center">
        <div className="font-semibold py-5 place-items-center">
          <p className=" lg:p-5 lg:text-3xl text-2xl ">
            Where Traverse Operates
          </p>
          <div className='text-zinc-600 w-full font-normal text-center space-x-3 justify-evenly text-sm flex flex-row place-items-center'>
            <p>Ghana</p>
            <p>Rwanda</p>
            <p>Kenya</p>
            <p>Nigeria</p>
          </div>
       
        </div>
          <div
          className=" bg-[url('/assets/map.png')]  bg-contain bg-no-repeat flex items-center w-full h-[500px] justify-center bg-center ">

          </div>
      </div>
  )
}

export default WhereWeOperate