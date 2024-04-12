"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BuscoData({ email }) {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  //Combine las 2 funciones en 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, addressesResponse] = await Promise.all([
          fetch(
            `https://frontend-etherscaneitor-production.up.railway.app/api/users/?email=${email}`
          ),
          userId
            ? fetch(
                `https://frontend-etherscaneitor-production.up.railway.app/api/users/${userId}/addresses/?userId=${userId}`
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

        console.log("Email: ", email);
        console.log("User data: ", userDataResponse);
        console.log("User Id: ", userDataResponse.userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email, userId]);

  //Tengo un problem

  return (
    <div className="text-white">
      Email: {email}
      <br />
      <br />
      <div className="mb-7">
        <Link
          href="/dashboard/settings"
          className="bg-blue-500 hover:bg-blue-700 text-white  font-bold  py-2 px-4 rounded"
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
              <p className="text-blue-500"> {address.address}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
