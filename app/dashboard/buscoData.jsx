"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BuscoData({ email }) {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, addressesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/users/?email=${email}`),
          userId
            ? fetch(
                `${API_BASE_URL}/api/users/${userId}/addresses/?userId=${userId}`
              )
            : null,
        ]);

        const userData = await userDataResponse.json();
        const addressesData = userId ? await addressesResponse.json() : [];

        if (userData && userData.userId) {
          setUserId(userData.userId);
        }

        if (addressesData) {
          setAddresses(addressesData);
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000); 
        console.log("Email: ", email);
        console.log("User data: ", userDataResponse);
        console.log("User Id: ", userDataResponse.userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email, userId, API_BASE_URL]);

  //TO DO: Que el loading pase directo a los dates, hay como un
  // bache entre el loading y cuando llegan los datos.

  //Solucion: setTimeout
  if (loading) {
    const placeholderAddresses = Array.from({ length: 4 });

    return (
      <div className="text-white">
        Email: {email}
        <br />
        <br />
        <div className="mb-7">
          <Link
            href="/dashboard/settings"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Settings
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placeholderAddresses.map((address, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="my-2  rounded-full animate-pulse bg-blue-200 h-2 w-24"></h2>
              {/* Tengo que crear el address detail */}
              <div className="mt-4">
                <p className=" rounded-full animate-pulse bg-blue-200 h-2 w-12"></p>
                <p className="mt-3 break-all rounded-full animate-pulse bg-blue-200 h-2 w-52 md:w-72 lg:w-[420px]"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      Email: {email}
      <br />
      <br />
      <div className="mb-7">
        <Link
          href="/dashboard/settings"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Settings
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-black text-xl font-semibold mb-2">
              {address.name}
            </h2>
            {/* Tengo que crear el address detail */}
            <Link href={`/address/${encodeURIComponent(address.address)}`}>
              <p className="text-gray-600">Dirección:</p>
              <p className="text-blue-500 break-all"> {address.address}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
