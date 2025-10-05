# Kanban Board API

A robust NestJS backend API for a Kanban board task management application with authentication, built with Prisma ORM and PostgreSQL database.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure login and registration
- **Task Management**: Full CRUD operations for tasks with different statuses
- **Database Integration**: PostgreSQL database with Prisma ORM
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Input Validation**: Class-validator for request validation
- **Security**: Password hashing with bcrypt
- **CORS Support**: Cross-origin resource sharing enabled
- **Type Safety**: Full TypeScript support
- **Code Quality**: ESLint and Prettier configuration

## 🏗️ Architecture

### Database Schema

The application uses PostgreSQL with the following models:

#### User Model

```prisma
model User {
  id       Int     @id @default(autoincrement())
  username String  @db.VarChar(100)
  email    String  @unique @db.VarChar(200)
  password String
  tasks    Task[]
}
```

#### Task Model

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(200)
  description String?  @db.Text
  status      Status   @default(todo)
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```

#### Status Enum

```prisma
enum Status {
  todo
  in_progress
  done
}
```

### API Endpoints

#### Authentication (`/api`)

- `POST /login` - User login
- `POST /signup` - User registration

#### Tasks (`/api/tasks`) - Protected routes

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get task by ID
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Project Structure

```
src/
├── auth/               # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.dto.ts
│   ├── auth.interface.ts
│   └── auth.module.ts
├── tasks/              # Tasks module
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── tasks.dto.ts
│   └── tasks.module.ts
├── common/             # Shared components
│   ├── guards/         # Authentication guards
│   ├── filters/        # Exception filters
│   ├── services/       # Database service
│   └── utils/          # Utility functions
├── app.module.ts       # Root module
└── main.ts            # Application entry point
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v13 or higher)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kanban-board-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
# Database Sample
DATABASE_URL="postgresql://username:password@localhost:5432/kanban_board_db"

use this
DATABASE_URL="postgresql://postgres:@localhost:5432/kanban_board_db"


# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Application
PORT=8000
```

**Important**: Replace the database credentials and JWT secret with your actual values.

### 4. Database Setup

#### Option A: Using Docker (Recommended)

If you have Docker installed, you can quickly set up PostgreSQL:

```bash
# Run PostgreSQL container
docker run --name kanban-postgres \
  -e POSTGRES_DB=kanban_board_db \
  -e POSTGRES_USER=your_username \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

#### Option B: Local PostgreSQL Installation

1. Install PostgreSQL on your system
2. Create a new database:
    ```sql
    CREATE DATABASE kanban_board_db;
    ```
3. Update the `DATABASE_URL` in your `.env` file with your credentials

### 5. Database Migration

Generate and apply the database schema:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) View your database
npx prisma studio
```

### 6. Start the Application

#### Development Mode

```bash
npm run start:dev
```

#### Production Mode

```bash
# Build the application
npm run build

# Start in production
npm run start:prod
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the application is running, you can access the interactive API documentation at:

```
http://localhost:8000/docs
```

This provides a complete Swagger UI where you can test all endpoints directly.

## 🧪 Testing the API

### 1. User Registration

```bash
curl -X POST http://localhost:8000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. User Login

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned JWT token for authenticated requests.

### 3. Create a Task

```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project setup",
    "description": "Set up the kanban board API",
    "status": "todo"
  }'
```

### 4. Get All Tasks

```bash
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run start:dev        # Start with hot reload
npm run start:debug      # Start with debug mode

# Building
npm run build           # Build for production
npm run start:prod      # Run production build

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier

# Testing
npm run test            # Run unit tests
npm run test:watch      # Run tests in watch mode
npm run test:cov        # Run tests with coverage
npm run test:e2e        # Run end-to-end tests

# Database
npx prisma studio       # Open Prisma Studio
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Run migrations in development
npx prisma migrate reset # Reset database
```

## 🛡️ Security Features

- **Password Security**: Passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using class-validator
- **CORS Protection**: Configurable CORS policies
- **Environment Variables**: Sensitive data stored in environment variables

## 📝 Technologies Used

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt
- **Language**: TypeScript

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
    - Verify PostgreSQL is running
    - Check DATABASE_URL in .env file
    - Ensure database exists

2. **Prisma Client Not Found**

    ```bash
    npx prisma generate
    ```

3. **Port Already in Use**
    - Change PORT in .env file
    - Or kill the process using the port

4. **JWT Token Issues**
    - Verify JWT_SECRET in .env file
    - Check token format in Authorization header

### Debug Mode

Run the application in debug mode for detailed logging:

```bash
npm run start:debug
```

## 📞 Support

For questions and support, please open an issue in the repository or contact the development team.
