# Inveon Final Case Project

This document provides instructions on how to run the frontend project on your local machine and includes available user information. It also explains how to log in using the pre-defined users in the system.

## 1. Project Setup and Requirements

The frontend project is built using **Vite** and **pnpm** as the package manager. Ensure you have both installed on your system before proceeding.

### Install pnpm

```bash
npm install -g pnpm
```

### Clone the Project

```bash
git clone https://github.com/kemalege/inveon-final-case.git
git checkout frontend
cd InveonFinalCase.UI
```

### Install Dependencies

```bash
pnpm install
```

## 2. Running the Application

To start the development server, run the following command:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173` by default.

## 3. Available Users and Login

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

## 4. Application Screenshots

Below are the key pages of the application along with their screenshots:

- **Login Page**
  ![Login Page](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/login_ghdiel.png)
- **Register Page**
  ![Register Page](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/register_w2gtoc.png)
- **Course Search**
  ![Course Search](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/search_nr5eiy.png)
- **Course List**
  ![Course List](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117505/inveon-final-case/addtocart_ymnkns.png)
- **Course Detail**
  ![Course Detail](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/course_detail_ghf87c.png)
- **Cart**
  ![Cart](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117505/inveon-final-case/shopping_cart_pspdql.png)
- **Course Purchase**
  ![Course Purchase](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117505/inveon-final-case/payment_information_hgqhiq.png)
- **Order Successful**
  ![Order Successful](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117505/inveon-final-case/order_success_xeanff.png)
- **Order History**
  ![Order History](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117505/inveon-final-case/purchase_history_smcg5m.png)
- **User Profile Update**
  ![User Profile Update](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/edit_profile_srkifd.png)
- **User's Registered Courses**
  ![User Courses](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/learning_content_fuiur0.png)
- **Create Course (Instructor)**
  ![Create Course](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/create_course_s0tzri.png)
- **Update Course (Instructor)**
  ![Update Course](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117576/inveon-final-case/edit_course_fumc9b.png)
- **Instructor Panel**
  ![Instructor Panel](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117505/inveon-final-case/instructor_dashboard_vobjiw.png)
- **General Error Page**
  ![Error Page](https://res.cloudinary.com/djhvhao4u/image/upload/v1736118185/inveon-final-case/Error_jsozdj.png)
- **Dark Theme Example**
  ![Dark Theme](https://res.cloudinary.com/djhvhao4u/image/upload/v1736117506/inveon-final-case/home_page_dark_rhpccl.png)

## 5. Technologies Used

The following technologies and libraries are used in this project:

- **React** (with TypeScript)
- **Vite**
- **React Query**
- **Context API**
- **React Hook Form + Zod**
- **Tailwind CSS**
- **ShadCN**

## 6. Additional Notes

- Ensure `pnpm` is installed correctly before running the project.
- Default port for Vite is `5173`. If needed, it can be adjusted in the `vite.config.ts` file.
- Run `pnpm run build` to create a production-ready build.

---

Following these steps will ensure the project runs successfully. Remember to adjust your development environment settings as needed.

Happy coding!

