import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        console.log("credentials: ",credentials);

        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error("No user found");

        console.log("userFound: ",userFound);

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Wrong password");

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  /*  
  docs: https://next-auth.js.org/configuration/callbacks

  Probar asi ? preg profe

  El profile lo provee GoogleProvider
  
  callbacks: {
  async signIn({ user, account, profile, email }) {
    if (account?.provider === 'google') {
      let existingUser = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!existingUser) {
        // Crear un nuevo usuario utilizando la información del perfil de Google
        existingUser = await prisma.user.create({
          data: {
            email: email,
            // Otros campos que quieras añadir desde el perfil de Google
          }
        });
      }

      // Asignar el ID del usuario a la sesión
      user.id = existingUser.id;
    }

    return true; // Continuar con el proceso de inicio de sesión
  },
}, */
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
