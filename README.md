# Fresh Fruit Store 🍎🥕🛒

A full-stack e-commerce web application for fresh fruits and vegetables.

## 📋 Project Structure

```
freshfruitstore/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # State management
│   │   ├── assets/         # Images, icons
│   │   └── utils/          # Helper functions
│   └── package.json
├── server/                 # Express Backend
│   ├── controllers/        # Route handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── package.json
├── shared/                # Shared utilities
└── README.md
```

## 🚀 Features

### Frontend (Client)
- [x] Responsive Navbar with authentication
- [ ] Hero Banner section
- [ ] Product categories display
- [ ] Best seller products
- [ ] Shopping cart functionality
- [ ] User authentication (login/register)
- [ ] Product search and filtering
- [ ] Order management
- [ ] Seller dashboard

### Backend (Server)
- [ ] REST API with Express.js
- [ ] MongoDB database integration
- [ ] JWT authentication
- [ ] File upload handling
- [ ] Order management system
- [ ] Admin/Seller management

## 🛠️ Tech Stack

**Frontend:**
- React 19.0.0
- React Router DOM 7.4.0
- Tailwind CSS 4.0.17
- Vite 6.3.6

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Server Setup
```bash
cd server
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

## 🌳 Git Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `client`: Frontend development
- `frontend/ui-components`: UI components
- `frontend/auth-system`: Authentication
- `frontend/product-pages`: Product features
- `frontend/cart-system`: Shopping cart
- `backend/api`: Backend API
- `backend/database`: Database models

### Development Timeline
1. **Week 1-2**: UI Components (Banner, Categories, BestSeller, Footer)
2. **Week 3**: Authentication System
3. **Week 4**: Product Pages & Search
4. **Week 5**: Cart & Checkout
5. **Week 6**: User Dashboard
6. **Week 7**: Seller Dashboard
7. **Week 8**: Backend Integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**VanHuy**
- GitHub: [@vanhuy2005](https://github.com/vanhuy2005)

---

⭐ Star this repo if you find it helpful!