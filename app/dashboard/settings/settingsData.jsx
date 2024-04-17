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
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  // Estado de la opcion de los 3 puntitos, verlo en consulta como implementarlo
  const [showChangeData, setShowChangeData] = useState(false);
  const [showChangeDataModal, setShowChangeDataModal] = useState(false);
  
  

  //Combine las 2 funciones en 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, addressesResponse] = await Promise.all([
          // En local cambiar por: http://localhost:3000/
          // En prod cambiar por: https://frontend-etherscaneitor-production.up.railway.app
          fetch(
            `https://frontend-etherscaneitor-production.up.railway.app/api/users/?email=${email}`
          ),
          userId
            ? fetch(
                `https://frontend-etherscaneitor-production.up.railway.app/api/users/${userId}/addresses/?userId=${userId}`
              )
            : null,
          /* fetch(`http://localhost:3000/api/users/?email=${email}`),
          userId
            ? fetch(
                `http://localhost:3000/api/users/${userId}/addresses/?userId=${userId}`
              )
            : null, */
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

  const handleDataAction = () => {
    setRefreshData(!refreshData);
  };

  const handleShowOptions = (index) => {
    console.log(index);
    
    setShowOptionsIndex(index);
  };

  // Función para cerrar el modal de edición
  const handleCloseChangeDataModal = () => {
    setShowChangeDataModal(false); // Ocultar el modal de edición
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
              <p className="text-gray-600">Address:</p>
              <p className="text-blue-500 break-all">{address.address}</p>
            </Link>

            {/* Botón con opciones */}
            <div className="pb-4">
              <button
                onClick={() => handleShowOptions(index)}
                className="bg-gray-200 text-black py-2 px-4 rounded-full shadow-lg focus:outline-none"
              >
                ...
              </button>
              {/* Change data en pantalla */}
              {showOptionsIndex === index && (
                <div className="bg-white border border-gray-300 rounded-md shadow-md py-2">
                  <button
                    /* Si hago click en change data aparece el modal */
                    onClick={() => setShowChangeDataModal(true)}
                    className="text-black  block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                  >
                    Change data
                  </button>
                </div>
              )}
            </div>

            {/* Modals */}
            {showChangeDataModal && (showOptionsIndex === index) && (
              <div className="fixed inset-0  flex items-center justify-center shadow-lg bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg p-8">
                  <h2 className="text-2xl text-black font-semibold mb-4">
                    Change data
                  </h2>
                  {/* Address Editor */}
                  <AddressEditor
                    userId={userId}
                    addressId={address.id}
                    currentName={address.name}
                    currentAddress={address.address}
                    onSave={() => {
                      handleCloseChangeDataModal();
                      handleDataAction();
                    }}
                  />
                  <button
                    onClick={handleCloseChangeDataModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-full shadow-md focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Address Deleter */}
            <AddressDeleter
              userId={userId}
              addressId={address.id}
              onAddressDeleted={handleDataAction}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
