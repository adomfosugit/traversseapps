'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from '../ui/badge'
import { ArrowRight } from 'lucide-react'
import TextType from '../TextType'

type Props = {}

const Landingpage = (props: Props) => {
  const router = useRouter()
  
  const navigateUserEntry = () => {
    router.push('/user-entry/sign-in')
  } 
  
  const navigateServiceProvider = () => {
    router.push('/service-provider/sign-in')
  } 
  
  return (
    <section className="relative overflow-hidden py-32 min-h-screen bg-[url('/assets/landing.svg')] bg-cover flex items-center">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Banner content */}
          <div className="space-y-8">
            <Badge
              variant="outline"
              className="bg-primary/40 border-sky-700 px-4 py-2 rounded-full text-white text-sm font-medium"
            >
             Building Africa's Future
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Build Remotely, <br />
              <span className="text-primary">Build in Africa</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl max-w-2xl">
            <TextType 
                text={[
                  "100% Fully remote, collaborative property solutions.",
                  "Seamless end-to-end property acquisition & development.",
                  "Transform land into profitable assets, remotely.",
                  "Your gateway to African real estate opportunities.",
                  "Build wealth through smart property investments.",
                  "Innovation meets opportunity in African real estate."
                ]} 
                typingSpeed={75} 
                pauseDuration={1500} 
                showCursor={true} 
                cursorCharacter="|"
              />
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className='py-5'>
                  <DialogHeader>
                    <DialogTitle className='text-primary mb-5'>Traverse</DialogTitle>
                    <Button 
                      variant={'outline'} 
                      className='py-5 border-zinc-300 hover:bg-primary hover:text-white hover:border-neutral-50' 
                      onClick={navigateUserEntry}
                    >
                      Client Sign In
                    </Button>
                    <Button 
                      variant={'outline'} 
                      className='py-5 border-zinc-300 hover:bg-primary hover:text-white hover:border-neutral-50' 
                      onClick={navigateServiceProvider}
                    >
                      Service Provider Sign In
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white/30 border border-white/40 hover:bg-white/60"
              >
           
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landingpage