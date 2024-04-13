import { useState } from 'react';

const NewAddressButton = ({ userId, onCreateSuccess }) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    try {
      setIsCreating(true);

      const response = await fetch(
        // En local cambiar por: http://localhost:3000/
        // En prod cambiar por: https://frontend-etherscaneitor-production.up.railway.app
        `https://frontend-etherscaneitor-production.up.railway.app/api/users/${userId}/addresses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'New address',
            address: '0x0000000000000000000000000000000000000000',
            userId: userId,
          }),
        }
      );

      if (response.ok) {
        // Llamar a la función onCreateSuccess proporcionada por el padre para actualizar la UI
        onCreateSuccess();
        // Puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito
      } else {
        console.error('Error creating address:', response.statusText);
        // Puedes manejar el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error creating address:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      onClick={handleCreate}
      disabled={isCreating}
      className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
        isCreating ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isCreating ? 'Creating...' : 'Create New Address'}
    </button>
  );
};

export default NewAddressButton;
