"use client";
import Image from "next/image";
import Hero from "@components/Hero";
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import FeaturedIn from "@components/FeaturedIn";
import ProblemsComponents from "@components/Problems";
import FeaturesListicle from "@components/FeaturesListicle";
import Pricing from "@components/Pricing";
import FAQ from "@components/FAQ";
import CTA from "@components/CTA";
import Testimonials11 from "@components/TestinomialGrid";
import HeroCenter from "@components/Hero/HeroCenter";
// import MarqueeFeaturedIn from "@components/featuredIn/marqeeLogos";
import ImageCardGrid from "@components/ImageCardsGrid";
import NumberCardGrid from "@components/NumberCardsGrid";
import IconCardGrid from "@components/IconCardsGrid";
import FeaturesCarousel from "@components/FeatureCarousel";
import ImageContainer from "@components/atoms/Cards/Image/ImageContainer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* <HeroCenter/> */}
      {/* <FeaturedIn /> */}

      {/* <MarqueeFeaturedIn speed={15}/> */}

      <ProblemsComponents />
      <FeaturesListicle />
      {/* <FeaturesCarousel/> */}
      {/* <About /> */} {/* Section About telah dihapus */}
      <Pricing />
      <Testimonials11 />
      <FAQ />
      <CTA />
    </main>
  );
}
