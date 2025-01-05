# Inveon Final Case Project

This document provides instructions on how to run the project on your local machine and includes available user information. It also explains how to log in using the pre-defined users in the system.

## 1. MSSQL Docker Setup and Run

You need to start a **SQL Server** container based on the connection string (`ConnectionStrings:SqlServer`) provided in the `appsettings.json` file. The following command runs a SQL Server instance using Docker:

```bash
docker run -e "ACCEPT_EULA=Y" \
    -e "SA_PASSWORD=finalcase*Db" \
    -p 1433:1433 \
    --name sql-server \
    -d mcr.microsoft.com/mssql/server:2022-latest
```

> **Note:** The `SA_PASSWORD` is set to `finalcase*Db`, matching the connection string (`"Server=localhost;Database=inveonFinalCase;User Id=SA;Password=finalcase*Db;Encrypt=True;TrustServerCertificate=True;"`). If you change the password, ensure to update both the Docker command and `appsettings.json` accordingly.

## 2. Creating a Migration

If this is the first time you clone the project or no database tables have been created yet, you need to create a migration. Ensure you have the .NET EF tools installed:

```bash
dotnet tool install --global dotnet-ef
```

Next, create a migration (e.g., named `InitialMigrations`) using the following command:

```bash
dotnet ef migrations add InitialMigrations
```

## 3. Updating the Database

After creating the migration, update the database schema using:

```bash
dotnet ef database update
```

## 4. Running the Application

Once all steps are completed, run the project using the following command:

```bash
dotnet run
```

> **Alternatively:** You can run the project with live updates using `dotnet watch run`.

## 5. Available Users and Login

The following users have been pre-created in the system:

- **Instructor User (Invony)**
    - **Username:** `Invony`
    - **Email:** `invony@academy.com`
    - **City:** `Istanbul`
    - **Note:** Has the "Instructor" role in the system.

- **User 1 (Ahmet Kaya)**
    - **Username:** `ahmetkaya`
    - **Email:** `ahmetkaya@example.com`
    - **City:** `Izmir`

- **User 2 (Kemal Ege)**
    - **Username:** `kemalege`
    - **Email:** `kemalege@example.com`
    - **City:** `Denizli`

These users can log in to the system. You can assign custom passwords or configure Identity settings in the project for testing purposes.

## 6. API Documentation

## Collection: Auth

## End-point: Login
### Method: POST
>```
>{{URI}}/auth/login
>```
### Body (**raw**)

```json
{
  "email": "invony@academy.com",
  "password": "Test*1234"
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Register
### Method: POST
>```
>{{URI}}/auth/register
>```
### Body (**raw**)

```json
{
  "userName": "inveonAcademy",
  "email": "inveon@academy.com",
  "password": "Test*1234",
  "city": "Istanbul"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Refresh Token
### Method: POST
>```
>{{URI}}/auth/refresh-token
>```
### Body (**raw**)

```json
{
  "refreshToken": "{{refresh_token}}"
}

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
## Collection: Categories

## End-point: Get All
### Method: GET
>```
>{{URI}}/categories
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________

## Collection: Courses

## End-point: Create
### Method: POST
>```
>{{URI}}/courses
>```
### Body (**raw**)

```json
{
  "name": "asdsad",
  "description": "asdsa asdsad",
  "price": "35",
  "categoryId": "7366CC92-8C9E-417F-E0CD-08DD2D921ADC"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get By Id
### Method: GET
>```
>{{URI}}/courses/42BB4BE5-F057-4DCA-A591-08DD2D921B21
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Test
### Method: GET
>```
>http://localhost:5064/test
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get By Instructor
### Method: GET
>```
>{{URI}}/courses/instructor/10cf02c6-e906-4e92-bb00-2a1e44b2a008
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update
### Method: PUT
>```
>{{URI}}/courses
>```
### Body (**raw**)

```json
{
  "id": "e30b563c-b0fa-4058-b767-1d5c31bcee41",
  "name": "Docker",
  "description": "learn docker",
  "price": 30,
  "imageUrl": "str",
  "categoryId": "B52FE623-0B28-46DD-88C2-983A0C724990"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete
### Method: DELETE
>```
>{{URI}}/courses/C33B68DB-7778-43B8-8F69-8CFEFD269C9A
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All
### Method: GET
>```
>{{URI}}/courses?page=1&pageSize=10&searchTerm=React&categoryId=7366CC92-8C9E-417F-E0CD-08DD2D921ADC
>```
### Query Params

|Param|value|
|---|---|
|page|1|
|pageSize|10|
|searchTerm|React|
|categoryId|7366CC92-8C9E-417F-E0CD-08DD2D921ADC|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Purchased
### Method: GET
>```
>{{URI}}/courses/user/25989edf-3f2e-4f79-9598-e58c704ffd71/purchased
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________


## Collection: Orders

## End-point: Create
### Method: POST
>```
>{{URI}}/orders
>```
### Body (**raw**)

```json
{
  "orderItems": [
    {
      "courseId": "E30B563C-B0FA-4058-B767-1D5C31BCEE41",
      "price": 20
    },
    {
      "courseId": "ED573786-AE3E-4155-978E-9C98F4DD6079",
      "price": 50
    }
  ],
  "payment": {
    "cardType": "Visa",
    "last4Digits": "1234",
    "amount": 70
  }
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get By UserId
### Method: GET
>```
>{{URI}}/orders/user/10cf02c6-e906-4e92-bb00-2a1e44b2a008
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get By Id
### Method: GET
>```
>{{URI}}/orders/1EF87497-39EE-449D-BB12-0713CDD51D89
>```
### Body (**raw**)

```json
{
    "userId": "25989edf-3f2e-4f79-9598-e58c704ffd71",
    "orderItems": [
        {
            "courseId": "E30B563C-B0FA-4058-B767-1D5C31BCEE41",
            "price": 20
        },
        {
            "courseId": "4BF24F8C-5512-4B1B-B7C7-4C589E9B3760",
            "price": 20
        }
    ]
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________

## Collection: User

## End-point: Get By Id
### Method: GET
>```
>{{URI}}/users/10cf02c6-e906-4e92-bb00-2a1e44b2a008
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update
### Method: PUT
>```
>{{URI}}/users/10cf02c6-e906-4e92-bb00-2a1e44b2a008
>```
### Body (**raw**)

```json
{
    "userName": "InveonAcademy",
    "email": "inveon@academy.com",
    "phoneNumber": null,
    "city": "Istanbul"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{access_token}}|string|

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
The application provides API endpoints for user login functionality. The "Invony" user has specific instructor-level permissions.

For more details on the login process and other endpoints, use a tool like **Swagger** if integrated with the project.

---

Following these steps will ensure the project runs successfully. Remember to adjust your development environment settings as needed.

Happy coding!

