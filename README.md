# Christy Bakery - BY JAPHETH NOMSI Semester 4

Welcome to the Christy Bakery web application! This platform provides an online storefront and administrative dashboard for managing bakery products, customer orders, and reservations.

## Features
- **Public Storefront:** Browse products, view details, and add items to the cart.
- **Checkout System:** Supports "Pay on Delivery" and instant online payments via **Paystack**.
- **Admin Dashboard:** Manage products, categories, orders, and customer inquiries.
- **Responsive Design:** Beautiful, mobile-friendly interface with Light and Dark mode support.

## Technologies Used
- **Backend:** Laravel 12 (PHP 8.2)
- **Frontend:** React 19 + Inertia.js v2
- **Styling:** Tailwind CSS v4
- **Database:** MySQL

---

## 🚀 Getting Started Locally

### Prerequisites
- PHP 8.2+
- Node.js (v18+)
- MySQL Database
- Composer

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cristy-backery
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install Node dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Copy the example `.env` file:
   ```bash
   cp .env.example .env
   ```
   Generate the application key:
   ```bash
   php artisan key:generate
   ```
   Configure your database credentials and **Paystack Keys** in the `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=christy_bakery
   DB_USERNAME=root
   DB_PASSWORD=
   
   PAYSTACK_PUBLIC_KEY=your_public_key
   PAYSTACK_SECRET_KEY=your_secret_key
   PAYSTACK_PAYMENT_URL=https://api.paystack.co
   ```

5. **Run Migrations and Seeders:**
   This will create the necessary database tables and populate it with sample products and the admin account.
   ```bash
   php artisan migrate:fresh --seed
   ```

---

## 👨‍💻 Running the Application

You need to run two servers simultaneously for the application to work correctly during development. Open two separate terminal windows in the project folder:

**Terminal 1 (Backend):**
```bash
php artisan serve
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

Visit the site at: `http://127.0.0.1:8000`

---

## 🔐 Default Admin Account

After running the database seeder (`php artisan migrate:fresh --seed`), you can log into the admin dashboard using the following credentials:

- **Email:** `iamchristy@gmail.com`
- **Password:** `SecurePassword123!`

---

## 💳 Testing Payments

For testing Paystack transactions during development, it is highly recommended to use your **Paystack Test Keys**. Using live keys will result in real charges. 

If testing with card payment simulators:
- A valid card structure usually processes successfully.
- Using CVV `999` is configured to simulate a failed transaction.

---

## 📝 Troubleshooting

**Vite Manifest Error (`Unable to locate file in Vite manifest`)**
Ensure that the Node development server is running (`npm run dev`) or compile the assets for production by running:
```bash
npm run build
```
