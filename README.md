# API Pista - Sistema de Gestión de Pista de Hielo

API GraphQL para la gestión de una pista de hielo, construida con Node.js, Express, Apollo Server, MongoDB y TypeScript.

## Características Principales

- 🚀 GraphQL con Apollo Server v4
- 🔒 Soporte HTTPS/SSL
- 📁 Sistema de archivos con manejo de imágenes
- 🔑 Autenticación JWT y roles de usuario
- 📝 Logging con Winston
- 🗄️ MongoDB con Mongoose
- 📦 ESM Modules
- 🔄 Hot Reload en desarrollo
- 📧 Sistema de envío de emails
- 💳 Integración con pasarelas de pago
- 🔐 Sistema de permisos basado en roles

## Requisitos Previos

- Node.js >= 16
- MongoDB >= 4.4
- OpenSSL (para certificados SSL)
- Cuenta de AWS S3 (opcional, para almacenamiento de archivos)

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
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
SMTP_HOST=smtp.servicio.com
SMTP_USER=usuario
SMTP_PASS=contraseña
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
│   ├── config/         # Configuraciones del sistema
│   ├── interfaces/     # Interfaces TypeScript
│   ├── lib/           # Bibliotecas y utilidades
│   ├── models/        # Modelos de Mongoose
│   ├── modules/       # Módulos de la aplicación
│   │   ├── article/   # Gestión de artículos
│   │   ├── auth/      # Autenticación
│   │   ├── user/      # Gestión de usuarios
│   │   ├── payment/   # Gestión de pagos
│   │   └── ...
│   ├── resolvers/     # Resolvers GraphQL
│   ├── schema/        # Esquemas GraphQL
│   ├── services/      # Servicios externos
│   ├── utils/         # Utilidades
│   └── server.ts      # Punto de entrada
├── build/             # Código compilado
├── uploads/           # Archivos temporales
└── logs/             # Archivos de registro
```

## Módulos del Sistema

### Gestión Principal
- 👥 Usuarios y Roles
- 🏢 Sucursales
- 📊 Dashboard
- 🎫 Reservaciones

### Gestión Académica
- 📚 Clases y Horarios
- 🎓 Estudiantes
- 👨‍🏫 Profesores
- 📋 Asistencias

### Gestión Comercial
- 📝 Artículos y Productos
- 💰 Pagos y Facturación
- 📦 Inventario
- 💵 Ventas y POS
- ✂️ Cortes de Caja

### Características Adicionales
- 📧 Sistema de notificaciones
- 📊 Reportes y estadísticas
- 🗃️ Gestión de archivos
- 🔐 Control de acceso por roles

## API GraphQL

El endpoint GraphQL está disponible en:
- Desarrollo: `https://localhost:3003/graphql`
- Producción: `https://api.tudominio.com/graphql`

### Playground y Documentación

- GraphQL Playground: `https://localhost:3003/graphql`
- Documentación API: `https://localhost:3003/docs`

## Seguridad

- Certificados SSL/TLS
- Protección CORS configurable
- Rate Limiting
- Validación de entrada
- Sanitización de datos
- Autenticación JWT
- Control de acceso basado en roles
- Logs de seguridad

## Logs

Los logs se almacenan en:
- Desarrollo: `src/logs/log-api.log`
- Producción: `/var/log/apipista/api.log`

## Licencia

ISC License

## Autor

Fernando Pimienta - fjpimienta@gmail.com

## Soporte

Para soporte técnico o consultas:
- 📧 Email: fjpimienta@gmail.com
- 💬 GitHub Issues
