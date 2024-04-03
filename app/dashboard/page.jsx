
import { signOut } from "next-auth/react";
import Link from "next/link";
import CustomButton from "../components/customBotton";
import ButtonsNavigation from "./buttonsNav";

export default function DashboardPage() {
  return (
    <section className="min-h-screen flex justify-center items-center bg-[#111111]">
      <div>
        <h1 className="text-white text-5xl">Dashboard</h1>

        
        <ButtonsNavigation />

       
      </div>
    </section>
  );
}
