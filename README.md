# Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with user authentication, role-based access control, and real-time inventory management.

## 🚀 Features

### Backend Features

- **JWT Authentication** with user and admin roles
- **RESTful API** for sweets management
- **Inventory Management** with purchase and restock operations
- **Search & Filter** functionality for sweets
- **MongoDB** database with Mongoose ODM
- **Test-Driven Development** with Jest and Supertest

### Frontend Features

- **React.js** with modern hooks and functional components
- **Redux Toolkit** for state management
- **React Router** for navigation
- **TailwindCSS** for responsive styling
- **Framer Motion** for smooth animations
- **Role-based UI** (User vs Admin dashboards)
- **Real-time updates** with Redux state management

## 🛠️ Tech Stack

### Backend

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Jest** + **Supertest** for testing
- **MongoDB Memory Server** for test database

### Frontend

- **React.js** (JSX)
- **Redux Toolkit** + **React Redux**
- **React Router DOM**
- **Axios** for API calls
- **TailwindCSS** + **Framer Motion**
- **React Testing Library** + **Jest** for testing

## 📁 Project Structure

```
sweet-shop/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── User.js            # User model
│   │   │   └── Sweet.js           # Sweet model
│   │   ├── routes/
│   │   │   ├── auth.routes.js     # Authentication routes
│   │   │   └── sweets.routes.js   # Sweets management routes
│   │   ├── seed/
│   │   │   └── seed.js            # Database seeding script
│   │   ├── app.js                 # Express app configuration
│   │   └── server.js              # Server entry point
│   ├── tests/
│   │   ├── auth.test.js           # Authentication tests
│   │   ├── sweets.test.js         # Sweets API tests
│   │   ├── inventory.test.js      # Inventory management tests
│   │   └── testSetup.js           # Test configuration
│   ├── jest.config.js             # Jest configuration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation component
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   ├── SearchBar.jsx      # Search functionality
│   │   │   └── SweetCard.jsx      # Sweet display card
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   └── AdminDashboard.jsx # Admin dashboard
│   │   ├── store/
│   │   │   ├── store.js           # Redux store configuration
│   │   │   └── slices/
│   │   │       ├── authSlice.js   # Authentication state
│   │   │       └── sweetsSlice.js # Sweets state management
│   │   ├── services/
│   │   │   ├── api.js             # Axios configuration
│   │   │   ├── authService.js     # Authentication API calls
│   │   │   └── sweetsService.js   # Sweets API calls
│   │   ├── test/
│   │   │   └── setup.js           # Test setup
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # App entry point
│   │   └── index.css              # Global styles
│   ├── jest.config.js             # Jest configuration
│   ├── tailwind.config.js         # TailwindCSS configuration
│   ├── vite.config.js             # Vite configuration
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sweet-shop
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   **Backend Environment:**
   Create a `.env` file in the backend directory:

   ```bash
   cd backend
   cp env.example .env
   ```

   Edit `backend/.env` file:

   ```env
   MONGODB_URI=mongodb://localhost:27017/sweet_shop
   JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

   **Frontend Environment (Optional):**
   Create a `.env` file in the frontend directory:

   ```bash
   cd frontend
   cp env.example .env
   ```

   Edit `frontend/.env` file if needed:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   _Note: The frontend will work with default settings if you don't create a .env file._

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Sweets Endpoints

#### Get All Sweets

```http
GET /api/sweets
```

#### Search Sweets

```http
GET /api/sweets/search?name=gulab&category=indian&priceMin=1&priceMax=10
```

#### Add Sweet (Admin Only)

```http
POST /api/sweets
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Gulab Jamun",
  "category": "Indian",
  "price": 5,
  "quantity": 20
}
```

#### Update Sweet (Admin Only)

```http
PUT /api/sweets/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "price": 6
}
```

#### Delete Sweet (Admin Only)

```http
DELETE /api/sweets/:id
Authorization: Bearer <jwt_token>
```

### Inventory Endpoints

#### Purchase Sweet

```http
POST /api/sweets/:id/purchase
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "quantity": 2
}
```

#### Restock Sweet (Admin Only)

```http
POST /api/sweets/:id/restock
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "quantity": 10
}
```

## 👥 User Roles

### User Role

- View all sweets
- Search and filter sweets
- Purchase sweets (decreases inventory)
- Cannot add, edit, or delete sweets

### Admin Role

- All user permissions
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory
- Full inventory management

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for enhanced UX
- **Modern UI**: TailwindCSS with custom color scheme
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Search & Filter**: Advanced filtering capabilities

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-based Access Control**: Different permissions for users and admins
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

