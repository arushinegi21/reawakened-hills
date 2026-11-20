# Reawakened Hills — Project Implementation Phases & Roadmap

An end-to-end phased development plan for **Reawakened Hills**, a sustainable rural homestay and tourism platform dedicated to revitalizing "ghost villages" in Uttarakhand.

---

## 🏔️ Project Mission & Objectives
- **Revitalize Ghost Villages**: Enable native property owners to monetize vacant ancestral houses in remote hill districts.
- **Direct Marketplace Model**: Connect travelers directly with local hosts without cumbersome administrative bottlenecks. Hosts publish instantly upon logging in with automated "Photo Verified" trust tagging.
- **Spiritual & Offbeat Exploration**: Provide comprehensive static guides for the holy **Char Dham Pilgrimage** (Yamunotri, Gangotri, Kedarnath, Badrinath) alongside 26 hidden gems across all 13 districts of Uttarakhand (7 Garhwal + 6 Kumaon).
- **Lightweight, High-Performance Tech Stack**: Node.js/Express.js backend, standalone MySQL (`mysql2/promise`) connection pooling, Multer local file uploads, bcryptjs security, Bootstrap 5, FontAwesome, and Vanilla JavaScript fetch API.

---

## 📋 Phased Execution Roadmap

### Phase 1: Architectural Blueprinting & Environment Setup
- **Objectives**:
  - Establish clean project directory structure rooted at `UK_Tourism/`.
  - Author comprehensive architectural specifications (`architecture.md`) detailing data flows, security boundaries, and modular component layers.
  - Configure `.env` environment variables and configure dependency manifests (`package.json`).
  - Initialize the uploads storage directory (`public/uploads/`) with proper permissions and fallback static assets.
- **Deliverables**:
  - `phases.md`
  - `architecture.md`
  - `package.json`
  - `.env` & `.env.example`

---

### Phase 2: Standalone MySQL Schema Engineering & Pooling
- **Objectives**:
  - Design normalized relational schema (`schema.sql`) for standalone MySQL (no XAMPP, Apache, or PHP).
  - Create tables:
    - `users`: User profiles, role definitions (`host`, `tourist`), secure password hashes.
    - `properties`: Homestay metadata (title, village, district, nightly rate, image URL, photo-verified flag, rating, amenities).
    - `bookings`: Reservation requests with date ranges, contact numbers, and status.
  - Implement resilient database connection pooling in `db.js` using `mysql2/promise`.
  - Seed baseline authentic mountain homestays (e.g., Mana Village, Sari Village, Harsil Valley) so the platform is immediately functional upon initial launch.
  - Provide fallback operational mode for local offline resilience.
- **Deliverables**:
  - `schema.sql`
  - `db.js`

---

### Phase 3: Express.js Backend & Secure REST API Development
- **Objectives**:
  - Construct the core Express.js application in `server.js` with CORS, JSON parsing, and static asset middleware serving `public/`.
  - Implement Multer disk storage engine for image uploads with timestamped filenames and MIME-type filtering.
  - Develop RESTful API endpoints:
    - `POST /api/auth/register`: Input validation, duplicate checks, bcryptjs password hashing (salt rounds = 10).
    - `POST /api/auth/login`: Credential verification via `bcryptjs.compare`, session state emission.
    - `GET /api/auth/me`: Active session authentication probe.
    - `GET /api/properties`: Retrieval of active stays with dynamic search queries (`?search=`, `?district=`, `?village=`).
    - `GET /api/properties/:id`: Single homestay detailed retrieval.
    - `POST /api/properties`: Authenticated property publishing with multipart image upload (`upload.single('photo')`).
    - `POST /api/bookings`: Booking submission with contact validation and date verification.
    - `GET /api/health`: Database and server operational health probe.
- **Deliverables**:
  - `server.js`

---

### Phase 4: Dynamic Frontend Integration & Airbnb-Inspired UI
- **Objectives**:
  - Modernize and enhance `public/index.html` with an earthy, warm Himalayan palette, responsive grid, and interactive modals.
  - Replace static mock cards with dynamic DOM rendering driven by `fetch('/api/properties')`.
  - Connect the "Become a Host" modal to `POST /api/properties` using `FormData`:
    - Enforce host authentication before listing creation.
    - Real-time photo preview and upload handling.
    - Instant DOM prepend with "Photo Verified" badge upon successful submission.
  - Connect the Authentication Modal:
    - Seamless switching between Log In and Sign Up tabs.
    - Persistent client session in `localStorage`.
    - Dynamic navigation bar reflecting logged-in user state and one-click Logout.
  - Connect the "Request Stay" Modal:
    - Prefill stay title and property ID dynamically.
    - Submit booking details to `POST /api/bookings`.
    - Display confirmation status toast notifications.
  - Implement live keyword search and district filter in the hero floating bar.
- **Deliverables**:
  - `public/index.html` (Dynamic Vanilla JS client logic)
  - `public/uploads/`

---

### Phase 5: Pilgrimage & Offbeat Guides Harmonization
- **Objectives**:
  - Review, standardize, and link `public/chardham.html`:
    - Complete guide covering Yamunotri, Gangotri, Kedarnath, and Badrinath.
    - Detailed metrics: altitude, trekking distance, base camps, best travel windows, and high-resolution imagery.
  - Review, standardize, and link `public/hidden-gems.html`:
    - Complete Garhwal coverage across all 7 districts (Tehri Garhwal, Uttarkashi, Chamoli, Rudraprayag, Pauri Garhwal, Dehradun, Haridwar) with 2 verified spots each.
    - Complete Kumaon coverage across all 6 districts (Pithoragarh, Almora, Nainital, Bageshwar, Champawat, Udham Singh Nagar) with 2 verified spots each.
  - Standardize cross-page navigation bars, breadcrumbs, and footers across all three HTML files.
- **Deliverables**:
  - `public/chardham.html`
  - `public/hidden-gems.html`

---

### Phase 6: Multi-Photo Listing Engine & Enhanced User Architecture (Completed)
- **Objectives**:
  - Implement strict photo verification rules for ancestral homestay listings:
    - Minimum 3 photos required: 1 Whole House Exterior, 1 Room Interior, and 1 Extra View (balcony/valley/kitchen).
    - Up to 5 photos maximum.
  - Multi-part photo upload handling with Multer (`upload.any()`) storing primary image in `image_url` and serialized JSON array in `images` column.
  - Interactive multi-slot image preview in UI (`previewSlotPhoto`) with dynamic photo count badge on homestay cards.
  - Dedicated Authentication & Profile infrastructure:
    - Independent `/login` and `/signup` pages with real-time field validation and seamless redirection.
    - Dedicated `/profile` page displaying user profile, active reservation history, and one-click logout.
    - Global session navigation bar state across all pages.
  - Local asset integration for Hidden Gems:
    - Created `public/images/` repository and integrated high-resolution local photography for Sem Mukhem, Harsil Valley, Gartang Gali, Niti Valley, and Ghes Village.
- **Deliverables**:
  - Updated `public/index.html` with multi-photo host listing modal & cards.
  - `public/login.html`, `public/signup.html`, and `public/profile.html`.
  - `public/images/` high-resolution local gallery assets.
  - Live MySQL schema update (`ALTER TABLE properties ADD COLUMN images TEXT`).

---

### Phase 7: Host Dashboard, Listing Management & Record Modification Engine (Completed)
- **Objectives**:
  - Enable hosts and users to view all their inserted ancestral homes and reservation records in their dedicated profile (`profile.html`).
  - Implement full CRUD modification capabilities:
    - `PUT /api/properties/:id`: Edit title, village, district, nightly rate, description, amenities, and replace/update 3-5 verified photos.
    - `DELETE /api/properties/:id`: Safely delist properties from the platform.
    - `GET /api/properties?host_id=X`: Filter and load active listings for the logged-in host.
    - `GET /api/bookings?email=X&phone=Y`: Retrieve trip reservations linked to the user.
  - Interactive Host Management UI:
    - Quick listing stats (number of properties listed and trip reservations).
    - Edit Modal (`#editPropertyModal`) with pre-filled inputs, current photo gallery previews, and optional 3-5 photo replacement slots.
    - Direct "Add Another Home" modal from the profile dashboard.
    - Live toast feedback notifications and seamless state updates without page reloading.
- **Deliverables**:
  - Enhanced `public/profile.html` with host management dashboard and edit modal.
  - RESTful endpoints in `server.js` (`PUT /api/properties/:id`, `DELETE /api/properties/:id`, query filters).
  - Resilient fallback query support in `db.js`.

---

### Phase 8: End-to-End Verification, Performance & Documentation
- **Objectives**:
  - Verify all API endpoints with boundary test cases (valid/invalid logins, image upload boundaries [min 3, max 5], search filters, record updates).
  - Verify cross-browser responsive layout on desktop, tablet, and mobile viewport breakpoints.
  - Package setup guides, database initialization instructions, and run scripts.
- **Deliverables**:
  - Verified codebase and full-stack operational test suite.
