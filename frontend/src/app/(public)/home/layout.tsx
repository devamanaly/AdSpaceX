// src/app/(public)/layout.tsx
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NotificationProvider } from "@/context/NotificaitionContext";
import NotificationBanner from "@/components/NotificationBanner/NotificationBanner";

export default function PublicLayout({
  // const {}
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NotificationProvider>
      <Navbar />
      <NotificationBanner/>
      <main>{children}</main>
      <Footer />
      </NotificationProvider>
    </div>
  );
}