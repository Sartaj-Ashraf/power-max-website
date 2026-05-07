import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PowerMax Solutions - Power Backup & Solar Solutions",
    template: "%s | PowerMax Solutions",
  },
  description: "Leading provider of power backup systems, solar panels, inverters, and batteries. 15+ years of experience serving homes and businesses across India.",
  keywords: ["power backup", "solar panels", "inverters", "batteries", "energy storage", "solar solutions", "UPS"],
  authors: [{ name: "PowerMax Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PowerMax Solutions",
    title: "PowerMax Solutions - Reliable Power Backup & Solar Solutions",
    description: "Premium inverters, batteries, and solar panel systems for uninterrupted power supply.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerMax Solutions",
    description: "Reliable Power Backup & Solar Solutions",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}
