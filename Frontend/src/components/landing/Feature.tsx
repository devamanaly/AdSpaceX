// src/components/landing/Features.tsx
"use client";

import {
  Shield,
  Zap,
  BarChart3,
  Bell,
  CreditCard,
  Globe,
  Clock,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Verified Advertisers",
    description: "Every company is vetted by our admin team before bidding access.",
  },
  {
    icon: Zap,
    title: "Real-Time Bidding",
    description: "Watch bid updates live and react instantly to outbid competitors.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your bids, wins, spend, and ad performance in one place.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get alerts via email and in-app when you're outbid or win auctions.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay via Stripe with credit cards, bank transfers, or mobile wallets.",
  },
  {
    icon: Globe,
    title: "12+ Cities Covered",
    description: "Ad spaces available in Karachi, Lahore, Islamabad, and more.",
  },
  {
    icon: Clock,
    title: "Automated Scheduling",
    description: "Your ad goes live automatically at the scheduled time. No manual work.",
  },
  {
    icon: FileCheck,
    title: "Admin Moderation",
    description: "All ad creatives reviewed for quality before going public.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Why Choose AdSpaceX?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Everything you need to dominate outdoor advertising in Pakistan
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-gray-200 p-6 transition-all hover:border-indigo-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-indigo-700"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950 dark:text-indigo-400">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}