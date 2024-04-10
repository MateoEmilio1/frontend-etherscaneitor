import React, { useState } from "react";

const AddressEditor = ({ address, onSave, userId, addressId }) => {
  const [newName, setNewName] = useState(address.name);
  const [newAddress, setNewAddress] = useState(address.address);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/addresses/${addressId}?userId=${userId}&addressId=${addressId}&newName=${newName}&newAddress=${newAddress}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedData = await response.json();
      onSave(updatedData); // Actualizar el estado en el componente padre
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-black text-lg font-semibold mb-2">Editar Dirección</h2>
      <div className="mb-4">
        <label htmlFor="newName" className="block text-gray-700 font-semibold mb-1">Nuevo Nombre:</label>
        <input
          type="text"
          id="newName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newAddress" className="block text-gray-700 font-semibold mb-1">Nueva Dirección:</label>
        <input
          type="text"
          id="newAddress"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default AddressEditor;
