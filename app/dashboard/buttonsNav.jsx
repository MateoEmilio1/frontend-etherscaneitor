"use client";
import CustomButton from "../components/customBotton";

export default function ButtonsNavigation() {
  return (
    <section className="pt-10 flex justify-center items-center bg-[#222222]">
      <div className="flex flex-wrap">
        <CustomButton href="/" buttonText="Home" />

        <CustomButton href="/api/auth/signout" onClick={() => signOut()} buttonText="Logout" />
      </div>
    </section>
  );
}
