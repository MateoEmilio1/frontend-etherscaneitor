import ButtonsNavigation from "./buttonsNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BuscoData from "./buscoData";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-900 to-purple-900 bg-[#111111]">
      <div className="bg-[#222222] rounded-lg shadow-lg p-8 mx-7 max-w-full">
        <h1 className="text-white text-5xl">Dashboard</h1>
        <h1 className="text-white text-5xl">
          Welcome back {session.user.name}
        </h1>
        <div>
          <BuscoData email={session.user.email} />
        </div>
        <ButtonsNavigation />
      </div>
    </section>
  );
}
