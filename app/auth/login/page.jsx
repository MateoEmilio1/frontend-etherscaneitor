"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div className="pt-12 min-h-screen flex  justify-center items-center bg-[#111111]">
      <form
        onSubmit={onSubmit}
        className="w-1/4 rounded-lg border border-white p-14"
      >
        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
            {error}
          </p>
        )}
        <div className="flex">
          <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
          {/* Botón de retorno */}
          <div className="flex justify-center mb-3 ml-4 ">
            <Link
              className="flex items-center text-white hover:text-blue-500"
              href="/"
            >
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
        </div>
        <h2 className="text-slate-200 font-bold text-lg mb-4">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500" href="/auth/register">
            Register
          </Link>
        </h2>

        {/* MAIL */}
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="user@email.com"
        />

        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        {/* PASSWORD */}
        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Login
        </button>

        <div className="flex justify-center items-center my-4">
          <div className="border-t border-white w-1/4"></div>
          <span className="mx-2 text-white">OR</span>
          <div className="border-t border-white w-1/4"></div>
        </div>

        {/* Sign in GOOGLE */}
        <div class="flex justify-center  items-center pt-4 dark:bg-gray-800">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl:
                  "https://frontend-etherscaneitor-production.up.railway.app/dashboard",
              })
            }
            className="px-4 py-4 w-full justify-center  items-center border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-white  hover:border-slate-400 dark:hover:border-slate-500  dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <Image
              className="w-6 h-6"
              width={15}
              height={15}
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            ></Image>
            Sign In with google
          </button>
        </div>
      </form>
    </div>
  );
}
