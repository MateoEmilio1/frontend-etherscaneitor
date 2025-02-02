export { default } from "next-auth/middleware";

// A medida que quiero proteger mas rutas las agrego al matcher
// el ":path*"
export const config = { matcher: ["/dashboard/:path*", "/api/:path*", "/simulator"] }
