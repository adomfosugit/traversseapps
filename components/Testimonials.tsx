'use client'
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from 'embla-carousel-react'
import React from 'react';
import TestimonialCard from './TestimonialCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { testimonials } from '@/constants';

type Props = {};

const Testimonials = (props: Props) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
  return (
    <div
      style={{
        backgroundImage: "url('/assets/Frame 59.svg')",
        backgroundSize: 'cover',
        marginTop: '2.5rem', // equivalent to mt-10
        padding: '3rem 0', // equivalent to py-12
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Center content horizontally
      }}
     className='bg-primary flex items-center justify-center'>
       

          <Carousel className='mx-auto max-w-[400px]'   plugins={[Autoplay({ delay: 5000,
        }),
      ]}>
          <CarouselContent>
           

          {testimonials.map((item,index) => (
            <CarouselItem key={index}>

              <TestimonialCard  comment= {item.comment} institution={item.institution} name={item.name} imgsrc={`${item.imgSrc}`}/>

            </CarouselItem>
             
        ))  }
            
          </CarouselContent>
          <CarouselPrevious className='hidden md:block' />
          <CarouselNext className='hidden md:block'/>
        </Carousel>
       
    
     
    </div>
  );
};

export default Testimonials;