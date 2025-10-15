# AutoWow Database Setup

This directory contains the PostgreSQL database setup for AutoWow application.

## Files

- `docker-compose.yaml` - Docker Compose configuration for PostgreSQL and Adminer
- `init.sql` - Database initialization script that creates the cars table and indexes
- `vehicles.json` - JSON file containing vehicle data for seeding
- `seed-from-json.sql` - SQL script that seeds the database from JSON data
- `update-seed-data.sh` - Script to regenerate SQL from JSON when vehicles.json is updated
- `README.md` - This documentation file

## Quick Start

### 1. Start the Database from the autowow directory
```bash
npm run db:start
```

# Or manually from localDB directory
cd localDB
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Adminer (database admin interface) on port 8080

### 2. Database is Automatically Seeded

The database will be automatically seeded with vehicle data from `vehicles.json` when the containers start. No additional setup is needed!

### 3. Update Vehicle Data

To modify the vehicle data:

1. Edit `vehicles.json` with your vehicle data
2. Run the update script: `./update-seed-data.sh`
3. Reset the database: `npm run db:reset`

### 4. Access Database Admin Interface

Visit http://localhost:8080 and use these credentials:
- **System**: PostgreSQL
- **Server**: db
- **Username**: app
- **Password**: app
- **Database**: appdb

## Database Schema

### Cars Table

```sql
CREATE TABLE cars (
  id BIGSERIAL PRIMARY KEY,
  vin TEXT UNIQUE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  engine_cc INT,
  color TEXT,
  mileage INT,
  price NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Indexes

- `(make, model)` - For searching by make and model
- `year` - For filtering by year
- `engine_cc` - For filtering by engine size
- `color` - For filtering by color
- `price` - For price range queries
- `mileage` - For mileage filtering

## Environment Variables

You can customize the database connection using these environment variables:

```bash
POSTGRES_HOST=localhost          # Database host
POSTGRES_PORT=5432              # Database port
POSTGRES_DB=appdb               # Database name
POSTGRES_USER=app               # Database username
POSTGRES_PASSWORD=app           # Database password - local
```

## Available Scripts

- `npm run db:start` - Start the database containers
- `npm run db:stop` - Stop the database containers  
- `npm run db:reset` - Stop containers, remove volumes, and restart (fresh database)
- `./update-seed-data.sh` - Update SQL seed file from vehicles.json (run from localDB directory)

## Troubleshooting

### Database Connection Issues

1. Make sure Docker is running
2. Check if containers are up: `docker ps`
3. Check container logs: `docker logs local-postgres`

### Permission Issues

If you get permission errors, make sure Docker has access to the localDB directory.

### Port Conflicts

If port 5432 is already in use, you can change it in `docker-compose.yaml`:

```yaml
ports:
  - "5433:5432"  # Use port 5433 instead
```