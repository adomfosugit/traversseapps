'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface IImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload = ({ value, onChange }: IImageUploadProps) => {
  const imageArray: string[] = useMemo(() => [], []);

  const handleUpload = useCallback(
    (result: any) => {
      imageArray.push(result.info.secure_url);
      onChange(imageArray);
    },
    [onChange, imageArray]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="traverse"
      options={{
        maxFiles: 10,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-400"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            {value?.length < 0 && (
              <div className="font-semibold text-lg">Click to upload</div>
            )}
            <div className="absolute inset-0 w-full h-full grid grid-flow-col gap-2">
              {value?.length > 0 &&
                value.map((image, index) => (
                  <Image
                    key={index}
                    alt="Upload"
                    height={300}
                    width={300}
                    style={{ objectFit: 'fill' }}
                    src={image}
                  />
                ))}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;