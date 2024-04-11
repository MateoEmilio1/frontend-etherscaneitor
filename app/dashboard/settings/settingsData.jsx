"use client";

import { useEffect, useState } from "react";
import AddressEditor from "@/app/components/addressEditor";
import AddressDeleter from "@/app/components/addressDeleter";

export default function SettingsData({ email }) {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  //Combine las 2 funciones en 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, addressesResponse] = await Promise.all([
          fetch(`http://localhost:3000/api/users/?email=${email}`),
          userId
            ? fetch(`http://localhost:3000/api/users/${userId}/addresses/?userId=${userId}`)
            : null,
        ]);

        const userData = await userDataResponse.json();
        const addressesData = userId ? await addressesResponse.json() : [];

        if (userData && userData.userId) {
          setUserId(userData.userId);
        }

        if (addressesData) {
          console.log(addressesData)
          setAddresses(addressesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email, userId]);

  return (
    <div className="text-white">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-black text-xl font-semibold mb-2">
              {address.name}
            </h2>
            <p className="text-gray-600">Dirección: {address.address}</p>
            <AddressDeleter userId={userId} addressId={address.id} />
            {/* Aca tiene que haber 2 botones, 1 de editar y 1 de eliminar la address */}

            {/*  <AddressEditor
              address={address}
              userId={userId}
              addressId={address.id}
              onSave={(updatedData) => handleAddressSave(index, updatedData)}
            />  */}
          </div>
        ))}
      </div>
    </div>
  );
}
