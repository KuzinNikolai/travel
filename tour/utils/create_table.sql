CREATE TABLE IF NOT EXISTS hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100) DEFAULT 'Thailand',
    city VARCHAR(100) DEFAULT 'Phuket',
    area VARCHAR(100) DEFAULT 'Patong'
    name VARCHAR(255),
    address TEXT,
    phone_number VARCHAR(50)
);