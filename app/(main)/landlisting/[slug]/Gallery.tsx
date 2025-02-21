import Image from 'next/image';
import { LandFormValues } from '../Detail';


interface IGalleryProps {
  land: LandFormValues;
}

const Gallery = ({ land }: IGalleryProps) => {
  // Check if land.imageSrc is defined and has at least one element
  if (!land.ImageSrc || land.ImageSrc.length === 0) {
    return null; // or return a placeholder image/component
  }

  return (
    <div className="flex flex-row overflow-x-auto mt-16 mb-5">
      {land.ImageSrc.length === 1 ? (
        // Render a single image if there's only one
        <Image
          src={`${land.ImageSrc[0]}/view?project=6771516200333a41d2ef&mode=admin`}
          width={201}
          height={201}
          alt="Image"
          className="rounded-lg"
        />
      ) : (
        // Render multiple images if there are more than one
        land.ImageSrc.map((image, index) => (
          <Image
            src={`${image}/view?project=6771516200333a41d2ef&mode=admin`}
            key={index}
            width={201}
            height={201}
            alt={`Image ${index}`}
            className="mr-4 rounded-lg"
          />
        ))
      )}
    </div>
  );
};

export default Gallery;