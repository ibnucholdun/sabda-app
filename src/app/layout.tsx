import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Outfit } from "next/font/google";
import AppProvider from "~/components/AppProvider";

export const metadata: Metadata = {
  title: "SABDA",
  description:
    "Super App Ibadah: Quran, Tracker, Jadwal Sholat, dan Yasin Tahlil.",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "SABDA",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#007155",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="islamic-pattern bg-[#f1f5f9] pt-[env(safe-area-inset-top)] antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
