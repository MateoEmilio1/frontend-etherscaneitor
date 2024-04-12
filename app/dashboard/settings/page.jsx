import ButtonsNavigation from "../buttonsNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/db";
import BuscoData from "../buscoData";
import Link from "next/link";
import SettingsData from "./settingsData";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);


  const handleCreateSuccess = () => {
    // Actualizar la lista de direcciones después de crear una nueva
    fetchData();
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-900 to-purple-900 bg-[#111111]">
      <div className="bg-[#222222] rounded-lg shadow-lg p-8 mx-7 max-w-full">
        
        <div className="flex items-center">
        <h1 className="text-white pb-7 text-5xl">Settings</h1>
            <Link className="text-white hover:text-blue-500 pl-3 mb-6" href="/dashboard">
              
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              
            </Link>
          </div>
       
        <div>
          <SettingsData session={session} />
        </div>
        
      </div>
    </section>
  );
}
