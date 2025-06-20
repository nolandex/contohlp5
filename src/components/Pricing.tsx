"use client"
import React from 'react';
import siteConfig from '@config/siteConfig.json';
import { motion } from 'framer-motion';
import Label from '@atoms/Label';
import { Plan, PricingFeature } from '@customTypes/events';
import { Check } from 'phosphor-react';
import useStripeCheckout from '@hooks/useStripeCheckout';
import ButtonPrimary from '@atoms/Buttons/ButtonPrimary';
import PricingConfig from '@config/pricing/pricing.json';
import StripeConfig from '@config/paymentsConfig/stripe.json';

const Pricing: React.FC = () => {
  const { backgroundColor, header, plans } = PricingConfig;
  const { prices } = StripeConfig;

  const { text, highlighted_text } = header.offer;
  const normalText = text.replace(highlighted_text, '').trim();
  const handleCheckout = useStripeCheckout();

  return (
    <section className='bg-background-secondary' id="pricing">
      <div className='py-24 pb-0 px-8 max-w-5xl mx-auto'>
        <div className='flex flex-col text-center w-full mb-20'>
          <Label text="Pricing" />
          <h2 className="font-extrabold text-3xl lg:text-5xl tracking-tight mt-3 mb-8 max-w-2xl mx-auto">
            {header.heading}
          </h2>
          <p className='text-sm md:text-base flex justify-center items-center gap-2'>
            <span>
              <span className="text-lime-500">{highlighted_text}</span> {normalText}
            </span>
          </p>
        </div>

        <div className='relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8'>
          {plans.map((plan: Plan, index) => (
            <div
              key={index}
              className={`relative w-full rounded-xl border
                ${plan.popular ? 'border-2 border-primary-color bg-cards-bg/55' : 'border-elements-secondary bg-cards-bg/20'}
                ${plan.popular ? 'hover:shadow-lg hover:shadow-primary-color/20' : ''}`}
            >
              <div className='relative flex flex-col gap-5 lg:gap-8 z-10 p-8 rounded-lg'>
                <div className='flex flex-col items-center gap-4'>
                  <div>
                    <p className="text-lg lg:text-xl font-bold">{plan.name}</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <p className="text-5xl tracking-tight font-extrabold text-primary-color">
                    {plan.discountedPrice}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-xs opacity-60 uppercase font-semibold">Rp</p>
                  </div>
                </div>

                <ul className='space-y-2.5 leading-relaxed text-base flex-1'>
                  {Object.keys(plan.features).map((key, i) => {
                    const feature: PricingFeature = plan.features[key];
                    return (
                      <li
                        key={i}
                        className='flex items-center gap-4'
                        title={feature.hover_text}
                      >
                        <Check size={24} className='text-primary-color' />
                        <span className={`${feature.overall_highlighted ? 'font-bold text-primary-color' : ''}`}>
                          {feature.text.split(' ').map((word, index) => (
                            feature.highlighted_text.includes(word) ? (
                              <span key={index} className="font-bold text-primary-color">{word} </span>
                            ) : (
                              <span key={index}>{word} </span>
                            )
                          ))}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className='space-y-2'>
                  <ButtonPrimary
                    text={plan.buttonText}
                    toolTipText="Go build something"
                    onClick={() => {
                      if (plan.btnLink) {
                        window.open(plan.btnLink, '_blank', 'noopener noreferrer');
                      } else {
                        handleCheckout({ priceId: prices.premium });
                      }
                    }}
                  />
                  <p className="flex items-center justify-center gap-2 text-sm text-center text-base-content/80 font-medium relative">
                    {plan.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
