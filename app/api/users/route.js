// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextResponse } from "next/server";
import db from "@/libs/db";

// Ruta para OBTENER el ID de un usuario por su correo electrónico
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    // Buscar el usuario por su correo electrónico utilizando db
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Devolver el ID del usuario
    return NextResponse.json({ userId: user.id });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching user ID",
        error: error.message, // Incluir el mensaje de error en la respuesta
      },
      {
        status: 500,
      }
    );
  }
}
