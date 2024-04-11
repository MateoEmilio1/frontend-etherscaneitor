// components/AddressDeleter.js

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddressDeleter = ({ userId, addressId }) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = async () => {
      try {
        setIsDeleting(true);
        console.log("addressId: " ,addressId)
        console.log("userId : " , userId)
  
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}/addresses/${addressId}?userId=${userId}&addressId=${addressId}`,
          {
            method: 'DELETE',
          }
        );
  
        if (response.ok) {
          // Recargar la página después de borrar el objeto de dirección
          router.reload();
        } else {
          console.error('Error deleting address:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting address:', error);
      } finally {
        setIsDeleting(false);
      }
    };
  
    return (
      <button
        onClick={handleDelete}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
          isDeleting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete Address'}
      </button>
    );
  };
  
  export default AddressDeleter;