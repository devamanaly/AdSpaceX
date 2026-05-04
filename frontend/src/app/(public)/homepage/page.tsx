// src/app/(public)/page.tsx
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/stats";
import { HowItWorks } from "@/components/landing/HowItWork";
import { Features } from "@/components/landing/Feature";
import { Testimonials } from "../../../components/landing/Testmonials";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
}