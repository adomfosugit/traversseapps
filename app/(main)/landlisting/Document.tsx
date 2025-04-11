import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import { AiOutlineFilePdf } from 'react-icons/ai';

interface IDocumentsProps {
  documents: string;
  title:string;
}

const Documents = ({ documents,title }: IDocumentsProps) => {
  if (!documents || documents?.length < 1) {
    return (
      <EmptyState
        title="No documents found"
        subtitle="Documents will show here once uploaded"
      />
    );
  }
  return (
    <div className="h-auto w-full m-8">
      
      <div >
     
            <Link href= {`${documents}/view?project=6771516200333a41d2ef&mode=admin`}>
            <AiOutlineFilePdf
              size={100}
              className="text-rose-500 hover:border hover:border-traverse-yellow"
            />
            <p className="text-light text-blue-800 text-sm text-nowrap text-center">
              {title}
            </p>
     



            </Link>
          
   
      </div>
    </div>
  );
};

export default Documents;