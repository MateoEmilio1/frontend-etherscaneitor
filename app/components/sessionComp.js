import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CustomButton from "./customBotton";
import Header from "./header";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-[#161616] text-white px-8 py-3 border-b border-gray-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto">

        <Header />


        <ul className="flex items-center gap-x-4">
          {!session?.user ? (
            <>
              <li>
                <CustomButton href="/" buttonText="Home" />
              </li>
              <li>
                <Link href="/auth/login">
                  <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-md rounded-full p-px text-xs font-semibold leading-6 text-white">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10">
                      <span>Login</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <CustomButton href="/dashboard" buttonText="Dashboard" />
              </li>
              <li>
                <CustomButton href="/api/auth/signout" buttonText="Logout" />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
