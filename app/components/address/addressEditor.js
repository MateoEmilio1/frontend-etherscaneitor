import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


const AddressEditor = ({ userId, addressId, currentName, currentAddress, onSave }) => {
  const [newName, setNewName] = useState(currentName);
  const [newAddress, setNewAddress] = useState(currentAddress);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const response = await fetch(
        `${API_BASE_URL}/api/users/${userId}/addresses/${addressId}?userId=${userId}&addressId=${addressId}&newName=${encodeURIComponent(newName)}&newAddress=${encodeURIComponent(newAddress)}`,
        {
          method: 'PUT',
        }
      );

      if (response.ok) {
        onSave();
        setNewName('');
        setNewAddress('');
        toast({
          variant: "success",
          description: "Your data has been updated.",
        });

      } else {
        console.error('Error updating address:', response.statusText);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (error) {
      console.error('Error updating address:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New Name..."
        className="block w-full text-gray-400 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      <input
        type="text"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        placeholder="New Address..."
        className="block mt-2 w-full text-gray-400 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default AddressEditor;
