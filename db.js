/**
 * db.js - Standalone MySQL Connection Pool Configuration
 * Tech Stack: mysql2/promise connection pooling (No XAMPP / Apache / PHP)
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

// Configuration from environment variables
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
    keepAliveInitialDelay: 10000
};

// Create the standalone connection pool
let pool = null;
let isConnected = false;

try {
    pool = mysql.createPool(dbConfig);
} catch (err) {
    console.error('⚠️ [DB] Failed to create MySQL connection pool:', err.message);
}

// In-memory fallback dataset for offline/resilience mode
const inMemoryData = {
    users: [
        {
            id: 1,
            name: 'Gopal Singh Rawat',
            email: 'gopal.mana@reawakenedhills.com',
            password: '$2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe', // "Pahadi@123"
            phone: '+91 98765 43210',
            role: 'host',
            created_at: new Date()
        },
        {
            id: 2,
            name: 'Kamla Negi',
            email: 'kamla.sari@reawakenedhills.com',
            password: '$2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe',
            phone: '+91 94120 12345',
            role: 'host',
            created_at: new Date()
        },
        {
            id: 3,
            name: 'Chandra Mohan Semwal',
            email: 'chandramohan@reawakenedhills.com',
            password: '$2a$10$w6vB7i4kQn3hP1Ugz9g5p.1wG7Ea8K2qT1lV8aZ1bX0r4.cQcQhCe',
            phone: '+91 98971 67890',
            role: 'host',
            created_at: new Date()
        }
    ],
    properties: [
        {
            id: 1,
            host_id: 1,
            title: 'Heritage Stone & Wood Cottage',
            village: 'Mana Village',
            district: 'Chamoli',
            price_per_night: 850.00,
            image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
            description: '150-year-old traditional Kath-Kuni architectural house just 3 km from Badrinath Temple. Restored by Gopal Rawat using local slate rock and fragrant deodar timber.',
            is_verified: 1,
            rating: 4.90,
            amenities: 'Traditional Pahadi Meals, Badrinath Route Pickup, Warm Wool Blankets, Herbal Chai',
            created_at: new Date()
        },
        {
            id: 2,
            host_id: 2,
            title: 'Deoriatal Valley View House',
            village: 'Sari Village',
            district: 'Rudraprayag',
            price_per_night: 950.00,
            image_url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
            description: 'Quiet ancestral stay perched right at the base trail of Deoriatal Lake and Tungnath Chopta. Enjoy morning views of Chaukhamba reflections.',
            is_verified: 1,
            rating: 4.85,
            amenities: 'Chopta Trek Guide, Farm Fresh Cow Milk, Solar Heated Water, Campfire Circle',
            created_at: new Date()
        },
        {
            id: 3,
            host_id: 3,
            title: 'Apple Orchard Timber Stay',
            village: 'Harsil Valley',
            district: 'Uttarkashi',
            price_per_night: 1100.00,
            image_url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
            description: 'Rustic alpine cabin nestled inside century-old organic royal-delicious apple orchards along the Bhagirathi River on the Gangotri highway.',
            is_verified: 1,
            rating: 4.92,
            amenities: 'Fresh Apple Cider, River Walk Access, Wood-burning Bukhari Stove, Gangotri Transit',
            created_at: new Date()
        },
        {
            id: 4,
            host_id: 1,
            title: 'Ancient Pine Ridge Homestay',
            village: 'Khirsu',
            district: 'Pauri Garhwal',
            price_per_night: 900.00,
            image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
            description: 'Panoramic mountain retreat looking over 300 Himalayan peaks. A preserved ancestral house in a serene ghost village revived through community ecotourism.',
            is_verified: 1,
            rating: 4.88,
            amenities: 'Himalayan Sunrise Balcony, Local Millet Roti (Koda), Silent Oak Forest Walks',
            created_at: new Date()
        },
        {
            id: 5,
            host_id: 3,
            title: 'Kath-Kuni Bhotia Heritage Stay',
            village: 'Bagori Village',
            district: 'Uttarkashi',
            price_per_night: 1050.00,
            image_url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
            description: 'Experience authentic Bhotia tribal culture with carved wooden lintels, hand-woven sheep wool rugs, and proximity to the historic Gartang Gali cliff bridge.',
            is_verified: 1,
            rating: 4.94,
            amenities: 'Handloom Weaving Demo, Organic Rajma Meals, Tibetan Tea, Gartang Gali Permits',
            created_at: new Date()
        },
        {
            id: 6,
            host_id: 1,
            title: 'Sacred Cedar Forest Cottage',
            village: 'Jageshwar (Artola)',
            district: 'Almora',
            price_per_night: 880.00,
            image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
            description: 'Tranquil ancestral mountain shelter hidden in giant deodar forests near the 8th-century Jageshwar temple complex. Decorated with traditional Aipan folk floor art.',
            is_verified: 1,
            rating: 4.91,
            amenities: 'Aipan Art Workshop, Cedar Forest Meditation, Kumaoni Bhatt ki Churkani Cuisine',
            created_at: new Date()
        }
    ],
    bookings: [
        {
            id: 1,
            property_id: 1,
            guest_name: 'Arushi Negi',
            guest_phone: '+91 98111 22334',
            guest_email: 'arushi@example.com',
            check_in: '2026-11-20',
            check_out: '2026-11-23',
            status: 'confirmed',
            created_at: new Date()
        }
    ]
};

/**
 * Test MySQL connection
 */
async function testConnection() {
    if (!pool) return { connected: false, error: 'Connection pool not initialized' };
    try {
        const connection = await pool.getConnection();
        await connection.query('SELECT 1');
        connection.release();
        isConnected = true;
        console.log(`✅ [MySQL] Successfully connected to standalone MySQL database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port}`);
        return { connected: true };
    } catch (err) {
        isConnected = false;
        console.warn(`⚠️ [MySQL] Could not establish connection to ${dbConfig.host}:${dbConfig.port} (${err.code || err.message}). Operating with resilient fallback store.`);
        return { connected: false, error: err.message, code: err.code };
    }
}

/**
 * Execute query with automatic fallback to in-memory store if MySQL is offline
 */
async function query(sql, params = []) {
    if (isConnected && pool) {
        try {
            return await pool.query(sql, params);
        } catch (err) {
            console.error('❌ [MySQL Query Error]:', err.message);
            throw err;
        }
    }

    // Fallback handler if MySQL server is not currently reachable
    return executeFallbackQuery(sql, params);
}

/**
 * Emulates essential SQL queries in-memory for smooth local execution
 */
function executeFallbackQuery(sql, params) {
    const trimmed = sql.trim().toUpperCase();

    // 1. SELECT properties
    if (trimmed.startsWith('SELECT') && trimmed.includes('PROPERTIES')) {
        let results = [...inMemoryData.properties];
        
        // Attach host details and maps_url to in-memory fallback
        results = results.map(p => {
            const host = inMemoryData.users.find(u => u.id === p.host_id) || {};
            const mapsUrl = p.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.village}, ${p.district}, Uttarakhand, India`)}`;
            return {
                ...p,
                maps_url: mapsUrl,
                host_name: host.name || 'Local Mountain Host',
                host_phone: host.phone || '+91 98765 43210',
                host_email: host.email || 'host@reawakenedhills.com',
                host_role: host.role || 'host'
            };
        });

        // Handle WHERE id = ?
        if (trimmed.includes('WHERE PROPERTIES.ID = ?') || (trimmed.includes('WHERE ID = ?') && params.length > 0)) {
            const targetId = parseInt(params[params.length - 1], 10);
            const prop = results.find(p => p.id === targetId);
            return [prop ? [prop] : [], []];
        }

        // Handle host_id
        if (trimmed.includes('HOST_ID = ?') && params.length > 0) {
            results = results.filter(p => p.host_id === parseInt(params[0], 10));
        }

        // Handle search query
        if (params.length > 0 && typeof params[0] === 'string' && params[0].startsWith('%')) {
            const term = params[0].replace(/%/g, '').toLowerCase();
            results = results.filter(p => 
                p.village.toLowerCase().includes(term) ||
                p.district.toLowerCase().includes(term) ||
                p.title.toLowerCase().includes(term)
            );
        }
        return [results, []];
    }

    // 2. INSERT into properties
    if (trimmed.startsWith('INSERT INTO PROPERTIES')) {
        const newId = inMemoryData.properties.length > 0 ? Math.max(...inMemoryData.properties.map(p => p.id)) + 1 : 1;
        const newProperty = {
            id: newId,
            host_id: params[0] || 1,
            title: params[1],
            village: params[2],
            district: params[3],
            price_per_night: parseFloat(params[4]),
            image_url: params[5],
            images: params[6],
            description: params[7] || 'Restored ancestral village homestay.',
            is_verified: 1,
            rating: 4.90,
            amenities: params[8] || 'Traditional Pahadi Meals, Solar Electricity, High-altitude Firewood Hearth',
            maps_url: params[9] || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${params[2]}, ${params[3]}, Uttarakhand, India`)}`,
            created_at: new Date()
        };
        inMemoryData.properties.unshift(newProperty);
        return [{ insertId: newId, affectedRows: 1 }, []];
    }

    // 2.1 UPDATE properties
    if (trimmed.startsWith('UPDATE PROPERTIES')) {
        const id = params[params.length - 1];
        const prop = inMemoryData.properties.find(p => p.id === parseInt(id, 10));
        if (prop) {
            prop.title = params[0] || prop.title;
            prop.village = params[1] || prop.village;
            prop.district = params[2] || prop.district;
            prop.price_per_night = parseFloat(params[3]) || prop.price_per_night;
            prop.description = params[4] || prop.description;
            prop.amenities = params[5] || prop.amenities;
            if (params[6]) prop.image_url = params[6];
            if (params[7]) prop.images = params[7];
            if (params[8]) prop.host_id = params[8];
            if (params[9]) prop.maps_url = params[9];
        }
        return [{ affectedRows: prop ? 1 : 0 }, []];
    }

    // 2.2 DELETE FROM properties
    if (trimmed.startsWith('DELETE FROM PROPERTIES')) {
        const id = parseInt(params[0], 10);
        const idx = inMemoryData.properties.findIndex(p => p.id === id);
        if (idx !== -1) {
            inMemoryData.properties.splice(idx, 1);
            return [{ affectedRows: 1 }, []];
        }
        return [{ affectedRows: 0 }, []];
    }

    // 3. SELECT users by email
    if (trimmed.startsWith('SELECT') && trimmed.includes('USERS') && trimmed.includes('EMAIL')) {
        const email = params[0];
        const user = inMemoryData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        return [user ? [user] : [], []];
    }

    // 4. INSERT into users
    if (trimmed.startsWith('INSERT INTO USERS')) {
        const newId = inMemoryData.users.length > 0 ? Math.max(...inMemoryData.users.map(u => u.id)) + 1 : 1;
        const newUser = {
            id: newId,
            name: params[0],
            email: params[1],
            password: params[2],
            phone: params[3] || '',
            role: params[4] || 'tourist',
            created_at: new Date()
        };
        inMemoryData.users.push(newUser);
        return [{ insertId: newId, affectedRows: 1 }, []];
    }

    // 5. INSERT into bookings
    if (trimmed.startsWith('INSERT INTO BOOKINGS')) {
        const newId = inMemoryData.bookings.length > 0 ? Math.max(...inMemoryData.bookings.map(b => b.id)) + 1 : 1;
        const newBooking = {
            id: newId,
            property_id: params[0],
            guest_name: params[1],
            guest_phone: params[2],
            guest_email: params[3] || '',
            check_in: params[4],
            check_out: params[5],
            guests_count: params[6] || 1,
            total_amount: params[7] || 0.00,
            payment_method: params[8] || 'UPI',
            payment_status: params[9] || 'paid',
            transaction_id: params[10] || `TXN_RH_${Date.now()}`,
            status: 'confirmed',
            created_at: new Date()
        };
        inMemoryData.bookings.push(newBooking);
        return [{ insertId: newId, affectedRows: 1 }, []];
    }

    // 5.1 UPDATE bookings (Cancellation & Refunds)
    if (trimmed.startsWith('UPDATE BOOKINGS')) {
        const id = params[params.length - 1];
        const booking = inMemoryData.bookings.find(b => b.id === parseInt(id, 10));
        if (booking) {
            booking.status = params[0] || 'cancelled';
            booking.refund_amount = parseFloat(params[1]) || 0.00;
            booking.deduction_amount = parseFloat(params[2]) || 0.00;
            booking.cancellation_reason = params[3] || 'Cancelled by guest';
            booking.payment_status = params[4] || 'refunded';
            booking.cancelled_at = new Date();
        }
        return [{ affectedRows: booking ? 1 : 0 }, []];
    }

    // 6. SELECT bookings
    if (trimmed.startsWith('SELECT') && trimmed.includes('BOOKINGS')) {
        return [[...inMemoryData.bookings], []];
    }

    return [[], []];
}

module.exports = {
    pool,
    query,
    testConnection,
    getIsConnected: () => isConnected,
    dbConfig
};
