// src/components/landing/CTA.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import  Button  from "../ui/button/Button";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-12 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Dominate Outdoor Advertising?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            Join Pakistan&apos;s #1 outdoor advertising auction platform. 
            Browse billboards, bid in real-time, and get your brand seen by millions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/advertiser/register">
              <Button
                size="md"
                className="bg-white text-indigo-700 hover:bg-gray-100 text-lg px-8 py-6"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                size="md"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                Admin Login
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-indigo-200">
            No credit card required · Free registration · 24-hour verification
          </p>
        </motion.div>
      </div>
    </section>
  );
}