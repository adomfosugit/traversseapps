'use client';

import { useState } from 'react';
import { UploadIcon } from 'lucide-react'; // use lucide upload icon
import Image from 'next/image';
import { registerLand } from '@/lib/Appwrite/api';

interface IImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const IDUpload = ({ value, onChange }: IImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = async (files: FileList | File[]) => {
    setIsUploading(true);

    try {
      const file = Array.from(files)[0]; // only first file
      if (!file) return;

      setFileName(file.name); // show filename

      const formData = new FormData();
      formData.append('landimage', file);

      const response = await registerLand(formData);
      if (response?.url) {
        onChange(response.url); // return single string
      }
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
      className={`relative flex flex-col items-start gap-2 rounded-lg border p-4 cursor-pointer transition
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-neutral-300 hover:bg-muted/40'}
      `}
      onClick={() => document.getElementById('file-input')?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Upload icon */}
      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <UploadIcon size={16} />
      </div>

      {/* File name or placeholder */}
      <p className="my-1 w-full truncate font-medium text-sm">
        {fileName
          ? fileName
          : value
          ? 'Uploaded file'
          : 'No file selected'}
      </p>

      {/* Instruction text */}
      <p className="w-full text-wrap text-muted-foreground text-xs">
        Drag and drop or click to {value ? 'replace' : 'upload'} .jpg, .png or .jpeg files
      </p>

      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
      />

      {/* Show preview if uploaded */}
      {value && (
        <div className="mt-2 w-full">
          <Image
            priority
            alt="Upload"
            height={200}
            width={200}
            className="rounded-md border object-contain"
            src={`${value}/view?project=6771516200333a41d2ef&mode=admin`}
          />
        </div>
      )}

      {/* Uploading overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <span className="text-white text-sm">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default IDUpload;
