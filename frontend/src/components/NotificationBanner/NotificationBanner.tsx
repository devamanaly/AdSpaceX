// components/NotificationBanner.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../../context/NotificaitionContext";

export default function NotificationBanner() {
  const { notification, dismiss } = useNotification();

  const styles = {
    success: { bg: "bg-green-500", icon: "✓" },
    error:   { bg: "bg-red-500",   icon: "✕" },
    warning: { bg: "bg-yellow-500",icon: "⚠" },
  };

  const { bg, icon } = styles[notification?.type as keyof typeof styles] || styles.success;

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key="notification-banner"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${bg}`}
        >
          <span className="font-bold text-lg">{icon}</span>
          <p className="text-sm font-medium">{notification.message}</p>
          <button
            onClick={dismiss}
            className="ml-2 text-white/80 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}