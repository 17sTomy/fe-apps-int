# E-Commerce Web Application (English README 🇺🇸)

## Frontend with React.js for the Interactive Applications Course

This project is the first delivery of the Mandatory Practical Work (TPO) for the **Interactive Applications** course in the second semester of 2024, part of the **Computer Engineering** degree at **Universidad Argentina de la Empresa (UADE)**. It includes a **React.js** frontend and a **Java Spring Boot** backend, creating a complete e-commerce application.

[Link to the Project](https://blacknuster.netlify.app/productos)

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
