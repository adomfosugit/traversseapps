'use client';

import { useState, useRef } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import { registerLand } from '@/lib/Appwrite/api';

interface IDocumentUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const DocumentUpload = ({ value, onChange }: IDocumentUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('landimage', file);

      const response = await registerLand(formData);
      if (response?.url) {
        onChange(response.url);
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
      onClick={() => fileInputRef.current?.click()}
    >
      {!value && (
        <div className="font-semibold text-lg flex flex-col items-center">
          <TbPhotoPlus size={40} />
          <span>Click to upload a document</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
      />

      {value && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          {value.endsWith('.pdf') ? (
            <iframe
              src={value}
              className="w-[20] h-[20] border-none"
              title="Uploaded Document"
            />
          ) : (
            <Image
              alt=""
              height={20}
              width={20}
              style={{ objectFit: 'contain' }}
              src={value}
            />
          )}
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
