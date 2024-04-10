// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useSearchParams } from 'next/navigation'
import { NextResponse } from "next/server";
import db from "@/libs/db";


// TO DO: Hacer que ande
export async function DELETE(request, context) {
  try {
    const params = context.params;
    // Extract the address ID from the request URL
    //const userId = request.nextUrl.searchParams.get("userId"); // no se usa mas (con el query)
    //const addresId = request.nextUrl.searchParams.get("addressId");
    /* Solo se puede usar en Client Components
    
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const addressId = searchParams.get("addressId");
    console.log("userId: " , userId + "addresId: ", addressId); */

    //const { userId } = request; // Obtener el ID del usuario de los parámetros de la solicitud
    console.log(userId);

    if (!userId || !addressId) {
      return NextResponse.json(
        { message: "Missing required parameters: userId and addressId" },
        { status: 400 }
      );
    }

    // Check if the address exists for the user
    const addressToDelete = await db.address.findUnique({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!addressToDelete) {
      return NextResponse.json(
        { message: "Address not found" },
        { status: 404 }
      );
    }

    // Delete the address
    await db.address.delete({
      where: {
        id: addressId,
      },
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting address", error: error.message },
      { status: 500 }
    );
  }
}
