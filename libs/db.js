import { PrismaClient } from "@prisma/client";

// Definimos una función que retorna una instancia de PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Verificamos si la propiedad 'prismaGlobal' ya está definida en el objeto global
if (!global.prismaGlobal) {
  // Si no está definida, creamos una nueva instancia de PrismaClient y la asignamos a 'prismaGlobal'
  global.prismaGlobal = prismaClientSingleton();
}

// Asignamos la instancia de PrismaClient almacenada en 'prismaGlobal' a la variable 'prisma'
const prisma = global.prismaGlobal;

// Exportamos la variable 'prisma' para que esté disponible fuera de este módulo
module.exports = prisma;

// Si no estamos en un entorno de producción, asignamos la instancia de PrismaClient a 'prismaGlobal'
if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma;
