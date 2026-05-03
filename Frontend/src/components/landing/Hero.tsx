// src/components/landing/Hero.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Play, Building2, MapPin } from "lucide-react";
import  Button  from "../../components/ui/button/Button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 pt-32 pb-20 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              Revolutionizing Outdoor Advertising
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 lg:text-6xl dark:text-white">
              Bid. Win.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Display Your Brand
              </span>
            </h1>

            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Pakistan&apos;s first automated outdoor advertising auction platform. 
              Browse premium billboards, place bids in real-time, and deploy your 
              ads within hours — all from one dashboard.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/advertiser/register">
                <Button size="md" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6">
                  Start Bidding Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button size="md" variant="outline" className="text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                500+ Ad Spaces
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                12 Cities
              </div>
            </div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
              <div className="rounded-xl bg-white p-6 dark:bg-gray-900">
                {/* Mock Billboard Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="mx-auto h-16 w-16 text-indigo-400" />
                      <p className="mt-2 text-sm font-medium text-gray-500">Premium Billboard</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Mall Road Billboard</h3>
                        <p className="text-sm text-gray-500">Lahore · 20ft × 10ft</p>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Current Bid</p>
                        <p className="text-xl font-bold text-indigo-600">PKR 85,000</p>
                      </div>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        Bid Now
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">⏱ Auction ends in 4h 32m</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}