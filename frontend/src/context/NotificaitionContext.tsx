"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react";

type NotificationVariant =
  | "success"
  | "error"
  | "warning";
// Notification Type
type NotificationType = {
  message: string;
  type: NotificationVariant};


type NotificationContextType = {
  notification: NotificationType | null;
  showNotification: (message: string, type?: NotificationVariant) => void;
  dismiss: () => void;
};


const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);


export const NotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [notification, setNotification] =
    useState<NotificationType | null>(null);


  const showNotification = useCallback(
    (message: string, type: NotificationVariant = "success") => {

      setNotification({ message, type });

      setTimeout(() => {
        setNotification(null);
      }, 4000);

    },
    []
  );


  const dismiss = useCallback(() => {
    setNotification(null);
  }, []);


  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        dismiss,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};


// Custom Hook
export function useNotification() {

  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return ctx;
}