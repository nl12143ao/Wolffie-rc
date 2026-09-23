
CD "C:\_WOLFFIE\_WOLFFIE-RC\server"

@'
# Database Configuration (Lokale SQLite / Dev)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=wolffie_dev

# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Security
SESSION_SECRET=wolffie_dev_secret_key_12345

# Data Collection
SNAPSHOT_INTERVAL=10000
CLEANUP_DAYS=7
'@ | Out-File -Encoding utf8 .env
