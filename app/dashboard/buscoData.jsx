"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BuscoData({ session }) {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  //Combine las 2 funciones en 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica que la sesión esté presente y que tenga un userId
        if (session && session.userId) {
          const addressesResponse = await fetch(
            `https://frontend-etherscaneitor-production.up.railway.app/api/users/${session.userId}/addresses/?userId=${session.userId}`
          );
          const addressesData = await addressesResponse.json();

          if (addressesData) {
            setAddresses(addressesData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);

  /* 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/?email=${email}`
        );
        const data = await response.json();
        if (data && data.userId) {
          setUserId(data.userId);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchData();
  }, [email]);

  
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://localhost:3000/api/users/${userId}/addresses/`
          );
          const data = await response.json();
          setAddresses(data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]); */

  return (
    <div className="text-white">
      {session && (
        <div>
          Email: {session.user.email}
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
                <Link href={`/address/${encodeURIComponent(address.address)}`}>
                  <p className="text-gray-600">Dirección:</p>
                  <p className="text-blue-500"> {address.address}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
