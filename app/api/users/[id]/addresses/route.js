// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextResponse } from "next/server";
import { NextApiResponse , NextApiRequest} from "next";
import db from "@/libs/db";

//(ANDA) Creo el Address, Ejemplo: 

//http://localhost:3000/api/users/clutqhw1y0000lxbomoavcnvb/addresses

/* Formato JSON: 

{
    "name": "Pagos",
    "address": "0x12345asdfgh",
    "userId": "clutqhw1y0000lxbomoavcnvb"
  }
   */

export async function POST(request) {
  try {
    const { name, address, userId } = await request.json();

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

    const newAddress = await db.address.create({
      data: {
        name,
        address,
        userId,
      },
    });

    return NextResponse.json(newAddress); // Return the newly created address
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating address",
        error: error.message, // Include the error message in the response
      },
      {
        status: 500,
      }
    );
  }
}


// Ruta para OBTENER todas las direcciones de un usuario (ANDA)
export async function GET(request) {
  try {
    
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
   

    const userAddresses = await db.address.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(userAddresses); // Devolver todas las direcciones asociadas a ese ID de usuario
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching addresses",
        error: error.message, // Incluir el mensaje de error en la respuesta
      },
      {
        status: 500,
      }
    );
  }
}
