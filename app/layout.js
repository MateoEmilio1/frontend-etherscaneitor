import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "./components/sessionComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Etherscaneitor",
  description: "Etherscanner hecho a mate y don satur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header /> */} {children}
      </body>
    </html>
  );
}
