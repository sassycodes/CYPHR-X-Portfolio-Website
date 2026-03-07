import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ClientLayout from "@/components/client-layout";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarthak | CYPHR | Developer & Systems Builder",
  description:
    "Systems programming, AI pipelines, and cybersecurity. Currently at IIIT Pune.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sarthak Gaikwad",
              "alternateName": "CYPHR",
              "url": "https://cyphr7.vercel.app/",
              "affiliation": {
                "@type": "Organization",
                "name": "Indian Institute of Information Technology, Pune"
              },
              "knowsAbout": [
                "C",
                "Python",
                "Machine Learning",
                "C++",
                "Networking",
                "VPN Development",
                "Cybersecurity"
              ],
              "sameAs": [
                "https://www.linkedin.com/in/sarthak-gaikwad-dev",
                "https://github.com/sassycodes"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster theme="dark" position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
