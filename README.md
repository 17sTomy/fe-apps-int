# E-Commerce Web Application (English README 🇺🇸)

## Frontend with React.js for the Interactive Applications Course

![](Imagenes/LogoUADE.svg)

This project is the first delivery of the Mandatory Practical Work (TPO) for the **Interactive Applications** course in the second semester of 2024, part of the **Computer Engineering** degree at **Universidad Argentina de la Empresa (UADE)**. It includes a **React.js** frontend and a **Java Spring Boot** backend, creating a complete e-commerce application.

![Project Preview](src/assets/preview.gif)

## Team Members
-  ⁠Tomás Álvarez
-  ⁠Matías Gluck
-  ⁠Franco Massi
-  ⁠Tobias Medina

## Presentation Date
Tuesday, November 12th, 2024

## Features

- **Browse Products by Categories, Recently Viewed, or Featured**: Users can explore products based on different criteria, enhancing discoverability.
- **Add and Manipulate Products in Cart**: Users can seamlessly add products to their cart, update quantities, and remove items as needed.
- **Add Products to Favorites**: Favorite products to keep track of preferred items.
- **Purchase and Maintain a Transaction History**: Complete purchases and keep a history of all transactions for easy access to past orders.
- **Admin Access**: An administrator has access to a dedicated panel where they can manage users, products, and product listings.
- **JWT Authentication**: Secure authentication system using JSON Web Tokens (JWT) to verify users' identities, manage sessions, and restrict access to certain features for authenticated users only.

## Technologies Used

The frontend stack includes:

-  ⁠**React**: Used to develop dynamic user interfaces with component-based architecture.
-  ⁠**Bootstrap**: Provides responsive, mobile-first design and styling.
-  ⁠**JavaScript (JS)**: Core language for interactivity and logic.
-  ⁠**Vite**: Tool for fast development and optimized builds.

The backend ([Backend Repository](https://github.com/MatiasUrielGluck/be-apps-int)) stack includes:

-  ⁠**Java Spring Boot**: Framework for building the REST API with microservices architecture.
-  ⁠**JPA (Java Persistence API)**: Manages object-relational mapping and database interaction.
-  ⁠**CRUD Repository**: Handles Create, Read, Update, Delete operations for the database.
-  ⁠**JWT (JSON Web Token)**: Provides secure authentication and authorization for API routes.
-  ⁠**MySQL**: Database to store structured information for products, users, and purchases.

## Use Cases

#### User Management:
-  ⁠**User Registration**: Allows users to sign up with username, email, password, birth date, first name, and last name.
-  ⁠**Login**: Authenticates users using email/username and password, generating a JWT for system access.

#### Product Catalog:
-  ⁠**Product Viewing**: Authenticated users can access a homepage displaying featured products, categorized items, and recently viewed products.
-  ⁠**Product Detail**: Users can view details of each product, including price, stock, and description. If out of stock, users are notified and can't add it to their cart. Items can also be added to a favorites list.

#### Shopping Cart:
-  ⁠**Cart Management**: Users can add, remove, or clear items in their cart. During checkout, stock availability is verified, and out-of-stock items are flagged.
-  ⁠**Stock Reduction**: Successfully purchased items have stock adjusted accordingly.

#### Product Management:
-  ⁠**Product Publishing**: Administrators can add new products with images, descriptions, and categories.
-  ⁠**Stock Management**: Administrators can update product stock or remove products as needed.

#### Profile Section:
-  ⁠**My Profile**: Users can view personal info and a history of completed transactions with dates.

## Additional Implemented Features

-  ⁠**Product Recommendation Engine**: Recommends products based on genre, decade, director, and favorite items.
-  ⁠**Admin Requests Module**: Allows administrators to handle specific requests.
-  ⁠**Review Section**: Users can leave reviews and rate purchased products.

## Installation and Use
Follow these steps to set up the app on your local machine:

1. Clone the repository:
   ```
   git clone https://github.com/17sTomy/fe-apps-int.git
   ```
2. Install dependencies using npm:
   ```
   npm install
   ``` 
3. Run the server and then open http://localhost:5173/ in the browser:
   ```
   npm run dev
   ```

Backend Setup

1.⁠ ⁠Clone the repository:
```
git clone https://github.com/MatiasUrielGluck/be-apps-int.git
```

2.⁠ ⁠Configure database credentials in the application.properties file.


3.⁠ ⁠Run the backend server:
```
mvn spring-boot:run
```

4.⁠ ⁠Access the API at http://localhost:8080.


## Contributions

This project was developed for the Interactive Applications course as an academic document for the Computer Engineering program at UADE. Contributions to this repository are not open, as this is an academic project. However, downloading and exploring the repository for educational purposes is permitted.

## License

This project is licensed for academic and non-commercial use only. Redistribution and use in source and binary forms, with or without modification, are permitted for educational purposes. Commercial use, distribution, or sublicensing is prohibited without explicit permission.

---

# Aplicación Web de E-Commerce (README en español 🇦🇷)

## Frontend con React.js para la materia de Aplicaciones Interactivas

![](Imagenes/LogoUADE.svg)

Este proyecto es la primera entrega del Trabajo Práctico Obligatorio (TPO) para la materia de **Aplicaciones Interactivas** del segundo semestre de 2024, en la carrera de **Ingeniería en Informática** en la **Universidad Argentina de la Empresa (UADE)**. Consiste en un frontend desarrollado en *React.js* y un backend en **Java Spring Boot**, formando una aplicación de e-commerce completa

![Project Preview](src/assets/preview.gif)

## Integrantes del equipo
-  ⁠Tomás Álvarez
-  ⁠Matías Gluck
-  ⁠Franco Massi
-  ⁠Tobias Medina

## Fecha de presentación
Martes, 12 de noviembre de 2024

## Funcionalidades

- ⁠**Explorar productos por categorías, recientemente vistos o destacados**: Los usuarios pueden explorar productos según diferentes criterios, mejorando su descubrimiento.
- **Agregar y manipular productos en el carrito**: Los usuarios pueden añadir productos a su carrito, actualizar cantidades y eliminar elementos según necesiten.
- **Agregar productos a favoritos**: Permite a los usuarios marcar productos preferidos.
- **Comprar y mantener un historial de transacciones**: Los usuarios pueden completar compras y acceder a un historial de todas las transacciones para consultar pedidos pasados.
- ⁠**Acceso para administradores**: Los administradores tienen acceso a un panel dedicado para gestionar usuarios, productos y publicaciones de productos.
- **Autenticación JWT**: Sistema de autenticación segura usando JSON Web Tokens (JWT) para verificar la identidad de los usuarios, gestionar sesiones y restringir el acceso a ciertas funciones solo para usuarios autenticados.



## Tecnologías Utilizadas

La pila del frontend incluye:

-  ⁠**React**: Utilizado para desarrollar interfaces de usuario dinámicas con una arquitectura basada en componentes.
-  ⁠**Bootstrap**: Proporciona un diseño responsivo, primero para dispositivos móviles, y estilos.
-  **JavaScript (JS)**: Lenguaje principal para la interactividad y lógica.
-  ⁠**Vite**: Herramienta para desarrollo rápido y construcción optimizada.

La pila del backend ([Repositorio Backend](https://github.com/MatiasUrielGluck/be-apps-int)) incluye:

-  **Java Spring Boot**: Framework para construir la API REST con arquitectura de microservicios.
-  **JPA (Java Persistence API)**: Maneja el mapeo objeto-relacional y la interacción con la base de datos.
-⁠  **Repositorio CRUD**: Maneja las operaciones de Crear, Leer, Actualizar, y Eliminar para la base de datos.
-  **JWT (JSON Web Token)**: Proporciona autenticación y autorización seguras para las rutas de la API.
-  **MySQL**: Base de datos para almacenar información estructurada de productos, usuarios y compras.

## Casos de Uso

#### Gestión de Usuarios:
- ⁠ **Registro de Usuarios**: Permite a los usuarios registrarse con nombre de usuario, email, contraseña, fecha de nacimiento, nombre y apellido.
-  **Inicio de Sesión**: Autentica a los usuarios usando email/nombre de usuario y contraseña, generando un JWT para acceder al sistema.

#### Catálogo de Productos:
-  ⁠**Visualización de Productos**: Los usuarios autenticados pueden acceder a una página principal que muestra productos destacados, artículos por categoría y productos vistos recientemente.
-  ⁠**Detalle de Productos**: Los usuarios pueden ver detalles de cada producto, incluyendo precio, stock y descripción. Si el producto está agotado, se notifica a los usuarios y no pueden añadirlo al carrito. También pueden agregar artículos a una lista de favoritos.

#### Carrito de Compras:
-  **Gestión del Carrito**: Los usuarios pueden agregar, eliminar o vaciar elementos de su carrito. Durante el pago, se verifica la disponibilidad de stock y se marcan los artículos agotados.
-  ⁠**Reducción de Stock**: Los artículos comprados exitosamente tienen su stock ajustado en consecuencia.

#### Gestión de Productos:
-  **Publicación de Productos**: Los administradores pueden añadir nuevos productos con imágenes, descripciones y categorías.
-  **Gestión de Stock**: Los administradores pueden actualizar el stock de los productos o eliminar productos según sea necesario.

#### Sección de Perfil:-
- **Mi Perfil**: Los usuarios pueden ver su información personal y un historial de transacciones completadas con sus fechas.

## Características Adicionales Implementadas

-  ⁠**Motor de Recomendación de Productos**: Recomienda productos según género, década, director y artículos favoritos.
-  ⁠**Módulo de Solicitudes para Administradores**: Permite a los administradores gestionar solicitudes específicas.
-  **Sección de Reseñas**: Los usuarios pueden dejar reseñas y calificar productos comprados.

## Instalación y Uso

Sigue estos pasos para configurar la aplicación en tu máquina local:

1.⁠ ⁠Clonar el repositorio:
   ```
   git clone https://github.com/17sTomy/fe-apps-int.git
   ```
2. ⁠Instalar dependencias usando npm:
   ```
   npm install
   ``` 
3. ⁠Ejecutar el servidor y abrir http://localhost:5173/ en el navegador:
   ```
   npm run dev
   ```

### Configuración del Backend

1.⁠ ⁠Clonar el repositorio:
```
git clone https://github.com/MatiasUrielGluck/be-apps-int.git
```

2.⁠ ⁠Configurar las credenciales de la base de datos en el archivo ⁠ application.properties ⁠.

3.⁠ ⁠Ejecutar el servidor backend:
```
mvn spring-boot:run
```

4.⁠ ⁠Access the API at http://localhost:8080.

## Contribuciones

Este proyecto fue desarrollado para la materia de Aplicaciones Interactivas como un documento académico para el programa de Ingeniería en Informática en UADE. Las contribuciones a este repositorio no están abiertas, ya que se trata de un proyecto académico. Sin embargo, se permite descargar y explorar el repositorio con fines educativos.

## Licencia

Este proyecto está licenciado para uso académico y no comercial únicamente. La redistribución y el uso en formas de fuente y binario, con o sin modificaciones, están permitidos para fines educativos. Se prohíbe el uso comercial, distribución o sublicencia sin permiso explícito.
