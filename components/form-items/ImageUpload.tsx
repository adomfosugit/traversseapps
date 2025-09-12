'use client';

import { useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import { registerLand } from '@/lib/Appwrite/api';

interface IImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload = ({ value, onChange }: IImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (files: FileList | File[]) => {
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('landimage', file);

        // Call the server action to upload the file to Appwrite
        const response = await registerLand(formData);
        if (response?.url) {
          uploadedUrls.push(response.url);
        }
      }

      // Update the parent component with the new image URLs
      onChange([...value, ...uploadedUrls]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`relative cursor-pointer transition border-dashed border-2 p-20 flex flex-col justify-center items-center gap-4 
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 text-neutral-400 hover:opacity-70'}
      `}
      onClick={() => document.getElementById('file-input')?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <TbPhotoPlus size={50} />
      {value.length === 0 && (
        <div className="font-semibold text-lg">
          {isDragging ? 'Drop files here' : 'Click or drag files to upload'}
        </div>
      )}
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
      />
      <div className="absolute inset-0 w-full h-full grid grid-flow-col gap-2">
        {value.length > 0 &&
          value.map((image, index) => (
            <Image
              priority
              key={index}
              alt="Upload"
              height={300}
              width={300}
              style={{ objectFit: 'contain' }}
              src={`${image}/view?project=6771516200333a41d2ef&mode=admin`}
            />
          ))}
      </div>
      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
