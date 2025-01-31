import { Inter } from "next/font/google";
import "@/styles/globals.css";

import Footer from "./components/footer";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "./components/sessionComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Etherscaneitor",
  description: "Etherscanner hecho a mate y don satur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {children} <Footer /><Toaster />
      </body>
    </html>
  );
}
