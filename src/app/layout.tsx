import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { LayoutContent } from "@/components/LayoutContent";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buy Mate",
  description: "Browse and shop from our extensive collection of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                background: '#4f46e5',
                color: '#fff',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#fff',
                  secondary: '#4f46e5',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
