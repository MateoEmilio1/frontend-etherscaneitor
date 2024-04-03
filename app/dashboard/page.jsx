import ButtonsNavigation from "./buttonsNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/db";

export default  async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return (
    <section className="min-h-screen flex justify-center items-center bg-[#111111]">
      <div>
        <h1 className="text-white text-5xl">Dashboard</h1>
        <h1 className="text-white text-5xl">Welcome back {session.user.name}</h1>
        <p className="text-white">
          User data:<br/>
          Email: {session.user.email} <br/>

        </p>


        <ButtonsNavigation />
        

       
      </div>
    </section>
  );
}
