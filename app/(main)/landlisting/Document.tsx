import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import { FileText, Download, ExternalLink, Eye } from 'lucide-react';

interface IDocumentsProps {
  documents: string;
  title: string;
}

const Documents = ({ documents, title }: IDocumentsProps) => {
  if (!documents || documents?.length < 1) {
    return (
      <EmptyState
        title="No documents found"
        subtitle="Documents will show here once uploaded"
      />
    );
  }

  return (
    <div className="group">
      <Link 
        href={`${documents}/view?project=6771516200333a41d2ef&mode=admin`}
        className="block"
      >
        <div className="relative bg-white border-2 border-gray-100 hover:border-blue-300 rounded-xl p-2 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
        
          {/* Document Title */}
          <h4 className="text-sm font-semibold text-gray-900 text-center mb-2 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h4>
          
          {/* Action Indicators */}
          <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="w-3 h-3 mr-1" />
              View
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center text-xs text-gray-500">
              <ExternalLink className="w-3 h-3 mr-1" />
              Open
            </div>
          </div>
          
          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
    </div>
  );
};

export default Documents;