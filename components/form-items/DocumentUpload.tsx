'use client';

import { useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import { registerLand } from '@/lib/Appwrite/api';

interface IDocumentUploadProps {
  onChange: (value: string) => void; // Callback to return the uploaded document URL
  value: string; // The current document URL
}

const DocumentUpload = ({ value, onChange }: IDocumentUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('landimage', file);

      // Call the server action to upload the file to Appwrite
      const response = await registerLand(formData);
      if (response?.url) {
        onChange(response.url); // Update the parent component with the new document URL
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-2 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-400"
      onClick={() => document.getElementById('file-input')?.click()}
    >
   
      {!value && (
        <div className="font-semibold text-lg">Click to upload a document</div>
      )}
      <input
        id="file-input"
        type="file"
        accept="application/pdf,image/*" // Allow PDFs and images
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
      />
      {value && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <Image
            alt="Uploaded Document"
            height={300}
            width={300}
            style={{ objectFit: 'cover' }}
            src={value} // Display the uploaded document (image or PDF thumbnail)
          />
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;