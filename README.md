# API Pista - Sistema de Gestión de Pista de Hielo

API GraphQL para la gestión de una pista de hielo, construida con Node.js, Express, Apollo Server, MongoDB y TypeScript.

## Características Principales

- 🚀 GraphQL con Apollo Server
- 🔒 Soporte HTTPS/SSL
- 📁 Sistema de archivos integrado
- 🔑 Autenticación JWT
- 📝 Logging con Winston
- 🗄️ MongoDB como base de datos
- 📦 ESM Modules
- 🔄 Hot Reload en desarrollo

## Requisitos Previos

- Node.js >= 16
- MongoDB >= 4.4
- OpenSSL (para certificados SSL)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/fjpimienta/apipista.git
cd apipista
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Configurar el archivo .env:
```env
MONGODB_URI=mongodb://usuario:contraseña@localhost:27017/pistahielo
PORT=3003
NODE_ENV=development
JWT_SECRET=tu-secreto-jwt
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run start`: Inicia el servidor en producción
- `npm run compile`: Compila el código TypeScript
- `npm run lint`: Ejecuta el linter
- `npm run generate-ssl`: Genera certificados SSL autofirmados

## Estructura del Proyecto

```
apipista/
├── src/
│   ├── config/         # Configuraciones
│   ├── interfaces/     # Interfaces TypeScript
│   ├── lib/           # Bibliotecas y utilidades
│   ├── modules/       # Módulos de la aplicación
│   ├── schema/        # Esquemas GraphQL
│   ├── services/      # Servicios
│   ├── utils/         # Utilidades
│   └── server.ts      # Punto de entrada
├── build/              # Código compilado
├── uploads/           # Archivos subidos
└── logs/             # Archivos de registro
```

## Módulos Disponibles

- 👥 Usuarios
- 📚 Clases
- 🎓 Estudiantes
- 👨‍🏫 Profesores
- 📝 Artículos
- 💰 Pagos
- 📊 Reportes
- 🎫 Reservaciones
- 📦 Inventario
- 💵 Ventas
- ✂️ Cortes

## API GraphQL

El endpoint GraphQL está disponible en:
- Desarrollo: `https://localhost:3003/graphql`
- Producción: `https://tudominio.com/graphql`

### Playground

El GraphQL Playground está habilitado en desarrollo en:
`https://localhost:3003/graphql`

## Seguridad

- Certificados SSL autogenerados en desarrollo
- Protección CORS
- Compresión de respuestas
- Límites en tamaño de archivos
- Validación de tipos de archivos
- Autenticación JWT

## Logs

Los logs se almacenan en:
- Desarrollo: `src/logs/log-api.log`
- Producción: `/var/log/apipista/api.log`

## Licencia

ISC License

## Autor

Fernando Pimienta - fjpimienta@gmail.com
