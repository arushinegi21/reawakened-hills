-- =======================================================
-- Reawakened Hills - MySQL Database Schema & Seed Script
-- Platform for Revitalizing Ghost Villages in Uttarakhand
-- Tech Stack: Standalone MySQL 8.0 (No XAMPP / Apache / PHP)
-- =======================================================

CREATE DATABASE IF NOT EXISTS reawakened_hills;
USE reawakened_hills;

-- Drop tables in reverse foreign-key dependency order
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;

-- 1. USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(25),
    role ENUM('host', 'tourist', 'both') DEFAULT 'tourist',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PROPERTIES (HOMESTAYS) TABLE
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    host_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    images TEXT,
    description TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 4.90,
    amenities VARCHAR(300) DEFAULT 'Traditional Pahadi Meals, Hot Spring Bath, Solar Electricity, High-altitude Firewood Hearth',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. BOOKINGS (RESERVATIONS) TABLE
CREATE TABLE bookings (
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

-- =======================================================
-- SEED DATA: Preload authentic village hosts & properties
-- Default seed password for test hosts: "Pahadi@123"
-- Bcrypt Hash: $2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe
-- =======================================================

INSERT INTO users (id, name, email, password, phone, role) VALUES
(1, 'Gopal Singh Rawat', 'gopal.mana@reawakenedhills.com', '$2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe', '+91 98765 43210', 'host'),
(2, 'Kamla Negi', 'kamla.sari@reawakenedhills.com', '$2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe', '+91 94120 12345', 'host'),
(3, 'Chandra Mohan Semwal', 'chandramohan@reawakenedhills.com', '$2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe', '+91 98971 67890', 'host'),
(4, 'Devendra Joshi', 'devendra.josh@reawakenedhills.com', '$2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe', '+91 97580 98765', 'host');

INSERT INTO properties (id, host_id, title, village, district, price_per_night, image_url, description, is_verified, rating, amenities) VALUES
(1, 1, 'Heritage Stone & Wood Cottage', 'Mana Village', 'Chamoli', 850.00, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', '150-year-old traditional Kath-Kuni architectural house just 3 km from Badrinath Temple. Restored by Gopal Rawat using local slate rock and fragrant deodar timber.', TRUE, 4.90, 'Traditional Pahadi Meals, Badrinath Route Pickup, Warm Wool Blankets, Herbal Chai'),
(2, 2, 'Deoriatal Valley View House', 'Sari Village', 'Rudraprayag', 950.00, 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80', 'Quiet ancestral stay perched right at the base trail of Deoriatal Lake and Tungnath Chopta. Enjoy morning views of Chaukhamba reflections.', TRUE, 4.85, 'Chopta Trek Guide, Farm Fresh Cow Milk, Solar Heated Water, Campfire Circle'),
(3, 3, 'Apple Orchard Timber Stay', 'Harsil Valley', 'Uttarkashi', 1100.00, 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80', 'Rustic alpine cabin nestled inside century-old organic royal-delicious apple orchards along the Bhagirathi River on the Gangotri highway.', TRUE, 4.92, 'Fresh Apple Cider, River Walk Access, Wood-burning Bukhari Stove, Gangotri Transit'),
(4, 1, 'Ancient Pine Ridge Homestay', 'Khirsu', 'Pauri Garhwal', 900.00, 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', 'Panoramic mountain retreat looking over 300 Himalayan peaks. A preserved ancestral house in a serene ghost village revived through community ecotourism.', TRUE, 4.88, 'Himalayan Sunrise Balcony, Local Millet Roti (Koda), Silent Oak Forest Walks'),
(5, 3, 'Kath-Kuni Bhotia Heritage Stay', 'Bagori Village', 'Uttarkashi', 1050.00, 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80', 'Experience authentic Bhotia tribal culture with carved wooden lintels, hand-woven sheep wool rugs, and proximity to the historic Gartang Gali cliff bridge.', TRUE, 4.94, 'Handloom Weaving Demo, Organic Rajma Meals, Tibetan Tea, Gartang Gali Permits'),
(6, 4, 'Sacred Cedar Forest Cottage', 'Jageshwar (Artola)', 'Almora', 880.00, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', 'Tranquil ancestral mountain shelter hidden in giant deodar forests near the 8th-century Jageshwar temple complex. Decorated with traditional Aipan folk floor art.', TRUE, 4.91, 'Aipan Art Workshop, Cedar Forest Meditation, Kumaoni Bhatt ki Churkani Cuisine');

INSERT INTO bookings (property_id, guest_name, guest_phone, guest_email, check_in, check_out, status) VALUES
(1, 'Arushi Negi', '+91 98111 22334', 'arushi@example.com', '2026-11-20', '2026-11-23', 'confirmed'),
(2, 'Vikram Rawat', '+91 97222 33445', 'vikram@example.com', '2026-11-25', '2026-11-28', 'confirmed');
