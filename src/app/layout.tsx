import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resend Transactional Emails Starter",
  description: "Next.js 14 + Resend starter for contact forms and order confirmation emails.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white">{children}</body>
    </html>
  );
}
