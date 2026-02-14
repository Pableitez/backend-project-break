# Creus — Backend API y tienda

Documentación del backend del proyecto **Creus**, una tienda de ropa con catálogo de productos, dashboard de administración y API REST en JSON para consumo desde aplicaciones frontend.

## Descripción del proyecto

La tienda de ropa se ha bautizado con el nombre **Creus**. La aplicación ofrece:

- **Vistas HTML**: tienda pública con listado y detalle de productos, y un dashboard protegido para el administrador (crear, editar y eliminar productos).
- **API REST en JSON**: endpoints bajo `/api/products` para listar, crear, actualizar y eliminar productos, para integrar con aplicaciones frontend (SPA).
- **Autenticación**: login con usuario y contraseña (configurados por variables de entorno) y sesión con `express-session` para acceder al dashboard.
- **Páginas legales**: Política de cookies, Aviso legal y Privacidad, enlazadas desde el footer.

Los productos se almacenan en **MongoDB Atlas** y las imágenes se suben a **Cloudinary**. El código de vistas (layout, partials y páginas) está organizado en la carpeta `views/`, en lugar de helpers genéricos, y el proyecto está personalizado con la marca Creus y filtros por colección.

---

## Cómo se pone en marcha la aplicación

La aplicación se ejecuta con Node.js y requiere una base de datos MongoDB (Atlas) y una cuenta de Cloudinary para las imágenes.

### Requisitos previos

- Node.js instalado.
- Cuenta en MongoDB Atlas y en Cloudinary.
- Archivo `.env` en la raíz del proyecto (no se incluye en el repositorio por seguridad).

### Variables de entorno

En la raíz del proyecto debe existir un archivo `.env` con las siguientes variables:

| Variable | Descripción |
|----------|-------------|
| `MONGO_URI` | URI de conexión a la base de datos MongoDB Atlas |
| `PORT` | Puerto en el que escucha el servidor (`3000` por defecto) |
| `CLOUDINARY_CLOUD_NAME` | Nombre de la nube en Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |
| `ADMIN_USER` | Usuario para el login del dashboard |
| `ADMIN_PASSWORD` | Contraseña del usuario del dashboard |
| `SESSION_SECRET` | Clave secreta para firmar la sesión |

En MongoDB Atlas es necesario permitir conexiones desde cualquier IP en **Network Access** (`0.0.0.0/0`) para que el servidor pueda conectarse.

### Instalación y ejecución

Tras clonar el repositorio, se instalan las dependencias con `npm install`. El servidor se inicia con:

```bash
npm start
```

En desarrollo puede usarse `npm run dev` (nodemon) para que se reinicie al cambiar el código.

Con el servidor en marcha, la aplicación queda disponible en `http://localhost:3000` (o en el puerto definido en `PORT`).

### Carga inicial de datos (opcional)

El proyecto incluye un script de seed que crea productos de ejemplo usando imágenes de la cuenta de Cloudinary configurada. Se ejecuta con:

```bash
npm run seed
```

### Rutas principales de la aplicación

- **Tienda (público):** `/products` — listado y detalle de productos.
- **Dashboard (admin):** `/dashboard` — gestión de productos; requiere haber iniciado sesión en `/login`.
- **Documentación de la API:** `/api-docs` — interfaz Swagger con todos los endpoints de la API.

---

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|------------|--------------------|
| **Node.js** y **Express** | Servidor HTTP, rutas y middlewares |
| **Mongoose** | Modelos y conexión a MongoDB |
| **MongoDB Atlas** | Base de datos en la nube |
| **dotenv** | Carga de variables de entorno desde `.env` |
| **express.urlencoded** y **express.json** | Parseo del body en peticiones POST/PUT |
| **method-override** | Soporte de PUT y DELETE en formularios HTML mediante `_method` |
| **Cloudinary**, **multer**, **multer-storage-cloudinary** | Subida y almacenamiento de imágenes |
| **express-session** | Sesión de usuario y login del dashboard |
| **swagger-ui-express** | Documentación interactiva de la API en `/api-docs` |
| **Jest** y **Supertest** | Tests automatizados del controlador de productos (`npm test`) |

---

## Estructura del repositorio

```
config/       → Conexión a BD (db), configuración de Cloudinary y Swagger
controllers/  → productController, authController, legalController, controlador de la API
models/       → Modelo Product (Mongoose)
routes/       → productRoutes, authRoutes, legalRoutes, rutas de la API
middlewares/  → Autenticación (protección del dashboard), subida a Cloudinary
views/        → Layout, partials y páginas (tienda y dashboard)
test/         → Tests con Jest
app.js        → Configuración de Express y rutas
index.js      → Arranque del servidor
seed.js       → Script de carga inicial de productos
```

---

## Documentación de la API

### Endpoints de vistas (HTML)

Rutas que devuelven páginas HTML para la tienda y el dashboard.

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/products` | Listado de productos con enlaces al detalle |
| GET | `/products/:productId` | Detalle de un producto |
| GET | `/dashboard` | Dashboard del administrador (listado). Requiere login |
| GET | `/dashboard/new` | Formulario para crear un producto. Requiere login |
| POST | `/dashboard` | Crear producto. Requiere login |
| GET | `/dashboard/:productId` | Detalle de un producto en el dashboard. Requiere login |
| GET | `/dashboard/:productId/edit` | Formulario para editar un producto. Requiere login |
| PUT | `/dashboard/:productId` | Actualizar producto. Requiere login |
| DELETE | `/dashboard/:productId/delete` | Eliminar producto. Requiere login |
| POST | `/dashboard/:productId/delete` | Eliminar producto desde formulario. Requiere login |

### Login y sesión

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/login` | Formulario de inicio de sesión |
| POST | `/login` | Inicio de sesión (usuario y contraseña según `.env`) |
| GET / POST | `/logout` | Cierre de sesión |

### Páginas legales (footer)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/cookies` | Política de cookies |
| GET | `/aviso-legal` | Aviso legal |
| GET | `/privacidad` | Política de privacidad |

### API REST (JSON)

Base de la API: **`/api/products`**. Las respuestas son JSON para ser consumidas por aplicaciones frontend.

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Listar todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/api/products` | Crear producto (body en JSON) |
| PUT | `/api/products/:id` | Actualizar producto (body en JSON) |
| DELETE | `/api/products/:id` | Eliminar producto |

La documentación interactiva (Swagger UI) está disponible en **GET** `/api-docs`, donde se pueden probar todos los endpoints de la API.

---

## Despliegue

El proyecto está desplegado en **Render** como Web Service. La configuración utilizada es:

- **Runtime:** Node.js  
- **Build command:** `npm install`  
- **Start command:** `npm start`  
- **Variables de entorno:** las mismas que en desarrollo (`MONGO_URI`, `CLOUDINARY_*`, `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`). Render asigna automáticamente `PORT`.

En el plan gratuito de Render el servicio se suspende tras un periodo de inactividad; la primera petición tras ese periodo puede tardar unos segundos en responder.

---

## Entrega del proyecto

- **Repositorio:** https://github.com/Pableitez/backend-project-break  
- **URL de producción:** https://creus.onrender.com  
- **Acceso al dashboard (evaluación):** usuario `pablo`, contraseña `1234`. Login en https://creus.onrender.com/login  
- **Variables de entorno en producción:** MONGO_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, ADMIN_USER, ADMIN_PASSWORD, SESSION_SECRET  

Para que la aplicación en producción pueda conectar con la base de datos, en MongoDB Atlas debe estar permitido el acceso desde cualquier IP (**Network Access** → `0.0.0.0/0`).
