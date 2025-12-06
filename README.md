# NestJS Task Management API

A production-ready RESTful API built with **NestJS**, **PostgreSQL**, and **TypeORM**. This project demonstrates a scalable backend architecture with JWT-based authentication, strict validation, modular design, and unit testing.

---

## 🚀 Features

* **Authentication & Authorization**
  Secure User Sign-up and Sign-in using **JWT** and **BCrypt** password hashing.

* **Task Management**
  Full CRUD operations (Create, Read, Update, Delete) for managing tasks.

* **Data Ownership**
  Each user can access and modify **only their own tasks**.

* **Validation**
  DTO-based validation using `class-validator` and pipes for data integrity.

* **Database**
  Persistent storage via **PostgreSQL** with TypeORM Data Mapper pattern.

* **Testing**
  Unit tests for business logic using **Jest** with repository mocks.

* **Containerization**
  Docker Compose setup for seamless PostgreSQL provisioning.

---

## 🛠 Tech Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Authentication:** Passport.js & JWT Strategy
* **Containerization:** Docker, Docker Compose
* **Testing:** Jest

---

## ⚙️ Prerequisites

Ensure the following are installed:

* Node.js (v14 or higher)
* npm or yarn
* Docker Desktop (for PostgreSQL container)

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KalyadapuVamshiKrishna/backend_api
cd backend_api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Recommended default configuration:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_DATABASE=taskmanagement
JWT_SECRET=supersecretkey123
```

### 4. Start the Database Using Docker

```bash
docker-compose up -d
```

Check the container status:

```bash
docker ps
```

---

## ▶️ Running the Application

### Development Mode (Hot Reload)

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

API runs at:

```
http://localhost:3000
```

---

## 🧪 Running Tests

The project includes Jest-based unit tests with mocked database repositories.

```bash
# Run unit tests
npm run test

# Run tests with coverage report
npm run test:cov
```

---

## 📡 API Endpoints

### **Auth Routes**

| Method | Endpoint     | Description           | Body                                       |
| ------ | ------------ | --------------------- | ------------------------------------------ |
| POST   | /auth/signup | Register a new user   | `{ "username": "...", "password": "..." }` |
| POST   | /auth/signin | Login and receive JWT | `{ "username": "...", "password": "..." }` |

---

### **Task Routes (Protected)**

All task routes require a valid **Bearer Token**.

| Method | Endpoint          | Description        | Body                                       |               |           |
| ------ | ----------------- | ------------------ | ------------------------------------------ | ------------- | --------- |
| GET    | /tasks            | Get all tasks      | -                                          |               |           |
| GET    | /tasks/:id        | Get specific task  | -                                          |               |           |
| POST   | /tasks            | Create a task      | `{ "title": "...", "description": "..." }` |               |           |
| DELETE | /tasks/:id        | Delete a task      | -                                          |               |           |
| PATCH  | /tasks/:id/status | Update task status | `{ "status": "OPEN"                        | "IN_PROGRESS" | "DONE" }` |

---

## 🏗 Architecture & Design

### **Modular Monolith**

Code structured into feature modules:

* `AuthModule`
* `TasksModule`

Ensures separation of concerns and maintainability.

### **Repository Pattern + TypeORM**

Business logic and persistence logic are cleanly decoupled.

### **DTOs & Validation**

DTOs ensure only valid data reaches controllers, improving reliability and preventing runtime errors.

### **Security Measures**

* Password hashing using **bcrypt + salt**.
* Stateless authentication using **JWT**.
* Route protection using **AuthGuard** and Passport strategies.

---

## 👤 Author

**Vamshi Krishna**
GitHub: [@kalyadapuvamshikrishna](https://github.com/kalyadapuvamshikrishna)

---
