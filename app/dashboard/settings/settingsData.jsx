"use client";
import { useEffect, useState } from "react";
import AddressEditor from "@/app/components/address/addressEditor";
import AddressDeleter from "@/app/components/address/addressDeleter";
import Link from "next/link";
import AddressCreatorButton from "@/app/components/address/addressCreator";

export default function SettingsData({ email }) {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [showChangeDataModal, setShowChangeDataModal] = useState(false);
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
          console.log(addressesData);
          setAddresses(addressesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[email, userId, refreshData, API_BASE_URL]);

  const handleDataAction = () => {
    setRefreshData(!refreshData);
  };

  const handleShowOptions = (index) => {
    console.log(index);
    
    setShowOptionsIndex(index);
  };

  const handleCloseChangeDataModal = () => {
    setShowChangeDataModal(false); 
  };

  return (
    <div className="text-white">
      <div className="rounded-lg shadow-md p-4">
        <AddressCreatorButton
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

            <div className="pb-4">
              <button
                onClick={() => handleShowOptions(index)}
                className="bg-gray-200 text-black py-2 px-4 rounded-full shadow-lg focus:outline-none"
              >
                ...
              </button>
         
              {showOptionsIndex === index && (
                <div className="bg-white border border-gray-300 rounded-md shadow-md py-2">
                  <button
                    onClick={() => setShowChangeDataModal(true)}
                    className="text-black  block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                  >
                    Change data
                  </button>
                </div>
              )}
            </div>

            {showChangeDataModal && (showOptionsIndex === index) && (
              <div className="fixed inset-0  flex items-center justify-center shadow-lg bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg p-8">
                  <h2 className="text-2xl text-black font-semibold mb-4">
                    Change data
                  </h2>
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
