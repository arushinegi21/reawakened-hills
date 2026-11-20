# Reawakened Hills — System Architecture Document

Comprehensive architectural specifications for **Reawakened Hills**, a rural homestay and tourism platform dedicated to revitalizing "ghost villages" in Uttarakhand.

---

## 1. Architectural Overview & Design Philosophy

Reawakened Hills is engineered around a **Decoupled 3-Tier Layered Architecture** with a lightweight, high-performance footprint:

```mermaid
graph TD
    subgraph ClientLayer ["1. Presentation Layer (Browser Client)"]
        UI_Home["Landing & Discovery Engine<br>(index.html)"]
        UI_Dham["Char Dham Pilgrim Guide<br>(chardham.html)"]
        UI_Gems["13-District Offbeat Guide<br>(hidden-gems.html)"]
        UI_ClientJS["Vanilla JS State & Fetch Client<br>(Session, Modals, Dynamic DOM)"]
    end

    subgraph ServerLayer ["2. Application / API Layer (Node.js & Express.js)"]
        Router["Express Router & Static Middleware"]
        AuthModule["Auth Service<br>(bcryptjs Password Hashing)"]
        PropertyModule["Property Service<br>(Multer File Uploads & Metadata)"]
        BookingModule["Booking Service<br>(Reservation Engine)"]
        UploadStorage["Local File Store<br>(public/uploads/)"]
    end

    subgraph DataLayer ["3. Data Persistence Layer (Standalone MySQL)"]
        Pool["mysql2/promise Connection Pool"]
        DB_Users[("users Table")]
        DB_Props[("properties Table")]
        DB_Bookings[("bookings Table")]
    end

    UI_ClientJS -->|REST API / JSON| Router
    UI_Home -->|Static HTML/CSS| Router
    UI_Dham -->|Static HTML/CSS| Router
    UI_Gems -->|Static HTML/CSS| Router

    Router --> AuthModule
    Router --> PropertyModule
    Router --> BookingModule

    PropertyModule -->|Save Photos| UploadStorage
    AuthModule -->|Query/Insert| Pool
    PropertyModule -->|Query/Insert| Pool
    BookingModule -->|Query/Insert| Pool

    Pool --> DB_Users
    Pool --> DB_Props
    Pool --> DB_Bookings
```

### Core Design Principles
1. **Zero Bloat & High Speed**: Pure Vanilla JavaScript with the native `fetch()` API eliminates front-end framework overhead (no React/Angular/Vue build pipelines), ensuring instantaneous load times on low-bandwidth rural Himalayan mobile connections.
2. **Modern Marketplace Model (No Public Admin Bottleneck)**: Following Airbnb's host-empowerment paradigm, registered and authenticated hosts can instantly publish listings for their vacant ancestral homes. Listings immediately earn the "Photo Verified" trust badge upon validation.
3. **Resilient Data Access**: The database adapter uses `mysql2/promise` connection pooling with automatic keep-alive, parameterized queries (SQL injection prevention), and graceful startup handling.
4. **Clean Static Guide Integration**: Dedicated, high-speed static guides for the holy Char Dham circuit and all 13 districts' offbeat gems enrich SEO, educate travelers, and funnel bookings into rural village communities.

---

## 2. Layered Component Architecture

### 2.1 Presentation Layer (Frontend)
- **Framework & Styling**: HTML5, Modern CSS3 custom variables, Bootstrap 5.3 CDN, FontAwesome 6 CDN, and Google Font *Plus Jakarta Sans*.
- **Aesthetics**: Warm, earthy Himalayan color palette:
  - Deep Forest Green (`#1b4332`, `#2d6a4f`)
  - Warm Terracotta / Earth (`#8b5a2b`, `#d4a373`)
  - Clean Off-White Canvas (`#f8f9fa`, `#ffffff`)
- **Interactive Modals**:
  1. **Authentication Modal**: Tabbed registration and login interface with input sanitization and token persistence.
  2. **Become a Host Modal**: File input with image preview, property title, village, district, and nightly pricing.
  3. **Request Stay Modal**: Guest contact details, check-in/check-out dates, and instant confirmation feedback.
- **Client Scripting**: Modular Vanilla JS event handlers handling asynchronous `fetch()` requests, dynamic DOM card generation, and real-time search filtering.

### 2.2 Application / API Layer (Backend)
- **Runtime**: Node.js (v18+) with Express.js.
- **Middleware Pipeline**:
  - `cors()`: Cross-Origin Resource Sharing enablement.
  - `express.json()` & `express.urlencoded()`: Body parsing for JSON and form inputs.
  - `express.static('public')`: High-performance static asset streaming.
- **File Upload Engine (`multer`)**:
  - Disk storage configuration saving to `public/uploads/`.
  - Secure filename generator: `stay-[timestamp]-[random-hash].[ext]`.
  - MIME-type whitelist restricting uploads to `image/jpeg`, `image/png`, `image/webp`.
- **Security & Cryptography (`bcryptjs`)**:
  - One-way password hashing using standard 10 salt rounds.
  - Safe timing-attack resistant password verification via `bcryptjs.compare()`.

### 2.3 Data Layer (Persistence)
- **Database Engine**: Standalone MySQL 8.0 Community Server.
- **Driver**: `mysql2/promise` utilizing connection pools (`createPool`).
- **Connection Configuration**:
  - Pool size: 10 connections.
  - `waitForConnections: true`
  - `queueLimit: 0`
  - Parameterized prepared statements across all queries.

---

## 3. Entity-Relationship (ER) Architecture

```mermaid
erDiagram
    USERS ||--o{ PROPERTIES : "hosts / owns"
    PROPERTIES ||--o{ BOOKINGS : "receives"

    USERS {
        int id PK "AUTO_INCREMENT"
        varchar name "Full Name"
        varchar email UK "Unique Email or Mobile"
        varchar password "Bcrypt Hashed Password"
        varchar phone "Contact Phone"
        varchar role "host | tourist | both"
        datetime created_at "Registration Timestamp"
    }

    PROPERTIES {
        int id PK "AUTO_INCREMENT"
        int host_id FK "References USERS(id)"
        varchar title "Listing Title"
        varchar village "Village Name"
        varchar district "District Name"
        decimal price_per_night "Rate in INR (₹)"
        text image_url "Relative path or primary photo URL"
        text images "JSON serialized array of uploaded photos (min 3, max 5)"
        text description "Property features & heritage"
        boolean is_verified "Photo Verified Trust Badge"
        decimal rating "Aggregated Guest Rating"
        datetime created_at "Creation Timestamp"
    }

    BOOKINGS {
        int id PK "AUTO_INCREMENT"
        int property_id FK "References PROPERTIES(id)"
        varchar guest_name "Guest Full Name"
        varchar guest_phone "Guest Contact Number"
        varchar guest_email "Guest Email (optional)"
        date check_in "Arrival Date"
        date check_out "Departure Date"
        varchar status "pending | confirmed | cancelled"
        datetime created_at "Request Timestamp"
    }
```

---

## 4. Key Dynamic Interaction Flows

### 4.1 Host Listing Creation Flow
```mermaid
sequenceDiagram
    autonumber
    actor Host as Local Village Host
    participant Browser as Client Browser (Vanilla JS)
    participant Server as Express Server (server.js)
    participant Disk as Local Disk (public/uploads/)
    participant DB as MySQL Database

    Host->>Browser: Clicks "Become a Host"
    Browser->>Browser: Checks session state in localStorage
    alt Not Logged In
        Browser->>Host: Prompts to Log In / Register first
    else Logged In
        Host->>Browser: Selects 3 to 5 Photos (Whole House, Room, Extra View) & Details
        Browser->>Browser: Validates min 3 and max 5 files in UI
        Browser->>Server: POST /api/properties (multipart/form-data)
        Server->>Server: Validates file count (3 <= count <= 5)
        Server->>Disk: Writes image files to public/uploads/
        Server->>DB: INSERT INTO properties (host_id, title, village, district, price, image_url, images, is_verified)
        DB-->>Server: Return insertId
        Server-->>Browser: HTTP 201 Created (Property JSON with image array)
        Browser->>Browser: Prepend new card to homestay grid with "Photo Verified" and photo count badge
        Browser->>Host: Display success alert / notification
    end
```

### 4.2 Tourist Discovery & Booking Flow
```mermaid
sequenceDiagram
    autonumber
    actor Tourist as Traveler / Pilgrim
    participant Browser as Client Browser
    participant Server as Express Server
    participant DB as MySQL Database

    Tourist->>Browser: Loads Reawakened Hills homepage
    Browser->>Server: GET /api/properties
    Server->>DB: SELECT * FROM properties ORDER BY id DESC
    DB-->>Server: Array of active homestay records
    Server-->>Browser: JSON Array of properties
    Browser->>Browser: Render responsive stay cards

    Tourist->>Browser: Enters "Mana" in Search Bar
    Browser->>Server: GET /api/properties?search=Mana
    Server->>DB: SELECT * FROM properties WHERE village LIKE ? OR district LIKE ?
    DB-->>Server: Filtered records
    Server-->>Browser: Filtered JSON Array
    Browser->>Browser: Re-renders filtered cards dynamically

    Tourist->>Browser: Clicks "Request Stay" on Mana cottage
    Browser->>Browser: Opens Booking Modal with Property ID & Name prefilled
    Tourist->>Browser: Fills Guest Name, Phone, Check-in & Check-out dates
    Browser->>Server: POST /api/bookings (JSON payload)
    Server->>DB: INSERT INTO bookings (property_id, guest_name, guest_phone, check_in, check_out)
    DB-->>Server: Return insertId
    Server-->>Browser: HTTP 201 Created (Booking Reference Confirmation)
    Browser->>Tourist: Displays instant reservation confirmation dialog
```

---

## 5. REST API Specification

### Authentication Endpoints
| Method | Endpoint | Description | Request Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new host or tourist | `{ name, email, password, phone, role }` | `201: { success, user: { id, name, email, role } }` |
| `POST` | `/api/auth/login` | Authenticate existing user | `{ email, password }` | `200: { success, user: { id, name, email, role } }` |
| `GET` | `/api/auth/me` | Verify active session | *Headers or query* | `200: { authenticated, user }` |

### Property Management Endpoints
| Method | Endpoint | Description | Request Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/properties` | Fetch stays with search/filter | Query: `?search=Mana&district=Chamoli` | `200: [ { id, title, village, district, price_per_night, image_url, is_verified, ... } ]` |
| `GET` | `/api/properties/:id` | Fetch single property | None | `200: { id, title, village, district, ... }` |
| `POST` | `/api/properties` | Publish new homestay | `multipart/form-data`: `title, village, district, price_per_night, host_id, photo` | `201: { success, property: { ... } }` |

### Booking Endpoints
| Method | Endpoint | Description | Request Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/bookings` | Submit stay reservation | `{ property_id, guest_name, guest_phone, guest_email, check_in, check_out }` | `201: { success, message, bookingId }` |
| `GET` | `/api/bookings` | Retrieve bookings list | Optional query | `200: [ { id, property_title, guest_name, ... } ]` |

### System Health
| Method | Endpoint | Description | Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service & DB status probe | `200: { status: 'healthy', database: 'connected', timestamp }` |

---

## 6. Security & Data Protection Controls
1. **Password Encryption**: All passwords stored in MySQL are hashed using `bcryptjs` with salt work-factor 10. Cleartext passwords never touch persistence logs.
2. **SQL Injection Mitigation**: All database queries executed via `mysql2/promise` strictly utilize parameterized statements (`?` placeholders).
3. **Upload Sanitization**: Uploaded files are strictly restricted to JPEG, PNG, and WebP. Randomly generated filenames prevent directory traversal and overwrite attacks.
4. **XSS Protection**: Dynamic DOM content insertion uses `textContent` and sanitized template literals to avert cross-site scripting vulnerabilities.
