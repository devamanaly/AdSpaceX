// src/app/(public)/about/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Users,
  Shield,
  // Award,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import  Button  from "../../../components/ui/button/Button";

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description:
      "Every bid is public. Every transaction is recorded. No hidden fees, no middlemen, no favoritism.",
  },
  {
    icon: Target,
    title: "Innovation",
    description:
      "We're bringing Silicon Valley-grade auction technology to Pakistan's outdoor advertising industry.",
  },
  {
    icon: Heart,
    title: "Fairness",
    description:
      "Equal opportunity for all advertisers — from startups to multinationals. The highest bid wins, always.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a network of verified advertisers, space owners, and brands that trust each other.",
  },
];

const team = [
  {
    name: "Your Name",
    role: "Founder & Lead Developer",
    initials: "YN",
    description:
      "Full-stack developer passionate about solving real-world problems with technology.",
  },
  {
    name: "Ahmed Raza",
    role: "Operations Manager",
    initials: "AR",
    description:
      "10+ years in outdoor advertising. Ensuring every billboard meets quality standards.",
  },
  {
    name: "Fatima Hassan",
    role: "Customer Success",
    initials: "FH",
    description:
      "Making sure every advertiser has a smooth experience from bid to display.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              About AdSpaceX
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
              We&apos;re on a mission to transform Pakistan&apos;s outdoor advertising 
              industry by bringing transparency, automation, and fair market dynamics 
              to billboard auctions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950">
                <Target className="h-7 w-7 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                To democratize outdoor advertising in Pakistan by creating a 
                transparent, competitive marketplace where any verified business 
                can bid for premium billboard spaces at fair market prices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950">
                <Eye className="h-7 w-7 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                To become the default platform for outdoor advertising in South Asia, 
                where every billboard is auctioned transparently, every campaign is 
                tracked digitally, and every advertiser gets fair value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 p-6 text-center dark:border-gray-700"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950">
                  <value.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Meet the Team
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-12"
          >
            <h2 className="text-3xl font-bold text-white">
              Want to Partner With Us?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
              Whether you own billboards or want to advertise, we&apos;d love to hear from you.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="mailto:support@adspacex.pk">
                <Button className="bg-white text-indigo-700 hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}