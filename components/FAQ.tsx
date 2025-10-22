import { faqs } from '@/constants'
import React from 'react'
import Faqcomp from './Faqcomp'
import { MessageCircleQuestion } from 'lucide-react'

type Props = {}

const FAQ = (props: Props) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <MessageCircleQuestion className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
            Everything you need to know about Traverse services and how we can help you build remotely
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <Faqcomp question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default FAQ