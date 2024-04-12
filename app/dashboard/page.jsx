import ButtonsNavigation from "./buttonsNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/db";
import BuscoData from "./buscoData";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-900 to-purple-900 bg-[#111111]">
      <div className="bg-[#222222] rounded-lg shadow-lg p-8 mx-7 max-w-full">
        <h1 className="text-white text-5xl">Dashboard</h1>
        <h1 className="text-white text-5xl">
          Welcome back {session.user.name}
        </h1>
        <div>
          <BuscoData session={session} />
        </div>
        <ButtonsNavigation />
      </div>
    </section>
  );
}
