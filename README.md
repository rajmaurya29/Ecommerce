# 🛒 Full-Stack E-Commerce Website

This is a **full-stack e-commerce application** built with **Django (backend)**, **React (frontend)**, and **PostgreSQL (database)**.  
It provides authentication, product management, cart system, order tracking, and an admin panel.

🌐 **Live Demo:** [E-Commerce Website](https://ecommerce-psi-rouge.vercel.app/)

---

## 🚀 Features

### 🔑 Authentication & Authorization
- User registration & login with JWT authentication (cookies based).
- Normal users and Admin users with different privileges.

### 👤 Normal User Features
- Browse products.
- Add products to cart.
- Place orders & view previous orders.
- Write and view reviews for products.
- See available stock.

### 👨‍💼 Admin Features
- Add, edit, and delete products.
- Manage users (promote to admin, remove users, edit user info).
- Manage product stock.
- View and delete reviews.

### 🛠️ Tech Stack
- **Frontend:** React, Redux Toolkit, Tailwind CSS, Framer Motion, Bootstrap
- **Backend:** Django, Django REST Framework (DRF), JWT (SimpleJWT)
- **Database:** PostgreSQL
- **Deployment:** Vercel (Frontend), Render(Backend), Neon(PostgresSQL)

---

## 🔑 Admin Panel Access
Explore the Django Admin Panel here:  
👉 [Admin Panel](https://ecommerce-psi-rouge.vercel.app/)

**Login Credentials:**  
- Username: `raj@gmail.com`  
- Password: `raj`  

(Use normal login form with these credentials to log in as admin.)

---

## ⚙️ Setup Instructions (Local Development)

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Backend Setup (Django):**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup (React):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables (.env):**  
   - Do **not** commit `.env` file to GitHub for security reasons.  
   - Example variables you may need:
     ```env
     SECRET_KEY=your_django_secret_key
     DEBUG=True
     DATABASE_URL=postgres://user:password@localhost:5432/dbname
     REACT_APP_API_URL=http://127.0.0.1:8000
     ```

---

## 📸 Screenshots

![Homepage](./screenshots/home.png)
![Product Page](./screenshots/product_detail.png)
![Cart Page](./screenshots/cart.png)
![Admin Panel (manage user)](./screenshots/admin_user.png)
![Admin Panel (manage product)](./screenshots/admin_product.png)
![Admin Panel (manage orders)](./screenshots/admin_order.png)

---

## 📌 Future Improvements
- Payment gateway integration (Stripe/PayPal).
- Wishlist functionality.
- Product categories & filters.

---

## 👨‍💻 Author
Developed by **Raj** ✨  
