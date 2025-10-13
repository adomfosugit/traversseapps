'use client';

import { useState } from 'react';
import { TbPhotoPlus, TbX, TbEye } from 'react-icons/tb';
import Image from 'next/image';
import { registerLand } from '@/lib/Appwrite/api';
import { toast } from '@/hooks/use-toast';
import { Loader2, Upload, ImageIcon, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
  maxFiles?: number;
  maxFileSize?: number; // in MB
}

const ImageUpload = ({ value, onChange, maxFiles = 10, maxFileSize = 5 }: IImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = [];
    
    for (const file of files) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive"
        });
        continue;
      }

      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxFileSize}MB limit`,
          variant: "destructive"
        });
        continue;
      }

      validFiles.push(file);
    }

    // Check total count
    if (value.length + validFiles.length > maxFiles) {
      const allowedCount = maxFiles - value.length;
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} images allowed. Only uploading first ${allowedCount} files.`,
        variant: "destructive"
      });
      return validFiles.slice(0, allowedCount);
    }

    return validFiles;
  };

  const handleUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = validateFiles(fileArray);
    
    if (validFiles.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of validFiles) {
        const fileId = `${file.name}-${Date.now()}`;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

        const formData = new FormData();
        formData.append('landimage', file);

        // Simulate progress (replace with actual progress if API supports it)
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: Math.min(prev[fileId] + Math.random() * 30, 90)
          }));
        }, 200);

        const response = await registerLand(formData);
        
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

        if (response?.url) {
          uploadedUrls.push(response.url);
        } else {
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive"
          });
        }

        // Clean up progress
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
          });
        }, 1000);
      }

      if (uploadedUrls.length > 0) {
        onChange([...value, ...uploadedUrls]);
        toast({
          title: "Upload successful",
          description: `${uploadedUrls.length} image(s) uploaded successfully`,
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading images",
        variant: "destructive"
      });
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

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
    toast({
      title: "Image removed",
      description: "Image has been removed from the upload list",
    });
  };

  const openImagePreview = (imageUrl: string) => {
    window.open(`${imageUrl}/view?project=6771516200333a41d2ef&mode=admin`, '_blank');
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      <div
        className={cn(
          "relative cursor-pointer transition-all duration-200 border-dashed border-2 rounded-lg",
          "flex flex-col justify-center items-center min-h-[200px] p-8",
          isDragging 
            ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
            : isUploading
            ? 'border-orange-400 bg-orange-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50',
          isUploading && 'pointer-events-none'
        )}
        onClick={() => !isUploading && document.getElementById('file-input')?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isUploading) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
            <div className="text-center">
              <p className="text-lg font-semibold text-orange-700">Uploading images...</p>
              <p className="text-sm text-orange-600">Please wait while we process your images</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={cn(
              "p-4 rounded-full transition-colors",
              isDragging ? "bg-blue-100" : "bg-gray-100"
            )}>
              <TbPhotoPlus size={32} className={isDragging ? "text-blue-600" : "text-gray-600"} />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragging ? 'Drop images here' : 'Upload Images'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Click to browse or drag and drop images
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Maximum {maxFiles} images, up to {maxFileSize}MB each
              </p>
            </div>
          </div>
        )}

        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          disabled={isUploading}
        />
      </div>

      {/* Progress Bars */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileId, progress]) => {
            const fileName = fileId.split('-')[0];
            return (
              <div key={fileId} className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 truncate">{fileName}</span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Uploaded Images ({value.length}/{maxFiles})
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <Image
                    priority
                    alt={`Upload ${index + 1}`}
                    height={200}
                    width={200}
                    style={{ objectFit: 'cover' }}
                    src={`${image}/view?project=6771516200333a41d2ef&mode=admin`}
                    className="w-full h-full transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openImagePreview(image);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Preview image"
                    >
                      <TbEye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;