
# UnChain Backend

Backend repository for the **UnChain App**, providing core functionalities such as user authentication, data handling, and API services. Designed with scalability, security, and maintainability in mind.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **UnChain Backend** is a robust backend solution for UnChain App, built using modern web technologies. It is structured to ensure efficient performance while maintaining clean and readable code.

---

## Features

- **User Authentication:**
  - Secure login and registration.
  - Token-based authentication (JWT).
- **Data Management:**
  - CRUD operations for user data.
  - Data validation and error handling.
- **API Integration:**
  - RESTful APIs for frontend communication.
- **Security:**
  - CORS enabled for cross-origin requests.
  - Data encryption for sensitive information.

---

## Prerequisites

- **Node.js** (>= 16.x)
- **Docker** (for containerized deployment)
- **Prisma** (ORM for database handling)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RioBithub/unchain-backend.git
   cd unchain-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file at the root of the project and configure the necessary variables (refer to `.env.example` if provided).

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

---

## Usage

### Development Server
Start the development server with live reload:
```bash
npm run dev
```

### Production Build
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Docker
Build and run the containerized application:
```bash
docker build -t unchain-backend .
docker run -p 3000:3000 unchain-backend
```

---

## File Structure

- **/prisma:** Database schema and migrations.
- **/src:**
  - **auth.js:** Authentication logic (e.g., token creation and verification).
  - **routes:** API route handlers.
  - **controllers:** Business logic for handling requests.
  - **models:** Data models for database interactions.
- **Dockerfile:** Configuration for containerized deployment.
- **cloudbuild-dev.yaml:** CI/CD pipeline configuration for Google Cloud.

---

## API Documentation

For detailed API usage, please refer to the API documentation available at `/docs` (if Swagger is integrated) or in the project's wiki.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---
