import { Hero } from "@/components/landing/Hero";
import dynamic from 'next/dynamic';

const Benefits = dynamic(() => import('@/components/landing/Benefits').then(mod => mod.Benefits));
const Features = dynamic(() => import('@/components/landing/Features').then(mod => mod.Features));
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks').then(mod => mod.HowItWorks));
const Cta = dynamic(() => import('@/components/landing/Cta').then(mod => mod.Cta));
const Faq = dynamic(() => import('@/components/landing/Faq').then(mod => mod.Faq));


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Benefits />
      <Features />
      <HowItWorks />
      <Cta />
      <Faq />
    </main>
  );
}
