import { Hono } from "hono";
import authRouter from "./routes/auth.route";
import { postRouter } from "./routes/post.route";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user.route"; // Importa la nueva ruta de usuarios
import actualizarRouter from "./routes/actualizar.route";
import { JwtVariables } from "hono/jwt";  // Importación del tipo JwtVariables

type Variables = JwtVariables;

// Crear una instancia de la app Hono
const app = new Hono<{ Variables: Variables }>();

// Habilitar CORS
app.use(cors({
  origin: "*", // Permitir solicitudes desde el frontend
  credentials: true, // Permitir cookies y autenticación con credenciales
}));

// Ruta GET de prueba
app.get("/", (c) => {
  return c.json({ message: "API is working!" });
});

// Definir rutas
app.route("/api/v1/auth", authRouter); // Rutas de autenticación
app.route("/api/v1/posts", postRouter); // Rutas de publicaciones
app.route("/api/v1/user", userRouter); // Rutas de usuarios
app.route("/api/v1/actualizar", actualizarRouter); // Rutas de actualización

// Este código es necesario para que la app funcione bien con servidores en Vercel o en un entorno local
// Si deseas correrla localmente en tu entorno local, descomenta la siguiente línea:

// app.listen(3001); // Descomenta si deseas usarlo localmente.

// Exporta el servidor como un objeto para usar en Vercel o como una función de Node.js
export default {
  port: 3001,
  fetch: app.fetch,
};
