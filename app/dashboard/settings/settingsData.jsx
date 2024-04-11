"use client";
import { useEffect, useState } from "react";
import AddressEditor from "@/app/components/addressEditor";
import AddressDeleter from "@/app/components/addressDeleter";
import Link from "next/link";
import AddressCreator from "@/app/components/addressCreator"; // Importa el componente NewAddressButton aquí

export default function SettingsData({ email }) {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  //Combine las 2 funciones en 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, addressesResponse] = await Promise.all([
          fetch(`http://localhost:3000/api/users/?email=${email}`),
          userId
            ? fetch(
                `http://localhost:3000/api/users/${userId}/addresses/?userId=${userId}`
              )
            : null,
        ]);

        const userData = await userDataResponse.json();
        const addressesData = userId ? await addressesResponse.json() : [];

        if (userData && userData.userId) {
          setUserId(userData.userId);
        }

        if (addressesData) {
          console.log(addressesData);
          setAddresses(addressesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email, userId, refreshData]);

  const handleAddressDeleted = () => {
    // Actualizar los datos manualmente después de eliminar la dirección
    setRefreshData(!refreshData);
  };

  const handleAddressUpdated = () => {
    // Actualizar los datos manualmente después de editar la dirección
    setRefreshData(!refreshData);
  };

  return (
    <div className="text-white">
      <div className="rounded-lg shadow-md p-4">
        <AddressCreator
          userId={userId}
          onCreateSuccess={() => setRefreshData(!refreshData)}
        />
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
            {/* Address Editor */}
            <AddressEditor
              userId={userId}
              addressId={address.id}
              currentName={address.name}
              currentAddress={address.address}
              onSave={handleAddressUpdated}
            />
            {/* Address Deleter */}
            <AddressDeleter
              userId={userId}
              addressId={address.id}
              onAddressDeleted={handleAddressDeleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
