// src/components/landing/Footer.tsx
import Link from "next/link";
import { Radio, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Platform: [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#features", label: "Features" },
    { href: "/about", label: "About Us" },
    { href: "/advertiser/register", label: "Get Started" },
  ],
  "For Advertisers": [
    { href: "/advertiser/login", label: "Sign In" },
    { href: "/advertiser/register", label: "Register" },
    { href: "/advertiser/auctions", label: "Browse Auctions" },
    { href: "/#testimonials", label: "Success Stories" },
  ],
  "For Admins": [
    { href: "/admin/login", label: "Admin Login" },
    { href: "/about", label: "Our Mission" },
    { href: "/about#team", label: "Team" },
    { href: "/about", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <Radio className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AdSpace<span className="text-indigo-600">X</span>
              </span>
            </Link>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              Pakistan&apos;s first automated outdoor advertising auction platform. 
              Connecting advertisers with premium billboard spaces through transparent bidding.
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@adspacex.pk
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +92 300 1234567
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Karachi, Pakistan
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} AdSpaceX. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}