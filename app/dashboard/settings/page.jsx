import ButtonsNavigation from "../buttonsNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/db";
import BuscoData from "../buscoData";
import Link from "next/link";
import SettingsData from "./settingsData";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return (
    <section className="min-h-screen flex justify-center items-center bg-[#111111]">
      <div className="bg-[#222222] rounded-lg shadow-lg p-8 mx-7 max-w-full">
        <h1 className="text-white pb-7 text-5xl">Settings</h1>
       
        <div>
          <SettingsData email={session.user.email} />
        </div>
        
      </div>
    </section>
  );
}
