interface TestimonialCardProps {
    name: string;
    institution: string;    
    imgsrc: string;
    comment: string;
}
const TestimonialCard : React.FC<TestimonialCardProps> = ({name,institution,imgsrc,comment}) => {
  return <div className="bg-primary/80 ring-1 ring-neutral-300 p-8 rounded-lg shadow-lg w-96  text-neutral-100">
    <div className="flex items-center">
      <img src={imgsrc} alt="profile" className="w-12 h-12 rounded-full" />
      <div className="ml-4 ">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-neutral-200 ">{institution}</p>
      </div>
    </div>
    <p className="text-sm text-neutral-200 mt-4">{comment}</p>
  </div>;
}
export default TestimonialCard;