import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FamilyDocs AI - Smart Family Document Management",
  description: "Organize, scan, and manage your family's important documents with AI-powered insights and proactive alerts.",
  keywords: "family documents, document management, AI scanner, family organization, document alerts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
