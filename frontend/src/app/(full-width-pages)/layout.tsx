import NotificationBanner from "@/components/NotificationBanner/NotificationBanner";
import { NotificationProvider } from "@/context/NotificaitionContext";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return(
<NotificationProvider>
<NotificationBanner/>
    <div>{children}</div>;
</NotificationProvider>
  ) 
}
