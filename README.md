# Car Rental Application

## Overview

This is a full-stack car rental application developed with React 18 for the frontend and .NET 6 for the backend.

## Frontend

### Framework and Libraries

- React with Redux for state management
- React-specific Bootstrap for styling
- Context APIs for data sharing
- React Toastify for notifications
- Redux Toolkit for efficient Redux usage

### Installation

```bash
cd car-rental-application-frontend
npm install
```
## Usage
1. After installing the dependencies, run `npm start` to start the development server.
2. Open your web browser and go to `http://localhost:3000` to access the application.

## Backend
### Tools Required

- Visual Studio 2022
- Visual Studio Code
- SQL Server Management Studio
- Google Chrome / Mozilla Firefox

### Installation 

```bash
cd Car-Rental-Application-Backend
dotnet tool install --global dotnet-ef
dotnet ef migrations add yourMigrationName
dotnet ef database update
dotnet run
```

## Usage
1. After installing the dependecies and update database, run `dotned run` to start the backend server
2. Open your web browser and go to `https://localhost:7094/swagger/index.html` to access the Swagger.


### Seeded User Data (Sample)

Here is the email and password information for the seeded users:

#### Admin User

- Email: admin@nagarro.com
- Password: Admin123#

#### Arpit Dhuriya (Regular User)

- Email: arpit.dhuriya@nagarro.com
- Password: Arpit123#

#### Dummy User (Regular User)

- Email: dummy123@nagarro.com
- Password: Dummy123#


#### Cars

The application also includes there are some set of sample cars:

1. Car 1
   - Maker: Tesla
   - Model: Model 3
   - ImageUrl = https://img2.carmax.com/assets/24355068/hero.jpg?width=400
   - AvailableQuantity: 1,
   - Rental Price: 7000

2. Car 2
   - Maker: Nissan
   - Model: Altima
   -  ImageUrl = https://autohexa.com/wp-content/uploads/2023/02/Audi-A4-1.jpg
   - AvailableQuantity: 1,
   - Rental Price: 4125

3. ...

These cars serve as initial data and can be managed by the admin user, including adding, updating, or deleting cars from the admin view as needed.

## UI Snapshots

1. *Login Page:*

   <img width="960" alt="Login Page" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/e837413d-bc56-421d-98bd-cbd8c085f39f">
   <img width="960" alt="Login Page Loading" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/cb9d912d-e1b2-45c9-8853-ba328f433303">

2. *Car Listings/Home Page:*

   <img width="960" alt="Home Page" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/c97a78d3-0ed2-4ba8-ace6-065f8fc2bd97">
   <img width="960" alt="Home Page Loading" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/56897693-b8a7-4026-a798-53a709bfe275">
   <img width="960" alt="Home Page with no Content" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/f416870f-d5e4-427b-8b78-9512377f054e">

3. *Car Page:*

   <img width="960" alt="Car Page" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/c721ca89-51f3-45b8-a18a-95389675a493">
   <img width="960" alt="Car Loading" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/21a824ee-d308-47b2-82d1-a7e50e92157b">

4. *My Rental Agreements:*

   <img width="960" alt="All Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/8b2efcbc-0277-4a9c-8832-73b05a8594a6">

5. *Rental Agreement:*

   <img width="960" alt="Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/f8b4d76c-7fcc-4303-9dd5-292221a3d6d7">
   <img width="960" alt="Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/e4d03efb-8860-474c-ac71-23da5efd96d3">
   <img width="960" alt="Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/6793db83-172f-4c2c-a35e-588abe1176aa">
   <img width="960" alt="Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/84bc78b9-6e5e-4df1-a911-730436bffaae">
   <img width="960" alt="Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/53594603-3713-4da1-927a-fc4f5f6db9d9">
   <img width="960" alt="Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/29f548a6-8ee6-4581-a5f7-c346197aa651">
   <img width="960" alt="Rental Agreement" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/37fde431-58f6-4dfa-878b-0ffd02054caf">

6. *About Us Page:*

   <img width="960" alt="About Us" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/5a5ad963-ff07-4959-888f-cdc2be00a13c">

7. *404 Not Found Page:*

   <img width="960" alt="404 Not Found" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/3abc0242-9545-4a2c-a3a5-a2fb8a80adbf">

8. *Swagger View:*

   <img width="960" alt="Swagger Page View" src="https://github.com/Arpit4288/car-rental-agreement-readmePics/assets/87499605/728cf870-80cf-4ed2-a2ba-ed0a780cb628">

Feel free to explore the application's UI by running it locally and accessing different pages.


## Assumptions

During the development of this project, several assumptions were made to streamline the process. Here are the key assumptions:

1. **User Authentication:** It is assumed that user registration functionality is not required for this application, and sample user data is seeded directly into the database for demonstration purposes.

2. **Admin Controls:** Admin users have full control over managing cars, including adding, updating, and deleting car data. Admin controls are assumed to be accessible via an admin dashboard or similar interface.

3. **Initial Car Data:** Sample car data is included in the application to showcase its functionality. These cars are assumed to be Quantity as 1 by default.

4. **Authentication Method:** Both admin and regular users can log in using their email and password. The password security and user management aspects are not covered in detail in this README.

5. **Swagger Documentation:** The backend provides Swagger documentation for API endpoints, which can be accessed at `https://localhost:7094/swagger/index.html`. It is assumed that this documentation is used for API testing and exploration.

6. **Image URLs:** Image URLs for cars have been provided for illustration purposes. It is assumed that these URLs lead to valid images hosted online. 


## Submitted By
Arpit Kumar Dhuriya ❤️