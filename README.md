# Storage Management
![Minha Imagem](/image_Readme/Login_QIMA.png)

This is a product storage management project. The system allows saving, editing, and listing products, with related categories and their hierarchical paths. The backend was developed using Java 17, Spring Boot, JPA with PostgreSQL, and other libraries to facilitate development.

## Technologies Used

- **Java 17**: The version of Java used for the development of the project.
- **Spring Boot**: Framework used to build the backend application in a simple and robust way.
- **JPA (Java Persistence API)**: Used for data persistence in the database, enabling object-relational mapping.
- **PostgreSQL**: Relational database used to store the system's data.
- **Lombok**: Library used to reduce boilerplate code such as getters, setters, and constructors.
- **ModelMapper**: Library for converting between entities and DTOs (Data Transfer Objects), making communication between application layers easier.
- **Maven**: Dependency management tool used to configure and manage project libraries.

### Frontend:
- **React**: Frontend library used to build the user interface of the application.
- **CSS**: Stylesheets used for styling the frontend components.
- **Axios**: HTTP client for making requests to the backend API.
- **React Hooks**: State management and lifecycle methods used in functional components.

## Features

- **Product Management**: The system allows adding, editing, and listing products with their respective details (name, description, price, availability, and category).
- **Categories**: Each product is associated with a category, with a path reflecting the hierarchical structure of categories.
- **Persistence**: The system stores product and category information in a PostgreSQL database, with integration through JPA.

## Project Structure

- **src/main/java/com/e_storage**: Contains the project's packages and classes.
    - **model**: Contains the JPA entities representing products and categories.
    - **dto**: Contains the DTOs used for data transfer.
    - **mapper**: Contains the classes for mapping between entities and DTOs.
    - **service**: Contains the business logic, such as saving and retrieving products and categories.
    - **repository**: Contains the repositories that communicate with the database.
- **src/main/resources/application.properties**: Application configuration, including database connection settings.

## How to Run the Project

### Prerequisites

- **Java 17** installed
- **PostgreSQL** installed and running
- **Maven** installed

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Locomontero/storage_management.git
   cd storage_management

2. Edit the src/main/resources/application.properties file to configure the connection to your PostgreSQL database:
    ```bash
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

### API Endpoints
#### GET
/products: List all products.
#### POST
/save: Save a new product. Example request body:
```json
    {
  "name": "iPhone 13",
  "description": "Smartphone from Apple",
  "price": 4999.99,
  "categoryPath": "Electronics > Phones",
  "available": true,
  "categoryId": 2
}
```
#### PUT 
/products/{id}: Update an existing product.
#### DELETE
/products/{id}: Delete a product.