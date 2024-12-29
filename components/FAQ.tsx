import { faqs } from '@/constants'
import React from 'react'
import Faqcomp from './Faqcomp'


type Props = {}

const FAQ = (props: Props) => {
  return (
    <div className="text-center   bg-white flex flex-col p-5">
    <div className="font-semibold py-5 place-items-center">
      <p className=" lg:p-5 lg:text-3xl text-2xl ">
        Frequently Asked Questions
      </p>
      <div className='text-zinc-600 w-full font-normal text-center space-x-3 justify-evenly text-sm flex flex-row p'>
        <p>Questions About Traverse Services</p>
    
      </div>
        <div>
        {faqs.map((faq,index)=> (
            <div key={index} className='max-w-4xl text-start'>
                <Faqcomp question={faq.question} answer={faq.answer} />
            </div>
            
        ))}
        </div>
    </div>
     
  </div>
)
}
  


export default FAQ