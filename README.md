🛒 MERN E-Commerce Web Application
Full-stack MERN e-commerce platform with user authentication, product browsing, cart, and wishlist. Frontend live, backend with MongoDB integration in progress.

✨ Features
👤 User (✅ Implemented)
Homepage: Header, Hero Carousel, Hot Picks, Categories

Header: Login, Cart, Wishlist navigation

Pages: Home, Account, Category, Login/Register, Product Detail, Wishlist

Cart functionality (add/remove/update)

🛠️ User (🔄 In Progress)

Place orders & order history


🛠️ Admin (🚀 Upcoming)

-> Admin dashboard & login

-> Product CRUD operations

-> User & order management

🧱 Tech Stack
Frontend: React.js, HTML5/CSS3, JavaScript (ES6+), Axios
Backend: Node.js, Express.js, MongoDB, JWT Authentication


📁 Project Structure
mern-ecommerce/
├── frontend/src/
│   ├── auth/ (AuthContext, ProtectedRoute)
│   ├── components/ (Header, HeroCarousel, HotPicks, Categories)
│   ├── context/ (CartContext, WishlistContext)
│   ├── pages/ (Home, Account, Category, Login, ProductDetail, Wishlist)
│   └── App.jsx
├── backend/src/
│   ├── config/, controllers/, models/, routes/
└── .env, package.json


⚙️ Setup Instructions
**Backend**

bash

cd backend

npm install

npm run dev  # http://localhost:8000


**Frontend**

bash

cd frontend

npm install

npm start    # http://localhost:3000


Environment Variables (backend/.env):
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

🔐 Authentication Flow (Planned)
JWT token on login/register

LocalStorage token persistence

Protected routes with middleware

📌 Roadmap

 -> Frontend UI & routing

 -> MongoDB + full API integration

 -> Cart & order system

 -> Payment gateway (Razorpay/Stripe)

 -> Product reviews & ratings

 -> Admin dashboard

👩‍💻 Author
Mounika -
BCA Graduate | Full-Stack Developer | HR Enthusiast |
LinkedIn - https://www.linkedin.com/in/yatam-mounika

📄 License
MIT License - For learning & demonstration purposes.

Repository: GitHub - https://github.com/mouni-891/react-ecommerce-app.git
