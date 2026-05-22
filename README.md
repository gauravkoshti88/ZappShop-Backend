# ZappShop Backend

**E-commerce REST API with Secure Payment Processing & Admin Dashboard Integration** 🛒

---

## 📋 Overview

ZappShop Backend is a robust, production-ready Node.js REST API designed for a full-stack e-commerce platform. It provides secure product management, shopping cart functionality, order processing, and integrated payment gateway support. The backend is built with modern authentication, caching strategies, and cloud-based image hosting for optimal performance and scalability.

---

## ✨ Features

- **🔐 JWT Authentication**: Secure user sessions with JSON Web Tokens
- **👤 Role-Based Access Control**: User and Admin authentication middleware
- **🛍️ Product Management**: Full CRUD operations for products with filtering and search
- **🛒 Shopping Cart**: Add, update, remove items with real-time cart management
- **💳 Razorpay Integration**: Secure payment processing with webhook support
- **📦 Order Management**: Complete order lifecycle from creation to fulfillment
- **☁️ Cloudinary Integration**: Cloud-based image hosting for product photos
- **⚡ Redis Caching**: Performance optimization through intelligent caching
- **🤖 AI-Powered Features**: Google Generative AI integration for enhanced functionality
- **🔒 Security**: Helmet.js for HTTP headers, CORS configuration, input validation
- **🗄️ MongoDB Database**: Scalable NoSQL database for data persistence
- **📝 Password Hashing**: bcryptjs for secure password storage

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Caching**: Redis
- **Security**: Helmet.js, bcryptjs, CORS
- **File Handling**: Multer for file uploads

### External Services
- **Payment Gateway**: Razorpay
- **Cloud Storage**: Cloudinary
- **AI Integration**: Google Generative AI (Gemini)
- **Hosting**: Render

### Development Tools
- **Package Manager**: npm
- **Auto-reload**: Nodemon
- **Environment Config**: dotenv
- **Data Validation**: Validator.js

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Redis instance (local or cloud)
- Cloudinary account
- Razorpay account
- Google Generative AI API key

### Step 1: Clone the Repository
```bash
git clone https://github.com/gauravkoshti88/ZappShop-Backend.git
cd ZappShop-Backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=7000
NODE_ENV=development

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/zappshop

# JWT Secrets
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Redis
REDIS_URL=redis://localhost:6379

# Google Generative AI
GOOGLE_API_KEY=your_google_generative_ai_api_key

# Frontend URLs (CORS)
FRONTEND_URL_1=http://localhost:5173
FRONTEND_URL_2=http://localhost:5174
FRONTEND_URL_3=https://zappshop-ecommerce.vercel.app
FRONTEND_URL_4=https://zappshop-admin.vercel.app
```

### Step 4: Run the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will start on `http://localhost:7000`

---

## 📖 Usage

### API Base URL
- **Development**: `http://localhost:7000`
- **Production**: `https://zappshop-backend.render.com` (deployed on Render)

### Main API Endpoints

#### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user

#### Products
- `GET /product/all` - Get all products
- `GET /product/:id` - Get product by ID
- `POST /product/create` - Create new product (Admin)
- `PUT /product/:id` - Update product (Admin)
- `DELETE /product/:id` - Delete product (Admin)

#### Cart
- `GET /cart` - Get user cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/:id` - Update cart item quantity
- `DELETE /cart/:id` - Remove item from cart

#### Orders
- `POST /order/create` - Create new order
- `GET /order/:id` - Get order details
- `GET /order/user/all` - Get all user orders
- `POST /order/payment/verify` - Verify payment webhook

#### Admin
- `GET /admin/stats` - Get dashboard statistics
- `GET /admin/orders` - Get all orders
- `PUT /admin/order/:id` - Update order status

#### AI Features
- `POST /ai/generate` - Generate AI-powered content

### Demo Accounts

Since this is a development API, use any email/password combination for testing:
- **Regular User**: `user@example.com` / `password123`
- **Admin User**: `admin@example.com` / `adminpass123`

---

## 🌐 Live Demo & Deployment

### Frontend Applications
- **Main Store**: [ZappShop E-commerce](https://zappshop-ecommerce.vercel.app)
- **Admin Dashboard**: [ZappShop Admin](https://zappshop-admin.vercel.app)

### Backend API
- **API Base URL**: https://zappshop-backend.render.com (Deployed on Render)

---

## 📸 Screenshots

### API Documentation
Coming soon - Postman collection and Swagger documentation

### Database Schema
- User Model
- Product Model
- Cart Items
- Order Details
- Payment Records

---

## 📁 Folder Structure

```
ZappShop-Backend/
├── config/                  # Configuration files
│   ├── dbConnect.js        # MongoDB connection
│   ├── redis.js            # Redis client setup
│   └── token.js            # JWT token generation/verification
│
├── controller/              # Route controllers (business logic)
│   ├── authController.js   # Authentication logic
│   ├── userController.js   # User management
│   ├── productController.js # Product operations
│   ├── cartController.js   # Cart management
│   ├── orderController.js  # Order processing
│   ├── adminController.js  # Admin functions
│   └── aiController.js     # AI-powered features
│
├── middleware/              # Custom middleware
│   ├── isAuth.js           # User authentication check
│   ├── adminAuth.js        # Admin authorization check
│   └── multer.js           # File upload handling
│
├── model/                   # Mongoose schemas
│   ├── userModel.js        # User schema
│   ├── productModel.js     # Product schema
│   └── orderModel.js       # Order schema
│
├── routes/                  # API route definitions
│   ├── authRoutes.js       # Authentication endpoints
│   ├── userRoutes.js       # User endpoints
│   ├── productRoutes.js    # Product endpoints
│   ├── cartRoutes.js       # Cart endpoints
│   ├── orderRoutes.js      # Order endpoints
│   └── adminRoutes.js      # Admin endpoints
│
├── utils/                   # Utility functions
│
├── public/                  # Static files
│
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── index.js                # Main application entry point
└── README.md               # This file
```

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password encryption
- **CORS Configuration**: Restricted to specific frontend domains
- **Helmet.js**: HTTP header security
- **Input Validation**: Data validation using validator.js
- **Role-Based Access Control**: Middleware-based authorization
- **Environment Variables**: Sensitive data protected with .env

---

## 🚀 Performance Optimizations

- **Redis Caching**: Improved response times for frequently accessed data
- **MongoDB Indexing**: Optimized queries for faster data retrieval
- **Cloudinary CDN**: Globally distributed image delivery
- **Connection Pooling**: MongoDB connection pool management
- **Request Throttling**: Rate limiting to prevent abuse

---

## 📝 API Response Format

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Product Name",
    "price": 999
  },
  "message": "Operation successful"
}
```

### Error Response (4xx/5xx)
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Please login to continue"
}
```

---

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 🐛 Bug Reports & Issues

Found a bug? Have a suggestion? Please [open an issue](https://github.com/gauravkoshti88/ZappShop-Backend/issues) and include:
- Clear description of the bug/feature
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Environment details (Node version, OS, etc.)

---

## 📜 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 📞 Contact & Support

### Developer Information
- **Name**: Gaurav Koshti
- **GitHub**: [@gauravkoshti88](https://github.com/gauravkoshti88)
- **LinkedIn**: [Gaurav Koshti](https://linkedin.com/in/gauravkoshti88)

### Project Links
- **Frontend Repository**: [ZappShop-Frontend](https://github.com/gauravkoshti88/ZappShop-Frontend)
- **Admin Dashboard Repository**: [ZappShop-Admin](https://github.com/gauravkoshti88/ZappShop-Admin)
- **Live API**: https://zappshop-backend.render.com

---

## 🙏 Acknowledgments

- Express.js and Node.js communities
- MongoDB and Mongoose documentation
- Razorpay for payment processing
- Cloudinary for image hosting
- Google Generative AI for AI features
- All contributors and supporters

---

**Made with ❤️ by Gaurav Koshti**

⭐ If you found this project helpful, please consider giving it a star!
