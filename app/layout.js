import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Script from "next/script";

import Footer from "./components/footer";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/sessionComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Etherscaneitor",
  description: "Etherscanner hecho a mate y don satur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X8CPGZR5T7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X8CPGZR5T7');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
