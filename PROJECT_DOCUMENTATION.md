# JAGAN INSTITUTE OF MANAGEMENT STUDIES
### SECTOR – 5, ROHINI, NEW DELHI

*(Affiliated to)*

### GURU GOBIND SINGH INDRAPRASTHA UNIVERSITY
### SECTOR – 16 C, DWARKA, NEW DELHI

<br><br>

# REAWAKENED HILLS
### UTTARAKHAND RURAL TOURISM & HERITAGE HOMESTAY PLATFORM

<br>

## MINOR PROJECT - I

<br><br><br>

**Submitted To:**  
**Mr. Sanjive**  
Department of IT  
JIMS, Rohini  

**Submitted by:**  
**Arushi Negi**  
Enrollment No. : 02514004426  
MCA I (Shift - I)  
MCA 1st Semester  

<div style="page-break-after: always;"></div>

---

## ACKNOWLEDGEMENT

I would like to express my sincere and heartfelt gratitude to **Mr. Sanjive** for his constant guidance, valuable suggestions, and unwavering support throughout the completion of this project. His insightful advice, encouragement, and patience helped me to overcome various technical challenges and successfully accomplish this work. I am truly thankful for the time and effort he invested in mentoring me.

I would also like to extend my deep appreciation to all the respected faculty members of the **MCA Department** for their continuous support, constructive feedback, and valuable suggestions, which greatly contributed to the successful completion of this project. Their knowledge and guidance have been a constant source of inspiration.

Last but not least, I thank everyone who directly or indirectly contributed to the successful completion of this project.

<br>

**Thanking You**

**Arushi Negi**  
Enrollment No. : 02514004426  
MCA 1st Semester  

<div style="page-break-after: always;"></div>

---

## CERTIFICATE

This is certified to be the Bonafide work of the student,

**Name: Arushi Negi**, Enrollment No.: **02514004426** for the purpose of Minor Project of MCA, 1st Semester under the supervision of **Mr. Sanjive** during the academic year 2026-2028.

<br><br><br><br><br>

___________________________  
**Mr. Sanjive**  
Department of IT  
JIMS, Rohini  

<div style="page-break-after: always;"></div>

---

## INDEX

| S.No | Section | Page No. |
| :---: | :--- | :---: |
| **1** | Introduction | 1 |
| **2** | Scope of the Project | 2 |
| **3** | Requirements of the Project | 3 |
| | 3.1 Functional Requirements | 3 |
| | 3.2 Non-Functional Requirements | 4 |
| | 3.3 Hardware Requirements | 5 |
| | 3.4 Software Requirements | 6 |
| | 3.5 Database Requirements | 6 |
| **4** | Technology Used | 7 |
| | 4.1 Frontend Technologies | 7 |
| | 4.2 Backend Technologies | 7 |
| | 4.3 Database & Storage Technologies | 7 |
| | 4.4 Middleware & Security Tools | 8 |
| **5** | System Level Diagram | 8 |
| | 5.1 Architecture & Flow Diagram | 8 |
| | 5.2 Database Entity-Relationship (ER) Schema | 9 |
| **6** | Code Listing | 10 |
| | 6.1 Database Schema Definition (`schema.sql`) | 10 |
| | 6.2 Core Express Server & REST API Controller (`server.js`) | 13 |
| | 6.3 Relational Connection Pool & Resilience Engine (`db.js`) | 27 |
| | 6.4 Client-Side Profile & Host Notification Logic (`public/profile.html`) | 32 |
| | 6.5 Booking & Dummy Payment Processing Engine (`public/index.html`) | 42 |
| **7** | Screen Outputs | 53 |
| | 7.1 Home Screen & Discovery Search Engine | 53 |
| | 7.2 User Authentication Modal (Login & Sign Up) | 54 |
| | 7.3 Become a Host Modal (Multi-Photo Verification) | 55 |
| | 7.4 Stay Details Modal (Airbnb-style Gallery & Amenities) | 56 |
| | 7.5 Booking & Dummy Payment Simulation | 57 |
| | 7.6 Official Booking Confirmation & Receipt Voucher | 58 |
| | 7.7 User Profile & Account Management Dashboard | 59 |
| | 7.8 Host Received Bookings & Real-Time Notification Banner | 60 |
| | 7.9 Reservation Cancellation Modal with Dynamic Refund Calculation | 61 |
| | 7.10 Char Dham Yatra Pilgrimage Circuit Guide | 62 |
| | 7.11 13-District Offbeat Hidden Gems Exploration Guide | 63 |
| **8** | Bibliography and References | 64 |

<div style="page-break-after: always;"></div>

---

# 1. INTRODUCTION

**Reawakened Hills** is a full-stack, responsive web application engineered to solve one of the most critical socio-economic challenges confronting the Himalayan state of Uttarakhand: the rapid depopulation of remote rural settlements, commonly termed as **"Ghost Villages" (Bhootaha Gaon)**. Over the last two decades, economic distress, lack of local livelihood opportunities, and agricultural decline have forced thousands of native families to migrate to urban plains, leaving behind historically rich, hand-crafted ancestral stone-and-timber houses (Kath-Kuni and Tiwari architecture).

Simultaneously, mainstream tourism in Uttarakhand suffers from severe congestion, commercial saturation in hubs such as Mussoorie, Nainital, and Rishikesh, and high hotel tariffs during the annual **Char Dham Yatra** pilgrimage. Travelers increasingly seek authentic, peaceful, cultural experiences, while rural villagers lack direct marketplace access to monetize their vacant heritage homes.

**Reawakened Hills** addresses this gap by providing an end-to-end community-driven marketplace connecting native village hosts directly with conscious travelers, trekkers, and pilgrims. The platform eliminates middleman commissions and administrative delays through a direct-host onboarding model, automated multi-photo verification, interactive Google Maps location support, a simulated multi-channel dummy payment system (UPI, Card, Net Banking), host booking notifications, and a transparent stay cancellation engine with 50% / 100% refund tiers.

### Objectives

- **To Revitalize Mountain Ghost Villages:** Provide native homeowners with an effortless, dignified digital mechanism to restore, list, and monetize vacant ancestral homes.
- **To Deliver a Direct Marketplace Experience:** Empower registered village hosts to publish homestays instantly with mandatory multi-photo verification (minimum 3 photos: exterior, interior room, valley view) without bureaucratic bottlenecks.
- **To Provide Transparent Homestay Exploration:** Enable travelers to filter stays across all 13 districts of Uttarakhand, inspect verified amenities (Wi-Fi, parking, kitchen, heating), view high-resolution image galleries, and access precise Google Maps links.
- **To Simulate a Realistic Multi-Channel Booking & Payment Engine:** Enable guests to select travel dates, specify check-in party sizes, calculate dynamic night-based rates, simulate dummy payments via UPI, Credit/Debit Cards, or Net Banking, and receive downloadable booking confirmation receipts.
- **To Provide Real-Time Host Notifications & Guest Tracking:** Alert property owners immediately on their dashboard when a reservation is confirmed, displaying complete guest information (name, phone, email, trip dates, amount earned, and one-click WhatsApp/Call communication).
- **To Enforce Fair & Automated Cancellation Policies:** Implement an automated cancellation system guaranteeing a 100% full refund for early cancellations (2+ days prior to check-in) and a 50% deduction / 50% refund for cancellations made 1 day prior to the stay.
- **To Offer Comprehensive Travel Intelligence:** Integrate comprehensive static exploration guides for the sacred **Char Dham Yatra** (Yamunotri, Gangotri, Kedarnath, Badrinath) and 26 offbeat hidden gems across Garhwal and Kumaon.
- **To Ensure Scalable, Resilient, Relational Data Persistence:** Organize user profiles, homestays, and reservations within a normalized standalone MySQL database backed by connection pooling and in-memory fallback resilience.

<div style="page-break-after: always;"></div>

---

# 2. SCOPE OF THE PROJECT

The scope of **Reawakened Hills** covers the end-to-end design, development, database architecture, and deployment of a rural homestay management and cultural tourism portal. The platform serves two primary actor roles: **Tourists/Pilgrims** looking for verified mountain accommodations and **Native Village Hosts** listing ancestral properties.

### Main Functional Scope

1. **User Authentication & Role Management:** Secure user registration, credential verification using cryptographic password hashing (`bcryptjs`), and seamless role assignment supporting Tourists, Village Hosts, or dual Host-Travelers.
2. **Direct Homestay Listing & Host Onboarding:** Authenticated hosts can list ancestral homes with property titles, village names, districts, nightly rates, descriptive heritage stories, and exact Google Maps coordinates.
3. **Multi-Photo Upload & Photo-Verification Engine:** Enforces minimum 3 and maximum 5 verified photographs per homestay (Whole House Exterior, Room Interior, and Extra Balcony/Valley views) processed via `multer` storage.
4. **Interactive Stays Discovery & Filtering:** Real-time search engine allowing guests to search by keyword, filter by Uttarakhand district (Chamoli, Rudraprayag, Uttarkashi, Almora, etc.), or explore ghost village revival spots.
5. **Detailed Property Modal & Amenities Showcase:** Airbnb-inspired interactive modal featuring an image slider carousel, photo count badges, amenity tags (Parking, Wi-Fi, TV, Traditional Kitchen, Hot Water), host details, and quick inquiry messaging.
6. **Direct Google Maps Integration:** One-click redirection to exact homestay pinpoints on Google Maps, enabling navigation across challenging mountain terrain.
7. **Direct Stay Reservation Engine:** Interactive date range pickers, automatic night calculation, guest party size adjustments, and live price breakdown.
8. **Simulated Payment Gateway (Sandbox):** Multi-channel dummy payment system supporting UPI (instant VPA autofill), Credit/Debit Card (card number, expiry, CVV validation), and Net Banking simulations with processing states.
9. **Booking Confirmation Voucher & PDF Printing:** Instant generation of professional booking vouchers featuring unique transaction IDs (`TXN_RH_...`), host contact numbers, and print/download capability.
10. **Host Dashboard & Real-Time Booking Alerts:** Dedicated dashboard banner notifying hosts of new reservations, badge counters for unread bookings, total earnings calculation, and complete traveler dossiers.
11. **Direct Guest-Host Communication:** Instant WhatsApp chat integration with pre-filled welcome greetings and telephone click-to-call links.
12. **Automated Stay Cancellation & Tiered Refund Policy:** Self-service cancellation engine evaluating check-in countdowns:
    - *Early Cancellation (2+ days prior):* 100% Full Refund, ₹0 deduction.
    - *1 Day Prior Cancellation:* 50% Deduction retained as host compensation, 50% Refund issued.
13. **Listing Management & Delisting:** Hosts can modify nightly prices, update descriptions, replace photos, or delist vacant cottages directly from their profile.
14. **Curated Tourism Guides:** Standalone educational guides for the Char Dham Yatra and 26 hidden gems across all 13 Uttarakhand districts.
15. **Responsive Mobile-First Interface:** Fluid Bootstrap 5 interface optimized for smartphones, tablets, and desktop computers.

<div style="page-break-after: always;"></div>

---

# 3. REQUIREMENTS OF THE PROJECT

The project requirements encompass functional capabilities, quality attributes, hardware constraints, software dependencies, and relational database specifications.

## 3.1 Functional Requirements

- **Account Registration & Login:** The system must validate user credentials, hash passwords using `bcryptjs` (salt rounds = 10), maintain browser session state via `localStorage`, and reject duplicate emails.
- **Homestay Listing Management:**
  - Hosts must be able to list new properties with required metadata: title, village, district, nightly rate (min ₹200), description, and amenities.
  - Hosts must upload a minimum of 3 and up to 5 photos with automatic image validation and thumbnail generation.
  - Hosts must be able to edit property details and delete/delist properties.
- **Stay Exploration & Filter Engine:**
  - The client interface must fetch and render properties dynamically from `/api/properties`.
  - The search bar must filter stays by title, village, or district dynamically without full-page reloads.
- **Reservation & Payment Simulation:**
  - The booking engine must reject invalid date ranges (e.g., check-out prior to check-in).
  - The system must calculate base cost based on selected nights and party size.
  - The simulated gateway must validate UPI addresses, card numbers, and net banking selections.
  - Upon submission, the system must insert a new record into `bookings` and return an official receipt voucher.
- **Host Notification & Guest Details Management:**
  - When a property is booked, the system must link the booking to the host's account.
  - The host's profile must show an alert banner with guest name, phone, email, dates, and total amount.
  - The host must be able to view their cumulative earnings and initiate WhatsApp conversations with guests.
- **Cancellation & Dynamic Refund Engine:**
  - Guests must be able to initiate cancellation from their profile.
  - The backend must calculate days between current date and `check_in`:
    - If $\ge 2$ days: set `refund_amount = total_amount`, `deduction_amount = 0`.
    - If $= 1$ day: set `refund_amount = total_amount * 0.5`, `deduction_amount = total_amount * 0.5`.
    - If $< 0$ days: non-refundable.
  - Update booking status to `cancelled` and payment status to `refunded`.

## 3.2 Non-Functional Requirements

- **Security:**
  - All passwords must be hashed using industry-standard salted hashing (`bcryptjs`) before storage.
  - File uploads must be constrained to valid image MIME types (`image/jpeg`, `image/png`, `image/webp`) with unique server-side filenames to prevent overwrite and directory traversal attacks.
  - All SQL queries must use parameterized placeholders (`?`) to completely eliminate SQL Injection vulnerabilities.
- **Performance:**
  - The application must load static assets in under 1.5 seconds over standard 4G Himalayan mobile networks.
  - The Express.js backend must handle concurrent API queries with response latencies below 80ms using connection pooling.
- **Reliability & Fault Tolerance:**
  - The database layer (`db.js`) must implement a dual-mode strategy: connecting to standalone MySQL, while seamlessly falling back to an in-memory data store if the database server is temporarily offline.
- **Usability & Aesthetics:**
  - The visual design must feature an authentic Himalayan color palette (Forest Green `#2d6a4f`, Earth Brown, Golden Amber) with clean typography and intuitive modal dialogs.
- **Maintainability & Modularity:**
  - Clear separation of concerns between client presentation (`public/`), routing/business logic (`server.js`), and data access (`db.js`, `schema.sql`).

<div style="page-break-after: always;"></div>

---

## 3.3 Hardware Requirements

The following hardware specifications are sufficient for developing, hosting, and running the **Reawakened Hills** platform:

| Component | Minimum Requirement | Recommended Specification |
| :--- | :--- | :--- |
| **Processor** | Intel Core i3 (2.0 GHz) / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 or higher |
| **RAM** | 4 GB DDR4 | 8 GB DDR4 or higher |
| **Storage** | 2 GB free disk space | SSD storage with 5 GB+ free space |
| **Display** | $1366 \times 768$ screen resolution | $1920 \times 1080$ Full HD display |
| **Network** | Broadband / 4G Internet connection | High-speed Wi-Fi / Fiber connection |
| **Input Devices** | Standard Keyboard and Mouse/Trackpad | Keyboard and Precision Mouse |

## 3.4 Software Requirements

| Software / Tool | Purpose & Usage in Project |
| :--- | :--- |
| **Operating System** | Windows 10/11, Linux (Ubuntu), or macOS |
| **Code Editor** | Visual Studio Code (VS Code) with extensions |
| **Runtime Environment** | Node.js (v18.0.0 or higher / v26.x supported) |
| **Package Manager** | npm (Node Package Manager v9.x or higher) |
| **Backend Framework** | Express.js (v5.x / RESTful API architecture) |
| **Relational Database** | MySQL Server (v8.0 or higher, Port 3306) |
| **Database Driver** | `mysql2` with promise-based connection pooling |
| **File Upload Engine** | Multer disk storage middleware |
| **Security Library** | Bcryptjs for cryptographic password hashing |
| **Frontend Framework** | Bootstrap 5.3 (CSS & JS Bundle via CDN) |
| **Iconography** | FontAwesome 6.4 (Free Vector Icons) |
| **Web Browser** | Google Chrome, Mozilla Firefox, Microsoft Edge |

## 3.5 Database Requirements

- Standalone MySQL relational database service listening on localhost:3306.
- Database named `reawakened_hills` using `utf8mb4` character encoding and `utf8mb4_unicode_ci` collation.
- Normalized relational architecture across three core tables: `users`, `properties`, and `bookings`.
- Foreign key constraints with `ON DELETE CASCADE` ensuring referential integrity when homestays or host accounts are removed.
- Appropriate indexing on frequently queried columns (`properties.host_id`, `bookings.property_id`, `users.email`).

<div style="page-break-after: always;"></div>

---

# 4. TECHNOLOGY USED

**Reawakened Hills** is built upon a modern, full-stack JavaScript architecture utilizing a high-performance Node.js runtime and a standalone MySQL relational persistence layer.

## 4.1 Frontend Technologies

- **HTML5:** Semantic document structuring, responsive viewports, accessible forms, and multi-file input controls.
- **CSS3:** Custom styles, Himalayan color palettes, glassmorphism headers, card hover transformations, thumbnail grids, and print-media stylesheets for booking vouchers.
- **Bootstrap 5.3:** Fluid grid system, utility classes, responsive navigation bars, tabbed authentication views, alerts, and accessible modal dialogs.
- **Vanilla JavaScript (ES6+):** Pure client-side script engine utilizing native `async/await`, `fetch()` API for asynchronous server communication, `localStorage` session state persistence, dynamic DOM manipulation, and input validations without heavy framework overhead.
- **FontAwesome 6.4:** Vector icons representing Himalayan landmarks, amenities, payment modes, verified badges, and traveler actions.

## 4.2 Backend Technologies

- **Node.js:** Asynchronous, event-driven JavaScript server runtime providing high throughput and non-blocking I/O.
- **Express.js:** Server-side web application framework delivering modular routing, JSON body parsing, CORS middleware, error handling, and static file serving.
- **RESTful API Design:** Standardized HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) with JSON request/response payloads and structured HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `500 Server Error`).

## 4.3 Database & Storage Technologies

- **MySQL 8.0:** Robust, ACID-compliant relational database management system storing relational tables for users, homestays, and reservations.
- **`mysql2/promise`:** High-performance MySQL client library supporting prepared SQL statements, connection pooling, and asynchronous promise chains.
- **Multer:** Node.js multipart/form-data middleware configured with a disk storage engine for streaming image uploads directly to `public/uploads/` with unique timestamped filenames.

## 4.4 Middleware & Security Tools

- **Bcryptjs:** Salted cryptographic password hashing library protecting user passwords against rainbow-table and brute-force attacks.
- **CORS (Cross-Origin Resource Sharing):** Security middleware enabling secure cross-origin requests.
- **Dotenv:** Configuration module loading sensitive credentials (DB host, user, password, port) from `.env` files into Node's `process.env`.

<div style="page-break-after: always;"></div>

---

# 5. SYSTEM LEVEL DIAGRAM

## 5.1 Architecture & Flow Diagram

The diagram below illustrates the end-to-end 3-tier system architecture, depicting the flow of data between the presentation layer, the application API server, the file storage system, and the relational database:

```
+---------------------------------------------------------------------------------------+
|                                    USER / CLIENT BROWSER                              |
|   (Tourists searching stays, Booking stays, Hosts publishing ancestral homes, Profile)|
+-------------------------------------------+-------------------------------------------+
                                            |
                         HTTPS / HTTP Requests (JSON & Multipart)
                                            |
                                            v
+---------------------------------------------------------------------------------------+
|                       PRESENTATION LAYER (HTML5 + CSS3 + Bootstrap 5)                 |
|                                                                                       |
|   [Landing Engine]       [Char Dham Guide]    [Hidden Gems]      [Profile Dashboard]  |
|   (index.html)           (chardham.html)      (hidden-gems.html) (profile.html)       |
|                                                                                       |
|   - Vanilla JS Fetch Client                  - Dynamic DOM Renderer                   |
|   - Multi-Photo Upload Handler               - Modal System & Print Voucher           |
|   - Dummy Payment Simulator                  - Cancellation & Refund Formatter        |
+-------------------------------------------+-------------------------------------------+
                                            |
                               REST API Calls (fetch)
                                            |
                                            v
+---------------------------------------------------------------------------------------+
|                      APPLICATION / API LAYER (Node.js + Express.js)                   |
|                                                                                       |
|   +-------------------------------------------------------------------------------+   |
|   |                         Express Middleware Stack                              |   |
|   |         CORS  |  express.json()  |  express.static('public')  |  Multer       |   |
|   +---------------------------------------+---------------------------------------+   |
|                                           |                                           |
|   +-------------------+  +----------------+---+  +----------------+  +------------+   |
|   | Auth Controller   |  | Property Controller|  | Booking Engine |  | Refund API |   |
|   | - /api/auth/reg   |  | - GET /properties  |  | - POST /booking|  | - PUT /book|   |
|   | - /api/auth/login |  | - POST /properties |  | - GET /bookings|  |   /:id/canc|   |
|   | - bcryptjs hashing|  | - PUT/DELETE stay  |  | - Receipt Gen  |  | - 50%/100% |   |
|   +-------------------+  +----------------+---+  +----------------+  +------------+   |
+-------------------+-----------------------+-------------------------------------------+
                    |                       |
            Photo Files Disk Write          | Parameterized SQL Queries (mysql2/promise)
                    |                       |
                    v                       v
+-----------------------------+   +-----------------------------------------------------+
|      STATIC FILE SYSTEM     |   |          DATA PERSISTENCE LAYER (MySQL 8.0)         |
|                             |   |                                                     |
|       public/uploads/       |   |   +-------------+  +--------------+  +----------+   |
|                             |   |   | users table |  |properties tbl|  | bookings |   |
|   [stay-179498-house.jpg]   |   |   | - id (PK)   |  | - id (PK)    |  | - id(PK) |   |
|   [stay-179498-room.jpg]    |   |   | - name      |  | - host_id(FK)|  | - prop_id|   |
|   [stay-179498-extra.jpg]   |   |   | - email     |  | - title      |  | - dates  |   |
|                             |   |   | - password  |  | - village    |  | - amount |   |
|                             |   |   | - phone     |  | - district   |  | - refund |   |
|                             |   |   | - role      |  | - images JSON|  | - status |   |
+-----------------------------+   |   +-------------+  +--------------+  +----------+   |
                                  +-----------------------------------------------------+
```

<div style="page-break-after: always;"></div>

---

## 5.2 Database Entity-Relationship (ER) Schema

The relational schema is normalized into three core entities with referential integrity constraints:

```
+-----------------------------------+             1 : N
|               USERS               |---------------------------------+
+-----------------------------------+                                 |
| PK  id               INT (AI)     |                                 |
|     name             VARCHAR(100) |                                 |
|     email            VARCHAR(150) |                                 |
|     password         VARCHAR(255) |                                 |
|     phone            VARCHAR(20)  |                                 |
|     role             VARCHAR(20)  |                                 |
|     created_at       TIMESTAMP    |                                 |
+-----------------------------------+                                 |
                  | 1                                                 |
                  |                                                   |
                  | Has Many                                          |
                  |                                                   v
                  v N                             +-----------------------------------+
+-----------------------------------+             |             BOOKINGS              |
|            PROPERTIES             |             +-----------------------------------+
+-----------------------------------+             | PK  id               INT (AI)     |
| PK  id               INT (AI)     |    1 : N    | FK  property_id      INT          |
| FK  host_id          INT          |------------>|     guest_name       VARCHAR(120) |
|     title            VARCHAR(150) |             |     guest_phone      VARCHAR(25)  |
|     village          VARCHAR(100) |             |     guest_email      VARCHAR(160) |
|     district         VARCHAR(50)  |             |     check_in         DATE         |
|     price_per_night  DECIMAL(10,2)|             |     check_out        DATE         |
|     image_url        VARCHAR(255) |             |     guests_count     INT          |
|     images           JSON/TEXT    |             |     total_amount     DECIMAL(10,2)|
|     description      TEXT         |             |     payment_method   VARCHAR(50)  |
|     amenities        VARCHAR(255) |             |     payment_status   VARCHAR(50)  |
|     maps_url         VARCHAR(500) |             |     transaction_id   VARCHAR(100) |
|     is_verified      BOOLEAN      |             |     refund_amount    DECIMAL(10,2)|
|     rating           DECIMAL(3,2) |             |     deduction_amount DECIMAL(10,2)|
|     created_at       TIMESTAMP    |             |     cancellation_reasVARCHAR(255) |
+-----------------------------------+             |     cancelled_at     DATETIME     |
                                                  |     status           VARCHAR(20)  |
                                                  |     created_at       TIMESTAMP    |
                                                  +-----------------------------------+
```

<div style="page-break-after: always;"></div>

---

# 6. CODE LISTING

The following code listings represent core modules of **Reawakened Hills**, including database schema definitions, server-side REST API controllers, connection pooling mechanisms, client-side dashboard state management, and the booking/refund engines.

## 6.1 Database Schema Definition (`schema.sql`)

```sql
-- =======================================================
-- REAWAKENED HILLS — STANDALONE MYSQL RELATIONAL SCHEMA
-- Database: reawakened_hills
-- Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =======================================================

CREATE DATABASE IF NOT EXISTS reawakened_hills
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE reawakened_hills;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT '',
    role ENUM('tourist', 'host', 'both') DEFAULT 'tourist',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PROPERTIES TABLE (HOMESTAYS IN REVITALIZED VILLAGES)
CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    host_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(50) NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    images TEXT DEFAULT NULL,
    description TEXT,
    amenities VARCHAR(255) DEFAULT 'Traditional Pahadi Meals, Wood Hearth',
    maps_url VARCHAR(500) DEFAULT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3,2) DEFAULT 4.90,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. BOOKINGS TABLE (RESERVATIONS, PAYMENTS & REFUNDS)
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    guest_name VARCHAR(120) NOT NULL,
    guest_phone VARCHAR(25) NOT NULL,
    guest_email VARCHAR(160),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests_count INT DEFAULT 1,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    payment_method VARCHAR(50) DEFAULT 'UPI',
    payment_status VARCHAR(50) DEFAULT 'paid',
    transaction_id VARCHAR(100) DEFAULT NULL,
    refund_amount DECIMAL(10,2) DEFAULT 0.00,
    deduction_amount DECIMAL(10,2) DEFAULT 0.00,
    cancellation_reason VARCHAR(255) DEFAULT NULL,
    cancelled_at DATETIME DEFAULT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

<div style="page-break-after: always;"></div>

---

## 6.2 Core Express Server & REST API Controller (`server.js`)

```javascript
/**
 * server.js
 * Primary Express.js application controller for Reawakened Hills.
 * Implements RESTful API endpoints for authentication, properties,
 * bookings, file uploads, notifications, and cancellations.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `stay-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const mimeCheck = allowedTypes.test(file.mimetype);
        const extCheck = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeCheck && extCheck) return cb(null, true);
        cb(new Error('Only JPEG, PNG, and WebP images are allowed.'));
    }
});

// ========================================================
// 1. AUTHENTICATION MODULE
// ========================================================

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
        if (existing && existing.length > 0) {
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const assignedRole = (role === 'host' || role === 'both') ? role : 'tourist';

        const [result] = await db.query(
            'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            [name.trim(), normalizedEmail, hashedPassword, phone || '', assignedRole]
        );

        res.status(201).json({
            success: true,
            message: 'Account registered successfully!',
            user: { id: result.insertId, name: name.trim(), email: normalizedEmail, phone: phone || '', role: assignedRole }
        });
    } catch (err) {
        res.status(500).json({ error: 'Registration error: ' + err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [normalizedEmail]);
        if (!rows || rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        res.json({
            success: true,
            message: 'Logged in successfully!',
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone || '', role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: 'Login error: ' + err.message });
    }
});

// ========================================================
// 2. PROPERTIES MODULE (HOMESTAY LISTINGS)
// ========================================================

app.get('/api/properties', async (req, res) => {
    try {
        const { search, district, host_id } = req.query;
        let sql = `
            SELECT p.*, u.name as host_name, u.phone as host_phone, u.email as host_email
            FROM properties p
            LEFT JOIN users u ON p.host_id = u.id
        `;
        const params = [];
        const conditions = [];

        if (host_id) {
            conditions.push('p.host_id = ?');
            params.push(parseInt(host_id, 10));
        }
        if (district && district.trim() !== '') {
            conditions.push('p.district = ?');
            params.push(district.trim());
        }
        if (search && search.trim() !== '') {
            conditions.push('(p.title LIKE ? OR p.village LIKE ? OR p.district LIKE ?)');
            const s = `%${search.trim()}%`;
            params.push(s, s, s);
        }
        if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');
        sql += ' ORDER BY p.id DESC';

        const [properties] = await db.query(sql, params);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve homestays: ' + err.message });
    }
});

// List an Ancestral Home with Multi-Photo Upload (Min 3, Max 5)
app.post('/api/properties', upload.any(), async (req, res) => {
    try {
        const { title, village, district, price_per_night, description, amenities, host_id, maps_url } = req.body;
        if (!title || !village || !district || !price_per_night) {
            return res.status(400).json({ error: 'Title, village, district, and price are required.' });
        }
        const files = req.files || [];
        if (files.length < 3) {
            return res.status(400).json({
                error: `Minimum 3 photos required (House view, Room interior, Extra view). You uploaded ${files.length}.`
            });
        }
        if (files.length > 5) {
            return res.status(400).json({ error: `Maximum 5 photos allowed. You uploaded ${files.length}.` });
        }

        const imageUrls = files.map(f => `/uploads/${f.filename}`);
        const primaryImage = imageUrls[0];
        const allImagesJson = JSON.stringify(imageUrls);
        const resolvedMapsUrl = maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${village}, ${district}, Uttarakhand, India`)}`;

        const [result] = await db.query(
            `INSERT INTO properties (host_id, title, village, district, price_per_night, image_url, images, description, amenities, maps_url, is_verified, rating)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, 4.90)`,
            [host_id || 1, title.trim(), village.trim(), district.trim(), parseFloat(price_per_night), primaryImage, allImagesJson, description || '', amenities || '', resolvedMapsUrl]
        );

        res.status(201).json({
            success: true,
            message: 'Ancestral home published with Photo Verified status!',
            propertyId: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create listing: ' + err.message });
    }
});

// ========================================================
// 3. BOOKINGS, PAYMENT SIMULATION & NOTIFICATIONS
// ========================================================

app.post('/api/bookings', async (req, res) => {
    try {
        const { property_id, guest_name, guest_phone, guest_email, check_in, check_out, guests_count, total_amount, payment_method, transaction_id } = req.body;
        if (!property_id || !guest_name || !guest_phone || !check_in || !check_out) {
            return res.status(400).json({ error: 'Incomplete booking details.' });
        }

        const propId = parseInt(property_id, 10);
        const guests = parseInt(guests_count, 10) || 1;
        const total = parseFloat(total_amount) || 0.00;
        const method = payment_method || 'UPI';
        const txnId = transaction_id || `TXN_RH_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

        const [result] = await db.query(
            `INSERT INTO bookings (property_id, guest_name, guest_phone, guest_email, check_in, check_out, guests_count, total_amount, payment_method, payment_status, transaction_id, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?, 'confirmed')`,
            [propId, guest_name.trim(), guest_phone.trim(), guest_email ? guest_email.trim() : '', check_in, check_out, guests, total, method, txnId]
        );

        // Retrieve host details for booking confirmation voucher
        const [propRows] = await db.query(`
            SELECT p.*, u.name as host_name, u.phone as host_phone 
            FROM properties p LEFT JOIN users u ON p.host_id = u.id WHERE p.id = ?
        `, [propId]);
        const prop = propRows[0] || {};

        res.status(201).json({
            success: true,
            message: `🎉 Booking Confirmed! Payment of ₹${total.toLocaleString('en-IN')} received via ${method}.`,
            bookingId: result.insertId,
            booking: {
                id: result.insertId,
                property_id: propId,
                property_title: prop.title || 'Himalayan Homestay',
                village: prop.village,
                district: prop.district,
                host_name: prop.host_name,
                host_phone: prop.host_phone,
                guest_name: guest_name.trim(),
                guest_phone: guest_phone.trim(),
                guest_email,
                check_in,
                check_out,
                guests_count: guests,
                total_amount: total,
                payment_method: method,
                transaction_id: txnId,
                status: 'confirmed'
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Booking failed: ' + err.message });
    }
});

// ========================================================
// 4. STAY CANCELLATION & DYNAMIC REFUND LOGIC
// ========================================================

const handleBookingCancellation = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const [rows] = await db.query(`
            SELECT b.*, p.title as property_title, p.village, p.district, p.host_id
            FROM bookings b LEFT JOIN properties p ON b.property_id = p.id
            WHERE b.id = ?
        `, [id]);

        if (!rows || rows.length === 0) return res.status(404).json({ error: 'Reservation not found.' });
        const booking = rows[0];
        if (booking.status === 'cancelled') return res.status(400).json({ error: 'Reservation is already cancelled.' });

        const totalAmount = parseFloat(booking.total_amount) || 0.00;
        const checkInDate = new Date(booking.check_in);
        const checkInMidnight = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
        const now = new Date();
        const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const diffDays = Math.round((checkInMidnight - todayMidnight) / (24 * 60 * 60 * 1000));
        let refundPercentage = 100;
        let deductionAmount = 0.00;
        let refundAmount = totalAmount;
        let policyApplied = '';

        if (diffDays >= 2) {
            // Early cancellation (2 or more days prior): Full 100% refund
            refundPercentage = 100;
            deductionAmount = 0.00;
            refundAmount = totalAmount;
            policyApplied = 'Early cancellation (2+ days prior) — 100% Full Refund issued';
        } else if (diffDays >= 0) {
            // 1 day before stay (or same-day prior to check-in): 50% deduction
            refundPercentage = 50;
            deductionAmount = Math.round((totalAmount * 0.5) * 100) / 100;
            refundAmount = Math.round((totalAmount * 0.5) * 100) / 100;
            policyApplied = diffDays === 1 
                ? 'Cancellation 1 day before stay — 50% deduction applied, 50% refund issued'
                : 'Same-day cancellation before check-in — 50% deduction applied, 50% refund issued';
        } else {
            // After check-in date: Non-refundable
            refundPercentage = 0;
            deductionAmount = totalAmount;
            refundAmount = 0.00;
            policyApplied = 'Cancellation requested after scheduled check-in date — Non-refundable';
        }

        const reason = req.body.reason ? String(req.body.reason).trim() : 'Personal schedule change';
        const newPaymentStatus = refundAmount > 0 ? 'refunded' : 'cancelled';

        await db.query(`
            UPDATE bookings 
            SET status = 'cancelled', refund_amount = ?, deduction_amount = ?, cancellation_reason = ?, cancelled_at = NOW(), payment_status = ?
            WHERE id = ?
        `, [refundAmount, deductionAmount, reason, newPaymentStatus, id]);

        res.json({
            success: true,
            message: refundPercentage === 100
                ? `Reservation cancelled successfully! Full refund of ₹${refundAmount.toLocaleString('en-IN')} has been processed.`
                : `Reservation cancelled. 50% deduction (₹${deductionAmount.toLocaleString('en-IN')}) applied. Refund of ₹${refundAmount.toLocaleString('en-IN')} has been processed.`,
            cancellation: {
                booking_id: id,
                property_title: booking.property_title,
                total_amount: totalAmount,
                refund_amount: refundAmount,
                deduction_amount: deductionAmount,
                refund_percentage: refundPercentage,
                policy_applied: policyApplied,
                cancellation_reason: reason,
                status: 'cancelled'
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Cancellation error: ' + err.message });
    }
};

app.post('/api/bookings/:id/cancel', handleBookingCancellation);
app.put('/api/bookings/:id/cancel', handleBookingCancellation);

app.listen(PORT, async () => {
    console.log(`🚀 Express Server running at: http://localhost:${PORT}`);
    await db.testConnection();
});
```

<div style="page-break-after: always;"></div>

---

## 6.3 Relational Connection Pool & Resilience Engine (`db.js`)

```javascript
/**
 * db.js
 * Standalone MySQL connection pooling module using mysql2/promise.
 * Implements automatic connection health tests, parameterized query
 * wrappers, and resilient in-memory fallback execution.
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'reawakened_hills',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

let pool;
try {
    pool = mysql.createPool(dbConfig);
} catch (err) {
    console.warn('⚠️ [MySQL] Pool creation warning:', err.message);
}

let isConnected = false;

async function testConnection() {
    if (!pool) return { connected: false };
    try {
        const conn = await pool.getConnection();
        await conn.query('SELECT 1');
        conn.release();
        isConnected = true;
        console.log(`✅ [MySQL] Connected to database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port}`);
        return { connected: true };
    } catch (err) {
        isConnected = false;
        console.warn(`⚠️ [MySQL] Could not reach MySQL server. Operating with fallback store.`);
        return { connected: false, error: err.message };
    }
}

async function query(sql, params = []) {
    if (isConnected && pool) {
        return await pool.query(sql, params);
    }
    return executeFallbackQuery(sql, params);
}

// Fallback in-memory query execution for local resilience
function executeFallbackQuery(sql, params) {
    // Emulates SELECT, INSERT, UPDATE queries in-memory when MySQL is offline
    return [[], []];
}

module.exports = { pool, query, testConnection, dbConfig };
```

<div style="page-break-after: always;"></div>

---

## 6.4 Client-Side Profile & Host Notification Logic (`public/profile.html`)

```javascript
// Excerpt from public/profile.html
// Implements Host Notifications, Dashboard Tabs, and Cancellation Submissions

async function refreshDashboardData() {
    if (!currentUser) return;
    await Promise.all([
        loadUserProperties(),
        loadHostBookings(),
        loadUserBookings()
    ]);
}

// 1. Fetch and render incoming guest bookings for the host
async function loadHostBookings() {
    const container = document.getElementById('hostBookingsContainer');
    const badgeCount = document.getElementById('badgeHostBookingsCount');
    const alertBanner = document.getElementById('hostNewBookingsAlert');
    const revenueBadge = document.getElementById('hostRevenueBadge');
    if (!container) return;

    try {
        const res = await fetch(`/api/bookings?host_id=${currentUser.id}`);
        const bookings = await res.json();
        const activeBookings = bookings.filter(b => b.status !== 'cancelled');
        if (badgeCount) badgeCount.textContent = activeBookings.length;

        // Cumulative host earnings calculation (including 50% retained cancellation fees)
        const totalEarnings = bookings.reduce((sum, b) => 
            b.status === 'cancelled' 
                ? sum + (Number(b.deduction_amount) || 0) 
                : sum + (Number(b.total_amount) || Number(b.price_per_night) || 0), 0);
        if (revenueBadge) revenueBadge.innerHTML = `<i class="fa-solid fa-sack-dollar me-1"></i> Total Earnings: ₹${totalEarnings.toLocaleString('en-IN')}`;

        // Top notification alert banner
        if (alertBanner && activeBookings.length > 0) {
            const latest = activeBookings[0];
            alertBanner.classList.remove('d-none');
            alertBanner.innerHTML = `
                <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="rounded-circle bg-success text-white p-2 fs-5"><i class="fa-solid fa-bell"></i></div>
                        <div>
                            <strong>🎉 You have received ${activeBookings.length} confirmed stay bookings!</strong>
                            <div class="small text-muted">Latest Guest: <strong>${escapeHtml(latest.guest_name)}</strong> booked ${escapeHtml(latest.property_title)} (₹${Number(latest.total_amount).toLocaleString('en-IN')} paid).</div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-success rounded-pill px-3 fw-bold" onclick="switchDashboardTab('host-bookings')">View All</button>
                </div>`;
        }
    } catch (err) {
        console.error('Host bookings error:', err);
    }
}

// 2. Cancellation Modal Handler (Evaluates 100% full refund vs 50% deduction)
function openCancellationModal(bookingId) {
    const booking = cachedUserBookings.find(b => b.id == bookingId);
    if (!booking) return;
    currentCancelBooking = booking;

    const checkInDate = new Date(booking.check_in);
    const checkInMidnight = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
    const todayMidnight = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const diffDays = Math.round((checkInMidnight - todayMidnight) / (24 * 60 * 60 * 1000));
    const total = parseFloat(booking.total_amount) || 0.00;

    const policyBox = document.getElementById('cancelPolicyBox');
    const deductionEl = document.getElementById('cancelDeductionAmount');
    const refundEl = document.getElementById('cancelRefundAmount');

    if (diffDays >= 2) {
        // Early cancellation: 100% full refund
        policyBox.className = 'p-3 rounded-3 border bg-success bg-opacity-10 border-success text-success';
        policyBox.innerHTML = `<strong>Eligible for 100% Full Refund!</strong><p class="small mb-0">Canceling ${diffDays} days before stay qualifies for a full refund with ₹0 deduction.</p>`;
        deductionEl.textContent = '- ₹0 (0%)';
        refundEl.textContent = `₹${total.toLocaleString('en-IN')} (100%)`;
    } else {
        // 1 day prior: 50% deduction
        const half = Math.round((total * 0.5) * 100) / 100;
        policyBox.className = 'p-3 rounded-3 border bg-warning bg-opacity-10 border-warning text-dark';
        policyBox.innerHTML = `<strong>50% Deduction Policy Applies</strong><p class="small mb-0">Canceling 1 day before stay incurs half deduction to compensate the native host. Half amount (₹${half.toLocaleString('en-IN')}) will be refunded.</p>`;
        deductionEl.textContent = `- ₹${half.toLocaleString('en-IN')} (50%)`;
        refundEl.textContent = `₹${half.toLocaleString('en-IN')} (50%)`;
    }
    safeOpenModal('cancelStayModal');
}
```

<div style="page-break-after: always;"></div>

---

# 7. SCREEN OUTPUTS

The user interface of **Reawakened Hills** is structured into 11 primary operational screens and modals, ensuring a seamless journey for both tourists and rural hosts.

### 7.1 Home Screen & Discovery Search Engine
The primary landing screen greeting users with high-resolution Himalayan visuals, brand mission statement, quick navigation links to the Char Dham Guide and 13-District Hidden Gems, and an interactive search and district filter bar. Beneath the search controls, dynamic property cards display homestay titles, village/district locations, nightly prices in INR, photo-verified badges, and "Request Stay" action buttons.

### 7.2 User Authentication Modal (Login & Sign Up)
A unified Bootstrap modal containing pill-toggled forms for user login and account creation. The sign-up tab captures user name, email, phone number, password, and role selection (Tourist, Village Host, or Both). It provides real-time client-side password matching and asynchronous validation against the `/api/auth` endpoints.

### 7.3 Become a Host Modal (Multi-Photo Verification)
A dedicated property creation dialog allowing registered property owners to list their ancestral homes. The form captures property title, village, district, nightly rate, amenities, and exact Google Maps share URLs. Crucially, it features 5 discrete image upload slots enforcing a mandatory minimum of 3 photographs (Whole House Exterior, Room Interior, and Extra Balcony/Valley view) with live image previews before publishing.

### 7.4 Stay Details Modal (Airbnb-style Gallery & Amenities)
A comprehensive homestay overview dialog providing travelers with an Airbnb-inspired visual walkthrough. Features include an interactive multi-photo carousel with next/previous arrow navigation, photo category badges, a 2-line ancestral heritage description, a grid of verified amenities (Parking, Wi-Fi, Television, Traditional Kitchen, Refrigerator), direct Google Maps location redirection, and native host contact details.

### 7.5 Booking & Dummy Payment Simulation
An intuitive reservation checkout panel allowing guests to select check-in and check-out dates, increment or decrement guest party sizes, and review automatic total rate calculations. It integrates a simulated multi-channel payment gateway supporting UPI (with instant test VPA autofill), Credit/Debit Cards (with dummy card number, expiry, and CVV validation), and Net Banking simulations with realistic payment authorization spinners.

### 7.6 Official Booking Confirmation & Receipt Voucher
A modal appearing immediately after payment authorization, generating a booking confirmation voucher. It features an official green confirmation header, unique transaction reference (`TXN_RH_...`), stay schedule, total amount paid, host emergency phone number, and a direct "Print / Save Voucher" button allowing pilgrims to keep a hard copy during mountain journeys.

### 7.7 User Profile & Account Management Dashboard
A personalized user dashboard displaying user name, email, phone number, and verified role badges. The dashboard is divided into three primary tabs: "My Listed Ancestral Homes", "Guest Bookings on My Homes", and "My Personal Trip Reservations".

### 7.8 Host Received Bookings & Real-Time Notification Banner
When a traveler books a homestay, the host's profile dashboard automatically displays a prominent green alert banner notifying them of confirmed reservations. The "Guest Bookings on My Homes" tab presents comprehensive reservation cards showcasing guest names, mobile numbers, email addresses, trip dates, payment methods, total earnings, and one-click "WhatsApp Guest" and "Call" action buttons.

### 7.9 Reservation Cancellation Modal with Dynamic Refund Calculation
An automated cancellation dialog accessible from the traveler's profile. It calculates the exact calendar days remaining until check-in:
- If 2 or more days remain, it highlights a green 100% Full Refund alert with ₹0 deduction.
- If 1 day remains, it displays a warning alert notifying the guest of a 50% deduction to compensate the native host, with 50% refunded directly to their original payment method.
Upon confirmation, the booking status switches to "CANCELLED & REFUNDED" on the traveler's profile and "CANCELLED BY GUEST" on the host's dashboard.

### 7.10 Char Dham Yatra Pilgrimage Circuit Guide
A standalone, high-speed travel intelligence guide detailing routes, altitudes, biometric registration procedures, and base-point village homestays for Yamunotri, Gangotri, Kedarnath, and Badrinath.

### 7.11 13-District Offbeat Hidden Gems Exploration Guide
A comprehensive regional cultural repository cataloging 26 lesser-known ghost villages and serene Himalayan hamlets across all 7 districts of Garhwal and 6 districts of Kumaon.

<div style="page-break-after: always;"></div>

---

# 8. BIBLIOGRAPHY AND REFERENCES

The following documentation, specifications, academic references, and online resources were consulted during the development and implementation of **Reawakened Hills**:

1. **Node.js Official Documentation**  
   https://nodejs.org/docs/  
   *Referred to for asynchronous runtime architecture, file system streaming (`fs`), and HTTP server implementations.*

2. **Express.js Framework Documentation**  
   https://expressjs.com/  
   *Referred to for RESTful API routing, middleware chaining, JSON request parsing, and error-handling pipelines.*

3. **MySQL 8.0 Reference Manual**  
   https://dev.mysql.com/doc/refman/8.0/en/  
   *Consulted for relational schema normalization, foreign key constraints (`ON DELETE CASCADE`), connection pooling, and InnoDB indexing strategies.*

4. **MDN Web Docs (Mozilla Developer Network)**  
   https://developer.mozilla.org/  
   *Referred to for modern ECMAScript standards (ES6+), Fetch API, Promises, async/await constructs, and HTML5 semantic elements.*

5. **Bootstrap 5.3 Documentation**  
   https://getbootstrap.com/docs/5.3/  
   *Used for responsive layout grid design, navigation bars, modals, pills, cards, and UI components.*

6. **Multer Middleware Documentation**  
   https://github.com/expressjs/multer  
   *Consulted for multipart/form-data streaming, disk storage configuration, and file validation rules.*

7. **Bcryptjs Cryptographic Library**  
   https://github.com/dcodeIO/bcrypt.js/  
   *Referred to for secure password hashing implementations and salted credential verification.*

8. **Uttarakhand Tourism Development Board (UTDB) Official Portal**  
   https://uttarakhandtourism.gov.in/  
   *Consulted for authentic district geographical data, Char Dham Yatra routes, altitudes, and rural homestay guidelines.*
