import { FileQuestion } from 'lucide-react';
import React from 'react';

type FAQProps = {
  question: string;
  answer: string;
};

const Faqcomp: React.FC<FAQProps> = ({ question, answer }) => {
  return (
    <div className=" border-gray-300 py-4">
        <span className='items-center flex'>

      <FileQuestion size={18} className='text-primary mr-2' />  
      <h3 className="font-semibold text-lg text-primary ">{question}</h3>
        </span>
      <p className="text-zinc-600 font-normal text-sm text-start">{answer}</p>
    </div>
  );
};

export default Faqcomp;