"use client"
import React from 'react';
import siteConfig from '@config/siteConfig.json';
import testinomialGridConfig from '@config/testinomialsGrid/testinomialGrid1.json';
import TestimonialCard from '@components/atoms/Cards/ContentCards/TestinomialCard';

const Testimonials11: React.FC = () => {
    const { heading, description, testimonials }  = testinomialGridConfig;

    return (
        <section className="bg-background-secondary" id='testinomials'>
            <div className="py-24 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <div className='mb-8'>
                        <h2 className="sm:text-5xl text-4xl font-extrabold">{heading}</h2>
                    </div>
                    <p className="lg:w-2/3 mx-auto leading-relaxed font-normal">{description}</p>
                </div>
                <ul className='max-w-7xl mx-auto md:columns-2 lg:columns-3 xl:columns-4 space-y-4 md:space-y-6 md:gap-6'>
                    {testimonials
                        .filter((t) => !t.tweetLink) // hanya tampilkan yang bukan tweet
                        .map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                tweetLink={undefined}
                                description={testimonial.description}
                                image={testimonial.image}
                                profileName={testimonial.profileName}
                                profileDesc={testimonial.profileDesc}
                                showStars={testimonial.showStars}
                                starCount={testimonial.starCount}
                            />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Testimonials11;
