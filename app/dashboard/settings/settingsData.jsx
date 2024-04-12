"use client";
import { useEffect, useState } from "react";
import AddressEditor from "@/app/components/addressEditor";
import AddressDeleter from "@/app/components/addressDeleter";
import Link from "next/link";
import AddressCreator from "@/app/components/addressCreator"; // Importa el componente NewAddressButton aquí

export default function SettingsData({ session }) {
  const [addresses, setAddresses] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica que la sesión esté presente y que tenga un usuario asociado
        if (session && session.user) {
          const userId = session.userId;

          const addressesResponse = await fetch(
            `https://frontend-etherscaneitor-production.up.railway.app/api/users/${userId}/addresses/?userId=${userId}`
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
  }, [session, refreshData]);

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
      {session && session.user && (
        <div>
          <div className="rounded-lg shadow-md p-4">
            <AddressCreator
              userId={session.userId}
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
                  userId={session.userId}
                  addressId={address.id}
                  currentName={address.name}
                  currentAddress={address.address}
                  onSave={handleAddressUpdated}
                />
                {/* Address Deleter */}
                <AddressDeleter
                  userId={session.userId}
                  addressId={address.id}
                  onAddressDeleted={handleAddressDeleted}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}