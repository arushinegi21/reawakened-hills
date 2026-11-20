/**
 * server.js - Reawakened Hills Express Backend Server
 * Tech Stack: Node.js, Express.js, Standalone MySQL (mysql2/promise), Multer, bcryptjs, CORS, Dotenv
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// ---------------------------------------------------------------------------
// MIDDLEWARE CONFIGURATION
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Explicit route fallbacks for clean URLs
app.get('/chardham', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chardham.html'));
});
app.get('/hidden-gems', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hidden-gems.html'));
});
app.get('/hidden_gems', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hidden-gems.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// ---------------------------------------------------------------------------
// MULTER LOCAL FILE STORAGE CONFIGURATION
// ---------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `stay-${uniqueSuffix}${ext || '.jpg'}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid image type. Only JPEG, PNG, and WebP images are allowed.'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter
});

// ---------------------------------------------------------------------------
// REST API ENDPOINTS
// ---------------------------------------------------------------------------

/**
 * HEALTH CHECK & DIAGNOSTICS
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'Reawakened Hills API',
        database: db.getIsConnected() ? 'Standalone MySQL (Connected)' : 'Resilient In-Memory Mode',
        timestamp: new Date().toISOString()
    });
});

/**
 * 1. AUTHENTICATION MODULE
 * POST /api/auth/register
 */
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required fields.' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if user already exists
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
        if (existing && existing.length > 0) {
            return res.status(409).json({ error: 'An account with this email address already exists. Please log in.' });
        }

        // Hash password with bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const assignedRole = (role === 'host' || role === 'both') ? role : 'tourist';
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            [name.trim(), normalizedEmail, hashedPassword, phone || '', assignedRole]
        );

        res.status(201).json({
            success: true,
            message: 'Account registered successfully!',
            user: {
                id: result.insertId,
                name: name.trim(),
                email: normalizedEmail,
                phone: phone || '',
                role: assignedRole
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Failed to complete registration: ' + err.message });
    }
});

/**
 * POST /api/auth/login
 */
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
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Authentication service failure: ' + err.message });
    }
});

/**
 * 2. PROPERTIES (HOMESTAYS) MODULE
 * GET /api/properties
 * Query params: ?search=mana&district=chamoli
 */
app.get('/api/properties', async (req, res) => {
    try {
        const { search, district, village, host_id } = req.query;
        let sql = `
            SELECT properties.*, 
                   users.name AS host_name, 
                   users.phone AS host_phone, 
                   users.email AS host_email,
                   users.role AS host_role
            FROM properties
            LEFT JOIN users ON properties.host_id = users.id
        `;
        const params = [];
        const conditions = [];

        if (host_id && host_id.trim() !== '') {
            conditions.push('properties.host_id = ?');
            params.push(parseInt(host_id.trim(), 10));
        }

        if (search && search.trim() !== '') {
            const term = `%${search.trim()}%`;
            conditions.push('(properties.village LIKE ? OR properties.district LIKE ? OR properties.title LIKE ? OR properties.description LIKE ?)');
            params.push(term, term, term, term);
        }

        if (district && district.trim() !== '') {
            conditions.push('properties.district = ?');
            params.push(district.trim());
        }

        if (village && village.trim() !== '') {
            conditions.push('properties.village LIKE ?');
            params.push(`%${village.trim()}%`);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ' ORDER BY properties.id DESC';

        const [properties] = await db.query(sql, params);

        // Enrich each property with clean Google Maps link and host details
        const enriched = (properties || []).map(p => {
            const mapsUrl = (p.maps_url && p.maps_url.trim() !== '')
                ? p.maps_url.trim()
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.village}, ${p.district}, Uttarakhand, India`)}`;
            return {
                ...p,
                maps_url: mapsUrl,
                host_name: p.host_name || 'Local Mountain Host',
                host_phone: p.host_phone || '+91 98765 43210',
                host_email: p.host_email || 'host@reawakenedhills.com'
            };
        });

        res.json(enriched);
    } catch (err) {
        console.error('Error fetching properties:', err);
        res.status(500).json({ error: 'Failed to retrieve properties: ' + err.message });
    }
});

/**
 * GET /api/properties/:id
 */
app.get('/api/properties/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const [rows] = await db.query(`
            SELECT properties.*, 
                   users.name AS host_name, 
                   users.phone AS host_phone, 
                   users.email AS host_email,
                   users.role AS host_role
            FROM properties
            LEFT JOIN users ON properties.host_id = users.id
            WHERE properties.id = ?
        `, [id]);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Property not found.' });
        }
        const p = rows[0];
        const mapsUrl = (p.maps_url && p.maps_url.trim() !== '')
            ? p.maps_url.trim()
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.village}, ${p.district}, Uttarakhand, India`)}`;

        res.json({
            ...p,
            maps_url: mapsUrl,
            host_name: p.host_name || 'Local Mountain Host',
            host_phone: p.host_phone || '+91 98765 43210',
            host_email: p.host_email || 'host@reawakenedhills.com'
        });
    } catch (err) {
        console.error('Error fetching property:', err);
        res.status(500).json({ error: 'Error fetching property: ' + err.message });
    }
});

/**
 * POST /api/properties
 * Multipart form submission (Become a Host)
 * Supports min 3 photos (Whole House, Room, Extra) and max 5 photos
 */
app.post('/api/properties', upload.any(), async (req, res) => {
    try {
        const { title, village, district, price_per_night, host_id, description, amenities, maps_url } = req.body;

        if (!title || !village || !district || !price_per_night) {
            return res.status(400).json({ error: 'Title, village, district, and nightly price are required.' });
        }

        const parsedPrice = parseFloat(price_per_night);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return res.status(400).json({ error: 'Please enter a valid positive nightly price.' });
        }

        // Validate uploaded photos: min 3, max 5
        const files = req.files || (req.file ? [req.file] : []);

        if (files.length < 3) {
            return res.status(400).json({
                error: `Minimum 3 photos required: 1 of the whole house (exterior), 1 of the room (interior), and 1 extra. You provided ${files.length}.`
            });
        }

        if (files.length > 5) {
            return res.status(400).json({
                error: `Maximum 5 photos allowed. You provided ${files.length}.`
            });
        }

        const imageUrls = files.map(f => `/uploads/${f.filename}`);
        const primaryImageUrl = imageUrls[0];
        const allImagesJson = JSON.stringify(imageUrls);

        const validHostId = host_id ? parseInt(host_id, 10) : 1;
        const defaultDesc = (description && description.trim() !== '') ? description.trim() : `Authentic restored ancestral mountain homestay in ${village}, ${district}. Experience traditional Himalayan hospitality.`;
        const defaultAmenities = (amenities && amenities.trim() !== '') ? amenities.trim() : 'Free Parking, Wi-Fi, TV, Refrigerator, Kitchen, Traditional Pahadi Meals';
        const cleanMapsUrl = (maps_url && maps_url.trim() !== '')
            ? maps_url.trim()
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${village.trim()}, ${district.trim()}, Uttarakhand, India`)}`;

        const [result] = await db.query(
            `INSERT INTO properties (host_id, title, village, district, price_per_night, image_url, images, description, is_verified, rating, amenities, maps_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 4.90, ?, ?)`,
            [validHostId, title.trim(), village.trim(), district.trim(), parsedPrice, primaryImageUrl, allImagesJson, defaultDesc, defaultAmenities, cleanMapsUrl]
        );

        const newProperty = {
            id: result.insertId,
            host_id: validHostId,
            title: title.trim(),
            village: village.trim(),
            district: district.trim(),
            price_per_night: parsedPrice,
            image_url: primaryImageUrl,
            images: allImagesJson,
            description: defaultDesc,
            is_verified: 1,
            rating: 4.90,
            amenities: defaultAmenities,
            maps_url: cleanMapsUrl,
            created_at: new Date()
        };

        res.status(201).json({
            success: true,
            message: `Your ancestral property with ${files.length} verified photos was published live to the platform!`,
            property: newProperty
        });
    } catch (err) {
        console.error('Property creation error:', err);
        res.status(500).json({ error: 'Failed to publish listing: ' + err.message });
    }
});

/**
 * Property update handler (Supports PUT /api/properties/:id and POST /api/properties/:id/edit)
 */
const handlePropertyUpdate = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid property ID.' });
        }

        // Fetch existing property
        const [existingRows] = await db.query('SELECT * FROM properties WHERE id = ?', [id]);
        if (!existingRows || existingRows.length === 0) {
            return res.status(404).json({ error: 'Property not found.' });
        }
        const existing = existingRows[0];

        const { title, village, district, price_per_night, description, amenities, host_id, maps_url } = req.body;

        const newTitle = (title !== undefined && title.trim() !== '') ? title.trim() : existing.title;
        const newVillage = (village !== undefined && village.trim() !== '') ? village.trim() : existing.village;
        const newDistrict = (district !== undefined && district.trim() !== '') ? district.trim() : existing.district;
        const newDesc = description !== undefined ? description.trim() : existing.description;
        const newAmenities = amenities !== undefined ? amenities.trim() : existing.amenities;
        const targetHostId = host_id ? parseInt(host_id, 10) : existing.host_id;
        const newMapsUrl = (maps_url !== undefined && maps_url.trim() !== '') ? maps_url.trim() : (existing.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${newVillage}, ${newDistrict}, Uttarakhand, India`)}`);

        let newPrice = existing.price_per_night;
        if (price_per_night !== undefined && price_per_night !== '') {
            const parsed = parseFloat(price_per_night);
            if (isNaN(parsed) || parsed <= 0) {
                return res.status(400).json({ error: 'Please enter a valid positive nightly price.' });
            }
            newPrice = parsed;
        }

        // Handle photos if new ones were uploaded
        let primaryImageUrl = existing.image_url;
        let allImagesJson = existing.images;

        const files = req.files || (req.file ? [req.file] : []);
        if (files && files.length > 0) {
            if (files.length < 3) {
                return res.status(400).json({
                    error: `When replacing photos, minimum 3 photos are required (Whole House, Room, and Extra). You provided ${files.length}.`
                });
            }
            if (files.length > 5) {
                return res.status(400).json({
                    error: `Maximum 5 photos allowed. You provided ${files.length}.`
                });
            }

            const imageUrls = files.map(f => `/uploads/${f.filename}`);
            primaryImageUrl = imageUrls[0];
            allImagesJson = JSON.stringify(imageUrls);
        }

        await db.query(
            `UPDATE properties 
             SET title = ?, village = ?, district = ?, price_per_night = ?, description = ?, amenities = ?, image_url = ?, images = ?, host_id = ?, maps_url = ?
             WHERE id = ?`,
            [newTitle, newVillage, newDistrict, newPrice, newDesc, newAmenities, primaryImageUrl, allImagesJson, targetHostId, newMapsUrl, id]
        );

        const updatedProperty = {
            id,
            host_id: targetHostId,
            title: newTitle,
            village: newVillage,
            district: newDistrict,
            price_per_night: newPrice,
            image_url: primaryImageUrl,
            images: allImagesJson,
            description: newDesc,
            amenities: newAmenities,
            maps_url: newMapsUrl,
            is_verified: existing.is_verified,
            rating: existing.rating
        };

        res.json({
            success: true,
            message: 'Listing updated successfully!',
            property: updatedProperty
        });
    } catch (err) {
        console.error('Property update error:', err);
        res.status(500).json({ error: 'Failed to update property: ' + err.message });
    }
};

app.put('/api/properties/:id', upload.any(), handlePropertyUpdate);
app.post('/api/properties/:id/edit', upload.any(), handlePropertyUpdate);
app.post('/api/properties/:id', upload.any(), handlePropertyUpdate);

/**
 * Property deletion handler (Supports DELETE /api/properties/:id and POST /api/properties/:id/delete)
 */
const handlePropertyDelete = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid property ID.' });
        }

        const [existing] = await db.query('SELECT * FROM properties WHERE id = ?', [id]);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: 'Property not found.' });
        }

        await db.query('DELETE FROM properties WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Property listing has been delisted successfully.'
        });
    } catch (err) {
        console.error('Property deletion error:', err);
        res.status(500).json({ error: 'Failed to delete listing: ' + err.message });
    }
};

app.delete('/api/properties/:id', handlePropertyDelete);
app.post('/api/properties/:id/delete', handlePropertyDelete);

/**
 * 3. BOOKINGS MODULE
 * POST /api/bookings
 */
app.post('/api/bookings', async (req, res) => {
    try {
        const { property_id, guest_name, guest_phone, guest_email, check_in, check_out, guests_count, total_amount, payment_method, payment_status, transaction_id } = req.body;

        if (!property_id || !guest_name || !guest_phone || !check_in || !check_out) {
            return res.status(400).json({ error: 'Property ID, guest name, phone, check-in, and check-out dates are required.' });
        }

        const propId = parseInt(property_id, 10);
        const parsedGuests = parseInt(guests_count, 10) || 1;
        const parsedTotal = parseFloat(total_amount) || 0.00;
        const method = payment_method || 'UPI';
        const pStatus = payment_status || 'paid';
        const txnId = transaction_id || `TXN_RH_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

        const [result] = await db.query(
            `INSERT INTO bookings (property_id, guest_name, guest_phone, guest_email, check_in, check_out, guests_count, total_amount, payment_method, payment_status, transaction_id, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
            [propId, guest_name.trim(), guest_phone.trim(), guest_email ? guest_email.trim() : '', check_in, check_out, parsedGuests, parsedTotal, method, pStatus, txnId]
        );

        // Fetch property & host details for full booking confirmation receipt
        const [propRows] = await db.query(`
            SELECT p.*, u.name as host_name, u.phone as host_phone, u.email as host_email 
            FROM properties p 
            LEFT JOIN users u ON p.host_id = u.id 
            WHERE p.id = ?
        `, [propId]);

        const prop = (propRows && propRows.length > 0) ? propRows[0] : {};

        const bookingData = {
            id: result.insertId,
            property_id: propId,
            property_title: prop.title || 'Himalayan Homestay',
            village: prop.village || '',
            district: prop.district || '',
            image_url: prop.image_url || '',
            host_name: prop.host_name || 'Local Mountain Host',
            host_phone: prop.host_phone || '+91 98765 43210',
            guest_name: guest_name.trim(),
            guest_phone: guest_phone.trim(),
            guest_email: guest_email ? guest_email.trim() : '',
            check_in,
            check_out,
            guests_count: parsedGuests,
            total_amount: parsedTotal,
            payment_method: method,
            payment_status: pStatus,
            transaction_id: txnId,
            status: 'confirmed',
            created_at: new Date()
        };

        res.status(201).json({
            success: true,
            message: `🎉 Booking Confirmed! Payment of ₹${parsedTotal.toLocaleString('en-IN')} received successfully via ${method}.`,
            bookingId: result.insertId,
            booking: bookingData
        });
    } catch (err) {
        console.error('Booking submission error:', err);
        res.status(500).json({ error: 'Failed to submit reservation: ' + err.message });
    }
});

/**
 * GET /api/bookings
 * Supports ?email=... and ?phone=...
 */
app.get('/api/bookings', async (req, res) => {
    try {
        const { email, phone, host_id } = req.query;
        let sql = `
            SELECT b.*, 
                   p.title as property_title, 
                   p.village, 
                   p.district, 
                   p.image_url, 
                   p.price_per_night,
                   p.host_id,
                   u.name as host_name, 
                   u.phone as host_phone
            FROM bookings b
            LEFT JOIN properties p ON b.property_id = p.id
            LEFT JOIN users u ON p.host_id = u.id
        `;
        const params = [];
        const conditions = [];

        if (host_id && host_id.trim() !== '') {
            conditions.push('p.host_id = ?');
            params.push(parseInt(host_id.trim(), 10));
        }

        if (email && email.trim() !== '') {
            conditions.push('b.guest_email = ?');
            params.push(email.trim());
        }

        if (phone && phone.trim() !== '') {
            conditions.push('b.guest_phone = ?');
            params.push(phone.trim());
        }

        if (conditions.length > 0) {
            if (host_id) {
                sql += ' WHERE ' + conditions.join(' AND ');
            } else {
                sql += ' WHERE ' + conditions.join(' OR ');
            }
        }

        sql += ' ORDER BY b.id DESC';

        const [bookings] = await db.query(sql, params);
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: 'Failed to retrieve bookings: ' + err.message });
    }
});

/**
 * POST & PUT /api/bookings/:id/cancel
 * Handles stay cancellation with exact refund policy:
 * - Early cancellation (2 or more days prior to check-in): 100% full refund, 0 deduction
 * - 1 day before stay (or same day): 50% deduction, 50% refund
 * - After check-in date: Non-refundable (0% refund)
 */
const handleBookingCancellation = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid booking ID.' });
        }

        const [rows] = await db.query(`
            SELECT b.*, 
                   p.title as property_title, p.village, p.district, p.price_per_night, p.host_id,
                   u.name as host_name, u.phone as host_phone, u.email as host_email
            FROM bookings b
            LEFT JOIN properties p ON b.property_id = p.id
            LEFT JOIN users u ON p.host_id = u.id
            WHERE b.id = ?
        `, [id]);

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        const booking = rows[0];

        if (booking.status === 'cancelled') {
            return res.status(400).json({ 
                error: 'This reservation has already been cancelled.',
                cancellation: {
                    booking_id: booking.id,
                    refund_amount: booking.refund_amount,
                    deduction_amount: booking.deduction_amount,
                    cancelled_at: booking.cancelled_at
                }
            });
        }

        const totalAmount = parseFloat(booking.total_amount) || parseFloat(booking.price_per_night) || 0.00;
        const checkInDate = new Date(booking.check_in);

        // Normalize calendar dates to midnight to compute calendar day difference
        const checkInMidnight = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
        const now = new Date();
        const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const MS_PER_DAY = 24 * 60 * 60 * 1000;
        const diffDays = Math.round((checkInMidnight - todayMidnight) / MS_PER_DAY);

        let refundPercentage = 100;
        let policyApplied = '';
        let deductionAmount = 0.00;
        let refundAmount = totalAmount;

        if (diffDays >= 2) {
            // Early cancellation (2 or more days prior)
            refundPercentage = 100;
            deductionAmount = 0.00;
            refundAmount = totalAmount;
            policyApplied = 'Early cancellation (2+ days prior) — 100% Full Refund issued';
        } else if (diffDays >= 0) {
            // 1 day before stay (or same day before check-in)
            refundPercentage = 50;
            deductionAmount = Math.round((totalAmount * 0.5) * 100) / 100;
            refundAmount = Math.round((totalAmount * 0.5) * 100) / 100;
            policyApplied = diffDays === 1 
                ? 'Cancellation 1 day before stay — 50% deduction applied, 50% refund issued'
                : 'Same-day cancellation before check-in — 50% deduction applied, 50% refund issued';
        } else {
            // Past check-in date
            refundPercentage = 0;
            deductionAmount = totalAmount;
            refundAmount = 0.00;
            policyApplied = 'Cancellation requested after scheduled check-in date — Non-refundable';
        }

        const reason = req.body.reason ? String(req.body.reason).trim() : 'Personal schedule change';
        const newPaymentStatus = refundAmount > 0 ? 'refunded' : 'cancelled';

        await db.query(`
            UPDATE bookings 
            SET status = 'cancelled',
                refund_amount = ?,
                deduction_amount = ?,
                cancellation_reason = ?,
                cancelled_at = NOW(),
                payment_status = ?
            WHERE id = ?
        `, [refundAmount, deductionAmount, reason, newPaymentStatus, id]);

        res.json({
            success: true,
            message: refundPercentage === 100
                ? `Reservation cancelled successfully! Full refund of ₹${refundAmount.toLocaleString('en-IN')} has been processed.`
                : refundPercentage === 50
                    ? `Reservation cancelled. 50% deduction (₹${deductionAmount.toLocaleString('en-IN')}) applied. Refund of ₹${refundAmount.toLocaleString('en-IN')} has been processed.`
                    : `Reservation cancelled. No refund is available after the scheduled check-in date.`,
            cancellation: {
                booking_id: id,
                property_title: booking.property_title,
                village: booking.village,
                district: booking.district,
                check_in: booking.check_in,
                check_out: booking.check_out,
                total_amount: totalAmount,
                refund_amount: refundAmount,
                deduction_amount: deductionAmount,
                refund_percentage: refundPercentage,
                policy_applied: policyApplied,
                cancellation_reason: reason,
                payment_method: booking.payment_method || 'UPI',
                cancelled_at: new Date(),
                status: 'cancelled'
            }
        });
    } catch (err) {
        console.error('Cancellation error:', err);
        res.status(500).json({ error: 'Failed to process cancellation: ' + err.message });
    }
};

app.post('/api/bookings/:id/cancel', handleBookingCancellation);
app.put('/api/bookings/:id/cancel', handleBookingCancellation);

// ---------------------------------------------------------------------------
// 404 & GLOBAL ERROR HANDLING
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Upload Error: ' + err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message || 'An unexpected error occurred.' });
    }
    next();
});

// ---------------------------------------------------------------------------
// SERVER INITIALIZATION
// ---------------------------------------------------------------------------
app.listen(PORT, async () => {
    console.log(`\n=================================================`);
    console.log(`🏔️  Reawakened Hills - Uttarakhand Tourism Platform`);
    console.log(`🚀  Express Server running at: http://localhost:${PORT}`);
    console.log(`📁  Serving static assets from: ${path.join(__dirname, 'public')}`);
    console.log(`=================================================\n`);

    // Verify MySQL Database connectivity
    await db.testConnection();
});
