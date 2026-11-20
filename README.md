# 🏔️ Reawakened Hills
### Rural Homestay & Cultural Tourism Platform to Revitalize Ghost Villages in Uttarakhand

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

---

## 📌 Project Overview

**Reawakened Hills** is an end-to-end full-stack web application designed to counter the critical socio-economic crisis of **"Ghost Villages" (*Bhootaha Gaon*)** across Uttarakhand, India. Out-migration has left thousands of authentic, hand-crafted ancestral stone-and-timber houses (*Kath-Kuni* and *Tiwari* architecture) abandoned. 

At the same time, mainstream tourist hubs (Mussoorie, Nainital, Rishikesh) and the **Char Dham Yatra** pilgrimage circuit suffer from severe overcrowding and inflated commercial hotel tariffs.

**Reawakened Hills** connects conscious travelers, pilgrims, and trekkers directly with native mountain homeowners, empowering rural hosts to list, verify, and monetize their ancestral properties without middleman commissions.

---

## ✨ Key Features

- **🏡 Direct Host Onboarding (Airbnb Model):** Village homeowners can register and publish homestays in minutes.
- **📸 Mandatory Multi-Photo Verification:** Enforces a minimum of 3 (exterior, room, valley view) and maximum 5 verified photographs, automatically earning the **"Photo Verified"** trust badge.
- **🔍 Real-Time Stay Discovery:** Search by village name or filter across all **13 districts** of Uttarakhand (Chamoli, Rudraprayag, Uttarkashi, Almora, etc.) with instant DOM rendering.
- **🗺️ Direct Google Maps Navigation:** Built-in pinpoint links allowing travelers to navigate remote mountain routes easily.
- **💳 Multi-Channel Dummy Payment Simulation:** Interactive sandbox payment gateway supporting **UPI** (instant autofill), **Credit/Debit Cards** (card number & CVV validation), and **Net Banking**.
- **🧾 Instant Confirmation Receipt & Printable Voucher:** Automatically generates official booking vouchers (`#RH-BK-...`) with full host contacts, stay breakdown, and `@media print` styling for PDF downloads.
- **🔔 Real-Time Host Notification Dossier:** Host dashboard banner alerts property owners the moment a reservation is placed, complete with traveler contacts, earnings calculation, and one-click **WhatsApp / Call** buttons.
- **⏱️ Automated Tiered Cancellation & Refund Engine:**
  - **Early Notice (2+ days prior):** **100% Full Refund** (₹0 deduction).
  - **1 Day Prior / Same Day:** **50% Host Compensation Deduction**, **50% Refund**.
  - **Past Check-in Date:** Non-refundable.
- **🛕 Char Dham Yatra Pilgrim Guide:** Comprehensive travel intelligence for Yamunotri, Gangotri, Kedarnath, and Badrinath shrines.
- **🌄 13-District Offbeat Hidden Gems Guide:** Educational guide highlighting 26 lesser-known heritage villages (Mana, Bagori, Harsil, Khirsu, Sari, Chopta, Jageshwar).

---

## 🛠️ Tech Stack

- **Frontend:** Semantic HTML5, CSS3 Custom Properties, Bootstrap 5.3 CDN, FontAwesome 6 CDN, Google Fonts (*Plus Jakarta Sans*), Vanilla JavaScript (ES6+ `async/await`, Fetch API, LocalStorage).
- **Backend:** Node.js, Express.js 5.x RESTful API, CORS, Dotenv.
- **File Uploads:** `multer` disk storage engine with timestamped hashing and image MIME whitelist.
- **Authentication & Security:** `bcryptjs` salted password hashing (10 salt rounds), SQL injection mitigation via parameterized prepared statements.
- **Database:** Standalone MySQL 8.0 Server using `mysql2/promise` connection pooling with in-memory resilience failover.

---

## 📂 Project Structure

```text
UK_Tourism/
├── public/                     # Static client files (HTML, CSS, JS)
│   ├── uploads/                # Local verified property image store
│   ├── chardham.html           # Char Dham Pilgrimage Guide
│   ├── hidden-gems.html        # 13-District Offbeat Tourism Guide
│   ├── index.html              # Main Landing, Search & Booking Engine
│   ├── login.html              # User & Host Login Portal
│   ├── profile.html            # Host & Guest Dashboard
│   └── signup.html             # User Registration Portal
├── scripts/
│   └── init-db.js              # Database initialization & seeding script
├── .env.example                # Sample environment configuration
├── architecture.md             # System architecture & sequence diagrams
├── db.js                       # MySQL connection pool & failover engine
├── package.json                # Project dependencies and npm scripts
├── PROJECT_DOCUMENTATION.md    # Academic project report & documentation
├── schema.sql                  # MySQL schema DDL & seed records
└── server.js                   # Main Express application server
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) (v8.0+, Port 3306)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/reawakened-hills.git
cd reawakened-hills
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update `.env` with your local MySQL credentials:

```ini
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=reawakened_hills
DB_PORT=3306
```

### 4. Setup MySQL Database

Log into MySQL and execute `schema.sql`:

```bash
mysql -u root -p < schema.sql
```
*Or use npm script:*
```bash
npm run init-db
```

### 5. Run the Application

```bash
# Start server
npm start

# Or run with auto-reload (development)
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🗄️ Database Schema Summary

The relational schema consists of three normalized core tables:

1. **`users`**: User and host accounts (`id`, `name`, `email`, `password`, `phone`, `role`).
2. **`properties`**: Homestays in revived villages (`id`, `host_id`, `title`, `village`, `district`, `price_per_night`, `images`, `maps_url`, `is_verified`).
3. **`bookings`**: Stays reserved by travelers (`id`, `property_id`, `guest_name`, `check_in`, `check_out`, `total_amount`, `payment_method`, `refund_amount`, `status`).

---

## 📜 Academic Attribution

- **Project:** Minor Project - I (MCA 1st Semester)
- **Institution:** Jagan Institute of Management Studies (JIMS), Rohini, New Delhi
- **Affiliation:** Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi
- **Student:** Arushi Negi (Enrollment No.: 02514004426)
- **Supervisor:** Mr. Sanjive, Department of IT

---

## 📄 License

This project is licensed under the **ISC License**.
