import React from 'react'
import {PricingTable} from '@clerk/clerk-react'
import { Sparkles, Check, Crown } from 'lucide-react'
import Navbar from '../components/Navbar'

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20'>
        {/* Header Section */}
        <div className='bg-white border-b border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <div className='text-center'>
              <div className='inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6'>
                <Crown className='w-4 h-4'/>
                <span className='text-sm font-medium'>Pricing Plans</span>
              </div>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                Choose Your{' '}
                <span className='relative'>
                  <span className='relative z-10'>Plan</span>
                  <div className='absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full'></div>
                </span>
              </h1>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <section className='py-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Pricing Table */}
            <div className='max-w-4xl mx-auto'>
              <div className='bg-white rounded-3xl shadow-large border border-gray-100 p-8 lg:p-12'>
                <PricingTable 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      pricingCard: "bg-transparent border-0 shadow-none p-0",
                      pricingCardHeader: "text-center mb-8",
                      pricingCardHeaderTitle: "text-2xl font-bold text-gray-900 mb-2",
                      pricingCardHeaderSubtitle: "text-gray-600",
                      pricingCardPricing: "text-center mb-8",
                      pricingCardPricingAmount: "text-4xl font-bold text-gray-900",
                      pricingCardPricingCurrency: "text-gray-600",
                      pricingCardPricingBilling: "text-gray-600",
                      pricingCardFeatures: "space-y-4",
                      pricingCardFeature: "flex items-center gap-3 text-gray-700",
                      pricingCardFeatureIcon: "w-5 h-5 text-primary",
                      pricingCardCta: "w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-glow hover:scale-105 active:scale-95",
                      pricingCardCtaSecondary: "w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-105 active:scale-95"
                    }
                  }}
                />
              </div>
            </div>

            {/* Bottom CTA */}
            <div className='text-center mt-12'>
              <div className='inline-flex items-center gap-2 text-gray-600'>
                <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
                  <Sparkles className='w-4 h-4 text-primary'/>
                </div>
                <span className='text-sm font-medium'>All plans include 24/7 support</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Pricing 