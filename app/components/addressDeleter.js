// components/AddressDeleter.js

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const AddressDeleter = ({ userId, addressId, onAddressDeleted }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("addressId: ", addressId);
      console.log("userId : ", userId);

      const response = await fetch(
        // En local cambiar por: http://localhost:3000/
        // En prod cambiar por: https://frontend-etherscaneitor-production.up.railway.app

        `https://frontend-etherscaneitor-production.up.railway.app/api/users/${userId}/addresses/${addressId}?userId=${userId}&addressId=${addressId}`,
        //`http://localhost:3000/api/users/${userId}/addresses/${addressId}?userId=${userId}&addressId=${addressId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Ejecutar la función proporcionada por el padre para notificar la eliminación
        onAddressDeleted();
        // Redireccionar a la página de configuración después de borrar
        router.push("/dashboard/settings");
        toast({
          variant: "success",
          description: "Your address has been deleted successfully.",
        });
      } else {
        console.error("Error deleting address:", response.statusText);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
          isDeleting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Address"}
      </button>
      {/* Agregar un botón de actualizar para actualizar manualmente la interfaz de usuario */}
      <button onClick={onAddressDeleted}>Actualizar</button>
    </div>
  );
};

export default AddressDeleter;
