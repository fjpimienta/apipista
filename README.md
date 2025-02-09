# API Pista

Este proyecto es una API para la gestión de una renta de patines, utilizando el stack MEAN+G (MongoDB, Express, Angular, Node.js, GraphQL y Apollo Server).

## Requisitos

- Node.js
- npm
- MongoDB

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/apipista.git
   cd apipista
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   MONGODB_URI=mongodb://fjpimienta:09Fj197327Mr1976@localhost:27017/pistahielo?authSource=admin
   PORT=4000
   ```

## Scripts de NPM

- `npm run compile`: Compila el proyecto TypeScript a JavaScript.
- `npm run start`: Compila el proyecto y luego inicia el servidor.
- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática.
- `npm run lint`: Ejecuta ESLint para verificar el código.

## Estructura del Proyecto

```
/home/fjpimienta/Documents/projects/apipista
├── dist
├── node_modules
├── src
│   ├── config
│   │   └── db.ts
│   ├── modules
│   │   ├── articles
│   │   │   ├── index.ts
│   │   │   ├── resolvers.ts
│   │   │   └── typeDefs.ts
│   │   ├── classes
│   │   │   ├── index.ts
│   │   │   ├── resolvers.ts
│   │   │   └── typeDefs.ts
│   │   ├── cuts
│   │   │   └── index.ts
│   │   ├── inventory
│   │   │   └── index.ts
│   │   ├── payments
│   │   │   └── index.ts
│   │   ├── reports
│   │   │   └── index.ts
│   │   ├── reservations
│   │   │   └── index.ts
│   │   ├── sales
│   │   │   └── index.ts
│   │   ├── students
│   │   │   └── index.ts
│   │   ├── teachers
│   │   │   └── index.ts
│   │   └── users
│   │       └── index.ts
│   └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Uso

1. Inicia el servidor:
   ```bash
   npm run start
   ```

2. La API estará disponible en `http://localhost:4000`.

## Endpoints

### Usuarios

- `Query`
  - `users`: Obtiene todos los usuarios.
  - `user(id: ID!)`: Obtiene un usuario por ID.
- `Mutation`
  - `createUser(name: String!, email: String!)`: Crea un nuevo usuario.

### Inventario

- `Query`
  - `skates`: Obtiene todos los patines.
  - `skate(id: ID!)`: Obtiene un patín por ID.
- `Mutation`
  - `createSkate(brand: String!, size: Int!, available: Boolean!)`: Crea un nuevo patín.

### Reservas

- `Query`
  - `reservations`: Obtiene todas las reservas.
  - `reservation(id: ID!)`: Obtiene una reserva por ID.
- `Mutation`
  - `createReservation(userId: ID!, skateId: ID!, startDate: String!, endDate: String!)`: Crea una nueva reserva.

### Pagos

- `Query`
  - `payments`: Obtiene todos los pagos.
  - `payment(id: ID!)`: Obtiene un pago por ID.
- `Mutation`
  - `createPayment(reservationId: ID!, amount: Float!, date: String!)`: Crea un nuevo pago.

### Reportes

- `Query`
  - `reports`: Obtiene todos los reportes.
  - `report(id: ID!)`: Obtiene un reporte por ID.
- `Mutation`
  - `createReport(title: String!, content: String!, date: String!)`: Crea un nuevo reporte.

### Estudiantes

- `Query`
  - `students`: Obtiene todos los estudiantes.
  - `student(id: String)`: Obtiene un estudiante por ID.
- `Mutation`
  - `createStudent(name: String!, lastName: String!, tutor: String!, phone: String!, email: String!, order: Int!, active: Boolean!, registerUser: String!, updateUser: String!, registerDate: String!, updateDate: String!)`: Crea un nuevo estudiante.

### Cortes

- `Query`
  - `cutsX`: Obtiene todos los cortes X.
  - `cutX(id: ID!)`: Obtiene un corte X por ID.
  - `cutsY`: Obtiene todos los cortes Y.
  - `cutY(id: ID!)`: Obtiene un corte Y por ID.
- `Mutation`
  - `createCutX(date: String!, amount: Float!)`: Crea un nuevo corte X.
  - `createCutY(date: String!, totalAmount: Float!, cutsX: [ID!]!)`: Crea un nuevo corte Y.

### Ventas

- `Query`
  - `products`: Obtiene todos los productos.
  - `product(id: ID!)`: Obtiene un producto por ID.
  - `sales`: Obtiene todas las ventas.
  - `sale(id: ID!)`: Obtiene una venta por ID.
- `Mutation`
  - `createProduct(name: String!, price: Float!)`: Crea un nuevo producto.
  - `createSale(date: String!, totalAmount: Float!, products: [ID!]!)`: Crea una nueva venta.

### Artículos

- `Query`
  - `articles`: Obtiene todos los artículos.
  - `article(id: ID!)`: Obtiene un artículo por ID.
  - `articlesByAuthor(author: String!)`: Obtiene artículos por autor.
- `Mutation`
  - `createArticle(title: String!, content: String!, author: String!, publishedDate: String!, tags: [String!]!, active: Boolean!, registerUser: String!, updateUser: String!, registerDate: String!, updateDate: String!)`: Crea un nuevo artículo.
  - `updateArticle(id: ID!, title: String, content: String, author: String, publishedDate: String, tags: [String!], active: Boolean, updateUser: String, updateDate: String)`: Actualiza un artículo.
  - `deleteArticle(id: ID!)`: Elimina un artículo.
  - `activateArticle(id: ID!)`: Activa un artículo.
  - `deactivateArticle(id: ID!)`: Desactiva un artículo.

### Clases

- `Query`
  - `classes`: Obtiene todas las clases.
  - `class(id: ID!)`: Obtiene una clase por ID.
- `Mutation`
  - `createClass(name: String!, cost: Float!, startTime: String!, endTime: String!, teacher: ID!, active: Boolean!, registerUser: String!, updateUser: String!, registerDate: String!, updateDate: String!)`: Crea una nueva clase.
  - `updateClass(id: ID!, name: String, cost: Float, startTime: String, endTime: String, teacher: ID, active: Boolean, updateUser: String, updateDate: String)`: Actualiza una clase.
  - `deleteClass(id: ID!)`: Elimina una clase.
  - `activateClass(id: ID!)`: Activa una clase.
  - `deactivateClass(id: ID!)`: Desactiva una clase.

### Profesores

- `Query`
  - `teachers`: Obtiene todos los profesores.
  - `teacher(id: ID!): Teacher`: Obtiene un profesor por ID.
  - `teacherByName(name: String!): [Teacher]`: Obtiene profesores por nombre.
- `Mutation`
  - `createTeacher(name: String!, lastName: String!, subject: String!, phone: String!, email: String!, active: Boolean!, registerUser: String!, updateUser: String!, registerDate: String!, updateDate: String!)`: Crea un nuevo profesor.
  - `updateTeacher(id: ID!, name: String, lastName: String, subject: String, phone: String, email: String, active: Boolean, updateUser: String, updateDate: String)`: Actualiza un profesor.
  - `deleteTeacher(id: ID!)`: Elimina un profesor.
  - `activateTeacher(id: ID!)`: Activa un profesor.
  - `deactivateTeacher(id: ID!)`: Desactiva un profesor.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia ISC.
