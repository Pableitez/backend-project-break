# Tienda de ropa

Tienda de ropa con catálogo de productos y dashboard para el administrador. Los productos se guardan en MongoDB Atlas. Incluye vistas HTML (tienda y dashboard) y API REST en JSON para usar con frontend (p. ej. React).

## Cómo poner en marcha la aplicación

1. Clonar el repositorio e instalar dependencias:
   ```bash
   npm install
   ```

2. Crear el archivo `.env` en la raíz con las variables necesarias:
   ```
   MONGO_URI=<uri_de_tu_base_de_datos_atlas>
   PORT=3000
   CLOUDINARY_CLOUD_NAME=<tu_cloud_name>
   CLOUDINARY_API_KEY=<tu_api_key>
   CLOUDINARY_API_SECRET=<tu_api_secret>
   ADMIN_USER=<usuario_admin>
   ADMIN_PASSWORD=<contraseña_admin>
   SESSION_SECRET=<clave_secreta_para_la_sesión>
   ```

3. En MongoDB Atlas: **Network Access** → añadir IP `0.0.0.0/0` para permitir conexiones.

4. Arrancar el servidor:
   ```bash
   npm start
   ```
   O en modo desarrollo con nodemon:
   ```bash
   npm run dev
   ```

5. Abrir en el navegador: `http://localhost:3000` (o el `PORT` que hayas puesto en `.env`).

- **Tienda (público):** `/products`  
- **Dashboard (admin):** `/dashboard` (requiere login en `/login`)  
- **Documentación API (Swagger):** `/api-docs`

## Tecnologías usadas

- **Node.js** + **Express** — servidor y rutas
- **Mongoose** — conexión y modelos con MongoDB
- **MongoDB Atlas** — base de datos
- **dotenv** — variables de entorno (MONGO_URI, PORT, Cloudinary, admin, sesión)
- **express.urlencoded** y **express.json** — lectura del body de las peticiones
- **method-override** — uso de PUT y DELETE en formularios mediante `_method`
- **Cloudinary** + **multer** + **multer-storage-cloudinary** — subida de imágenes
- **express-session** — sesión y login para el dashboard
- **swagger-ui-express** — documentación de la API en `/api-docs`
- **Jest** + **Supertest** — tests (script: `npm test`)

## Endpoints

### Vistas HTML (tienda y dashboard)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/products` | Listado de productos (cada uno con enlace al detalle) |
| GET | `/products/:productId` | Detalle de un producto |
| GET | `/dashboard` | Dashboard del administrador (listado de productos). Requiere login |
| GET | `/dashboard/new` | Formulario para crear un producto. Requiere login |
| POST | `/dashboard` | Crear producto. Requiere login |
| GET | `/dashboard/:productId` | Detalle de un producto en el dashboard. Requiere login |
| GET | `/dashboard/:productId/edit` | Formulario para editar un producto. Requiere login |
| PUT | `/dashboard/:productId` | Actualizar producto. Requiere login |
| DELETE | `/dashboard/:productId/delete` | Eliminar producto. Requiere login |
| POST | `/dashboard/:productId/delete` | Eliminar producto (desde formulario). Requiere login |

### Login / logout

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/login` | Formulario de login |
| POST | `/login` | Iniciar sesión (usuario y contraseña en .env) |
| GET / POST | `/logout` | Cerrar sesión |

### API REST (JSON, para frontend React)

Base: `/api/products`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Listar todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/api/products` | Crear producto (body JSON) |
| PUT | `/api/products/:id` | Actualizar producto (body JSON) |
| DELETE | `/api/products/:id` | Eliminar producto |

La documentación interactiva de esta API está en **GET** `/api-docs` (Swagger UI).

## Despliegue en Render

1. Entra en [render.com](https://render.com) e inicia sesión con GitHub.
2. **Dashboard** → **New** → **Web Service**.
3. Conecta el repositorio **Pableitez/backend-project-break** (autoriza a Render si hace falta).
4. Configuración:
   - **Name:** project-break-backend (o el que quieras).
   - **Region:** Frankfurt (o la más cercana).
   - **Branch:** main.
   - **Runtime:** Node.
   - **Build Command:** `npm install`.
   - **Start Command:** `npm start`.
   - **Plan:** Free.
5. **Environment** → añade las variables (las que tienen valor secreto márcalas como **Secret**):
   - `MONGO_URI` (tu URI de Atlas).
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
   - `ADMIN_USER`, `ADMIN_PASSWORD` (usuario y contraseña del dashboard).
   - `SESSION_SECRET` (una frase o string aleatorio).
   - No hace falta definir `PORT`; Render la asigna.
6. **Create Web Service**. Cuando termine el deploy, tu API quedará en una URL tipo `https://creus.onrender.com`.

**Nota:** En plan gratuito el servicio se “duerme” tras inactividad; la primera petición puede tardar unos segundos en responder.

## Entrega del proyecto

- **URL del repositorio:** https://github.com/Pableitez/backend-project-break  
- **URL de producción:** (añadir cuando esté desplegado en Render u otro)  
- **Variables de entorno a configurar en producción:** MONGO_URI, PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, ADMIN_USER, ADMIN_PASSWORD, SESSION_SECRET  

Recuerda tener la IP abierta en Atlas: **Network Access** → IP Address **0.0.0.0/0**.
