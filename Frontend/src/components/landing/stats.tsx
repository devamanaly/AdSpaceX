// src/components/landing/Stats.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Building2, Users, Gavel, DollarSign } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Premium Ad Spaces",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    value: 1200,
    suffix: "+",
    label: "Registered Advertisers",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Gavel,
    value: 3500,
    suffix: "+",
    label: "Successful Auctions",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: DollarSign,
    value: 250,
    suffix: "M+",
    label: "Revenue Generated (PKR)",
    color: "from-purple-500 to-pink-500",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trusted by Advertisers Nationwide
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Join Pakistan&apos;s fastest-growing outdoor advertising platform
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}
              >
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}