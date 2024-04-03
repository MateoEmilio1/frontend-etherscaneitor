"use client";
import CustomButton from "../components/customBotton";

export default function ButtonsNavigation() {
  return (
    <section className="pt-10 flex justify-center items-center bg-[#111111]">
      <div className="flex flex-wrap">
        <CustomButton href="/" buttonText="Home" />

        <CustomButton href="/" onClick={() => signOut()} buttonText="Logout" />
      </div>
    </section>
  );
}
