import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './provider.js'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zetachi",
  description: "Making Knowledgebases Inteliigent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <CSPostHogProvider>
      <body className={inter.className}>{children}</body>
      </CSPostHogProvider>

    </html>
  );
}
