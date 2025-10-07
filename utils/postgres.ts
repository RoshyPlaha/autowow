import { Pool } from "pg";
import { car_model } from "../models/car_model";

// Database connection configuration
const dbConfig = {
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DB || "appdb",
  user: process.env.POSTGRES_USER || "app",
  password: process.env.POSTGRES_PASSWORD || "app",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

// Create a connection pool
const pool = new Pool(dbConfig);

// Test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL database");
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};

// Car interface matching the database schema

// Database operations for cars
export const carQueries = {
  // Insert a new car
  async insert(car: Omit<car_model, "id" | "created_at">): Promise<car_model> {
    const query = `
      INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      car.vin,
      car.make,
      car.model,
      car.year,
      car.engine_cc,
      car.color,
      car.mileage,
      car.price,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all cars
  async getAll(): Promise<car_model[]> {
    const query = "SELECT * FROM cars ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  },

 
  // Get cars by filters
  async getByFilters(filters: {
    make?: string;
    model?: string;
    year?: number;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    maxMileage?: number;
  }): Promise<car_model[]> {
    let query = "SELECT * FROM cars WHERE 1=1";
    const values: any[] = [];
    let paramIndex = 1;

    if (filters.make) {
      query += ` AND make ILIKE $${paramIndex}`;
      values.push(`%${filters.make}%`);
      paramIndex++;
    }

    if (filters.model) {
      query += ` AND model ILIKE $${paramIndex}`;
      values.push(`%${filters.model}%`);
      paramIndex++;
    }

    if (filters.year) {
      query += ` AND year = $${paramIndex}`;
      values.push(filters.year);
      paramIndex++;
    }

    if (filters.minPrice) {
      query += ` AND price >= $${paramIndex}`;
      values.push(filters.minPrice);
      paramIndex++;
    }

    if (filters.maxPrice) {
      query += ` AND price <= $${paramIndex}`;
      values.push(filters.maxPrice);
      paramIndex++;
    }

    if (filters.color) {
      query += ` AND color ILIKE $${paramIndex}`;
      values.push(`%${filters.color}%`);
      paramIndex++;
    }

    if (filters.maxMileage) {
      query += ` AND mileage <= $${paramIndex}`;
      values.push(filters.maxMileage);
      paramIndex++;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    console.log("Result:", result.rows);
    return result.rows;
  },
};

// Export the pool for advanced queries
export { pool };

// Graceful shutdown
process.on("SIGINT", () => {
  pool.end(() => {
    console.log("PostgreSQL connection pool closed");
    process.exit(0);
  });
});
