// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextResponse  } from "next/server";
import db from "@/libs/db";

// Eliminar una Address de un User (ANDA)
// http://localhost:3000/api/
// users/[userId]/addresses/[addressId]?userId=[userId]&addressId=[addressId]
export async function DELETE(request) {
  try {
    // Obtener el ID de la dirección y el ID del usuario de los parámetros de la URL
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const addressId = searchParams.get("addressId");

    // Verificar si el usuario existe
    const userFound = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }
    // Verificar si la dirección pertenece al usuario
    const addressToDelete = await db.address.findUnique({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!addressToDelete) {
      return NextResponse.json(
        {
          message: "Address not found for this user",
        },
        {
          status: 404,
        }
      );
    }

    // Eliminar la dirección
    await db.address.delete({
      where: {
        id: addressId,
      },
    });

    return NextResponse.json(
      {
        message: "Address deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting address",
        error: error.message, // Incluir el mensaje de error en la respuesta
      },
      {
        status: 500,
      }
    );
  }
}


// Cambiar el name y/o address de una Address de un User (ANDA)
export async function PUT(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const addressId = searchParams.get("addressId");
    const newName = searchParams.get("newName");
    const newAddress = searchParams.get("newAddress");

    // Verificar si el usuario existe
    const userFound = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    // Verificar si la dirección pertenece al usuario
    const addressToUpdate = await db.address.findUnique({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!addressToUpdate) {
      return NextResponse.json(
        {
          message: "Address not found for this user",
        },
        {
          status: 404,
        }
      );
    }

    
    const updateData = {};
    if (newName) {
      updateData.name = newName;
    }
    if (newAddress) {
      updateData.address = newAddress; 
    }

   
    await db.address.update({
      where: {
        id: addressId,
      },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Address updated successfully",
      },
      {
        status: 200,
      }
    );
/* 
    ver si no lo tengo que modificar por esto:

     // Actualizar la dirección y obtener los datos actualizados
    const updatedAddress = await db.address.update({
      where: {
        id: addressId,
      },
      data: updateData,
      include: {
        user: true,
      },
    });

    return NextResponse.json(
      {
        message: "Address updated successfully",
        data: updatedAddress, // Devolver los datos actualizados
      },
      {
        status: 200,
      }
    ); */
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating address",
        error: error.message, 
      },
      {
        status: 500,
      }
    );
  }
}