// src/components/landing/Testimonials.tsx
"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Marketing Director, Nike Pakistan",
    content:
      "AdSpaceX transformed how we approach outdoor advertising. We won a prime Lahore billboard at 30% less than traditional rates. The auction process is transparent and fair.",
    rating: 5,
    initials: "AK",
  },
  {
    name: "Sarah Malik",
    role: "CEO, FoodPanda Lahore",
    content:
      "We needed quick ad deployment for a campaign. AdSpaceX got us from bidding to live display in 3 days. The real-time bidding is addictive!",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Bilal Hussain",
    role: "Brand Manager, Khaadi",
    content:
      "Finally, a platform that brings transparency to outdoor advertising. No more middlemen, no hidden costs. We can see exactly what we're paying for.",
    rating: 5,
    initials: "BH",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            What Our Advertisers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Join 1,200+ businesses that trust AdSpaceX
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}