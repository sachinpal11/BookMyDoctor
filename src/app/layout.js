import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { icons } from "lucide-react";
import { Analytics } from "@vercel/analytics/react"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Define CSS variable
});
const poppins = Poppins({
  subsets: ['latin'],
  variable: "--font-poppins",
  weight: ['400', '700'],
})

export const metadata = {
  title: "Book My Doctor",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistMono.variable} flex flex-col w-screen h-screen justify-center items-center antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
