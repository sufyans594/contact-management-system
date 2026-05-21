# Contact Management System

A full-stack web application for managing personal contacts, built with Java Spring Boot and React.js. Features JWT-based authentication, paginated contact management, and full CRUD operations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot |
| Security | Spring Security + JWT |
| Data Access | Spring Data JPA + Hibernate |
| Database | Microsoft SQL Server 2022 |
| Frontend | React.js + Vite |
| Testing | JUnit 5 + Mockito |
| Logging | SLF4J + Logback |
| Code Quality | SonarQube 9.9 |
| Version Control | Git / GitHub |

---

## Features

- User registration and login with JWT authentication
- Change password functionality
- Paginated contact listing with search and filter
- Create, update, and delete contacts
- Contact profiles with multiple emails and phone numbers (labeled by type)
- Global exception handling with structured error responses
- Application-wide logging (INFO, WARN, ERROR)
- 22 unit tests — all passing

---

## Project Structure

```
internship project/
│
├── backend/                        # Spring Boot Backend
│   └── src/
│       ├── main/java/com/example/backend/
│       │   ├── config/
│       │   │   ├── JwtFilter.java
│       │   │   └── SecurityConfig.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   └── ContactController.java
│       │   ├── dto/
│       │   │   ├── AuthResponse.java
│       │   │   ├── ChangePasswordRequest.java
│       │   │   ├── ContactRequest.java
│       │   │   ├── LoginRequest.java
│       │   │   ├── RegisterRequest.java
│       │   │   └── UserDto.java
│       │   ├── entity/
│       │   │   ├── Contact.java
│       │   │   ├── ContactEmail.java
│       │   │   ├── ContactPhone.java
│       │   │   └── User.java
│       │   ├── exception/
│       │   │   ├── ErrorResponse.java
│       │   │   └── GlobalExceptionHandler.java
│       │   ├── repository/
│       │   │   ├── ContactRepository.java
│       │   │   └── UserRepository.java
│       │   ├── service/
│       │   │   ├── AuthService.java
│       │   │   └── ContactService.java
│       │   ├── util/
│       │   └── BackendApplication.java
│       └── test/java/com/example/backend/
│           ├── service/
│           │   ├── AuthServiceTest.java
│           │   └── ContactServiceTest.java
│           └── BackendApplicationTests.java
│
└── contact-management-frontend/    # React Frontend
    └── src/
        ├── api/
        │   └── axiosInstance.js
        ├── components/
        │   ├── ContactModal.jsx
        │   ├── DeleteConfirmModal.jsx
        │   ├── LogoutConfirmModal.jsx
        │   ├── Navbar.jsx
        │   └── PrivateRoute.jsx
        ├── context/
        ├── pages/
        │   ├── ContactsPage.jsx
        │   ├── LoginPage.jsx
        │   ├── ProfilePage.jsx
        │   └── RegisterPage.jsx
        ├── utils/
        ├── App.jsx
        └── main.jsx
```

---

## Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js 18+
- Microsoft SQL Server (or Docker)
- Git

---

### Database Setup

Start SQL Server via Docker:

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourPassword123" \
  -p 1433:1433 --name sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

Create a database named `contact_db` in SQL Server.

---

### Backend Setup

```bash
cd backend
```

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=contact_db;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=YourPassword123
spring.jpa.hibernate.ddl-auto=update

jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend starts at: `http://localhost:8080`

---

### Frontend Setup

```bash
cd contact-management-frontend
npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

---

## Running Tests

```bash
cd backend
mvn test
```

**Test Results:**

| Test Suite | Tests | Failures | Errors |
|---|---|---|---|
| AuthServiceTest | 11 | 0 | 0 |
| ContactServiceTest | 11 | 0 | 0 |
| **Total** | **22** | **0** | **0** |

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| PUT | `/api/auth/change-password` | Change user password |
| GET | `/api/auth/me` | Get current user info |

### Contacts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/contacts` | Get paginated contact list |
| POST | `/api/contacts` | Create a new contact |
| PUT | `/api/contacts/{id}` | Update a contact |
| DELETE | `/api/contacts/{id}` | Delete a contact |
| GET | `/api/contacts/{id}` | Get contact details |

> All contact endpoints require a valid JWT token in the `Authorization: Bearer <token>` header.

---

## Code Quality — SonarQube

Scanned using SonarQube 9.9 LTS Community Edition.

| Metric | Result | Rating |
|---|---|---|
| Quality Gate | Passed | — |
| Bugs | 0 | A |
| Vulnerabilities | 0 | A |
| Code Smells | 13 | A |
| Technical Debt | 2h 55min | A |
| Duplications | 0.0% | A |

To run a scan locally:

```bash
# Start SonarQube
docker run -d --name sonarqube -p 9000:9000 \
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
  sonarqube:9.9-community

# Run scan from backend folder
mvn sonar:sonar \
  -Dsonar.projectKey=contact-management-system \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=YOUR_TOKEN
```

---

## Author

**Sufyan Sajid**
BS Software Engineering — Shifa Tameer-e-Millat University
- GitHub: [github.com/sufyans594](https://github.com/sufyans594)
- LinkedIn: [linkedin.com/in/sufyan-sajid-304a70307](https://linkedin.com/in/sufyan-sajid-304a70307)

---

## License

This project was developed as part of an internship. All rights reserved.
# contact-management-system
