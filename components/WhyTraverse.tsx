import Image from 'next/image';

const WhyTraverse = () => {
  return (
    
    <div className="text-center justify-center place-items-center bg-slate-100">
      <div className="font-semibold py-12">
        <p className="mb-10 lg:p-12 lg:text-3xl text-2xl">
          Why Traverse is meant for you
        </p>
        <div className="lg:pb-20 inline-grid grid-cols-1 grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 w-5/6 gap-y-6 gap-x-6">
          <div className="transition ease-in-out delay-150 hover:-translate-y-3  duration-300">
            <Image
              src="/assets/Convenience.svg"
              object-fit="contain"
              width="0"
              height="0"
              alt="Convenience"
              title="Convenience"
              className="mx-auto w-auto h-auto"
            />
            <div className="mt-5">
          
            </div>
          </div>
          <div className="transition ease-in-out delay-150 hover:-translate-y-3  duration-300">
            <Image
              src="/assets/personalized.svg"
              object-fit="contain"
              width="0"
              height="0"
              alt="Personalized Experience"
              title="Personalized Experience"
              className="mx-auto w-auto h-auto"
            />
            <div className="mt-5" />
    
           
            <span />
          </div>
          <div className="transition ease-in-out delay-150 hover:-translate-y-3 duration-300">
            <Image
              src="/assets/capital security.svg"
              object-fit="contain"
              width="0"
              height="0"
              alt="Capital Security"
              title="Capital Security"
              className="mx-auto w-auto h-auto"
            />
            <div className="mt-5 mx-auto" />
        
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyTraverse;
