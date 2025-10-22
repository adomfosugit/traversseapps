'use client';
import { ShieldCheckIcon, CreditCardIcon, VideoIcon, HardHatIcon } from 'lucide-react';
import Image from 'next/image';

const WayYouBuild = () => {
  const features = [
    {
      icon: <ShieldCheckIcon size={24} className='text-[#12b76a]' fill='#d1fadf' />,
      text: "Real Estate Lawyers on our portal ready to handle your due diligence & conveyancing."
    },
    {
      icon: <HardHatIcon size={24} className='text-[#12b76a]' fill='#d1fadf' />,
      text: "Certified Architects, Engineers & Building Constructors ready to take up your construction."
    },
    {
      icon: <CreditCardIcon size={24} className='text-[#12b76a]' fill='#d1fadf' />,
      text: "Make secured and seamless online payments against your project schedules."
    },
    {
      icon: <VideoIcon size={24} className='text-[#12b76a]' fill='#d1fadf' />,
      text: "Personalized user portal to receive regular comprehensive project updates; including building designs, invoices, pictures and drone video footage."
    }
  ];

  return (
    <div id='AboutUs' className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Revolutionizing the way you build
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience seamless property development from anywhere in the world
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
                  Remote Property Development
                </h3>
                <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                  The Traverse platform enables anyone around the world to acquire land and build remotely.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-5 mt-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300 opacity-50"></div>
              <div className="relative transform transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src="/assets/cuate.svg"
                  width={600}
                  height={600}
                  alt="Remote Property Development Illustration"
                  title="Construction"
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WayYouBuild;