# Inveon Final Case Project

This repository contains both the frontend and backend codebases for the Inveon Final Case Project. Below, you will find general information and links to the respective branches for setting up and running both the frontend and backend parts of the application.

## Project Overview

The Inveon Final Case Project is a full-stack web application designed for educational course management. It includes user roles such as instructors and students, course purchasing, and order history management.

---

## Project Structure

The repository is divided into two separate branches:

- **Frontend Branch:** Contains the React (Vite) project.
    - [Frontend Branch Link](https://github.com/kemalege/inveon-final-case/tree/frontend)
- **Backend Branch:** Contains the .NET Core API project.
    - [Backend Branch Link](https://github.com/kemalege/inveon-final-case/tree/backend)

---

## How to Clone and Access Branches

1. Clone the repository:
   ```bash
   git clone https://github.com/kemalege/inveon-final-case.git
   ```
2. Switch to the frontend branch:
   ```bash
   git checkout frontend
   ```
3. Switch to the backend branch:
   ```bash
   git checkout backend
   ```

---

## Technologies Used

- **Frontend:**
    - React (with TypeScript)
    - Vite
    - React Query
    - Context API
    - React Hook Form + Zod
    - Tailwind CSS
    - ShadCN


- **Backend:**
    - .NET Core (C#)
    - Entity Framework Core
    - MSSQL Database (Docker)
    - Microsoft.AspNetCore.Authentication.JwtBearer – 8.0.11
    - Microsoft.AspNetCore.Identity.EntityFrameworkCore – 8.0.11
    - Microsoft.AspNetCore.Identity.UI – 8.0.11
    - Microsoft.AspNetCore.OpenApi – 8.0.11
    - Microsoft.EntityFrameworkCore – 8.0.11
    - Microsoft.EntityFrameworkCore.SqlServer – 8.0.11
    - Microsoft.EntityFrameworkCore.Tools – 8.0.11
    - Swashbuckle.AspNetCore – 6.6.2
    - AutoMapper – 13.0.1
    - FluentValidation.AspNetCore – 11.3.0
    - MediatR – 12.4.1
    - Refit – 8.0.0

---

## Additional Notes

- Each branch (`frontend`, `backend`) contains a detailed `README.md` with project-specific setup instructions.
- Ensure you have both **pnpm** and **Docker** installed on your system to run the projects smoothly.

Happy coding!

