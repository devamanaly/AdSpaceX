// src/components/landing/HowItWorks.tsx
"use client";

import { UserPlus, Search, Gavel, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Register & Get Verified",
    description:
      "Create your advertiser account and register your company. Our admin team verifies your business within 24 hours.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    step: "02",
    title: "Browse Ad Spaces",
    description:
      "Explore hundreds of premium billboards, digital screens, and outdoor spaces across 12+ cities in Pakistan.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Gavel,
    step: "03",
    title: "Place Competitive Bids",
    description:
      "Join live auctions, place bids in real-time, and get notified instantly when you're outbid.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Deploy Your Ad",
    description:
      "Win the auction, upload your creative, get admin approval, and see your ad go live on schedule.",
    color: "from-purple-500 to-pink-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            How AdSpaceX Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            From registration to ad deployment in four simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-300 to-purple-300 lg:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                <div
                  className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <span className="mb-3 text-sm font-bold text-indigo-600">
                  {step.step}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}