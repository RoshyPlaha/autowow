// import { Pool } from "pg";

import { car } from "../models/car_model";

import { Pool, PoolConfig } from 'pg';

const useSupabase = process.env.DB_PROVIDER === 'supabase';

const localConfig: PoolConfig = {
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  database: process.env.POSTGRES_DB ?? 'appdb',
  user: process.env.POSTGRES_USER ?? 'app',
  password: process.env.POSTGRES_PASSWORD ?? 'app',
};

const supabaseConfig: PoolConfig = {
  connectionString:
    process.env.SUPABASE_DB_POOL_URL ?? `${process.env.SUPABASE_DB_URL}?sslmode=require`,
  ssl: { rejectUnauthorized: false }, // required for Supabase
};

 const pool = new Pool(useSupabase ? supabaseConfig : localConfig);

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
  async insert(car: Omit<car, "id" | "created_at">): Promise<car> {
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
  async getAll(): Promise<car[]> {
    const query = "SELECT * FROM cars ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  },

  // Get cars by filters
  async getByFilters(filters: {
    make?: string;
    model?: string;
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
    color?: string[] | null;
    mileagemin?: number;
    mileagemax?: number;
  }): Promise<car[]> {
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

    if (filters.minYear) {
      query += ` AND year >= $${paramIndex}`;
      values.push(filters.minYear);
      paramIndex++;
    }

    if (filters.maxYear) {
      query += ` AND year <= $${paramIndex}`;
      values.push(filters.maxYear);
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

    if (filters.color && filters.color.length > 0) {
      // Use parentheses to properly group OR conditions
      const colorConditions = filters.color
        .map(() => {
          const condition = `color ILIKE $${paramIndex}`;
          paramIndex++;
          return condition;
        })
        .join(" OR ");

      query += ` AND (${colorConditions})`;
      filters.color.forEach((color) => {
        values.push(`%${color}%`);
      });
    }

    if (filters.mileagemin) {
      query += ` AND mileage >= $${paramIndex}`;
      values.push(filters.mileagemin);
      paramIndex++;
    }

    if (filters.mileagemax) {
      query += ` AND mileage <= $${paramIndex}`;
      values.push(filters.mileagemax);
      paramIndex++;
    }

    query += " ORDER BY created_at DESC";

    console.log("Query:", query, values);

    const result = await pool.query(query, values);
    // console.log("Result:", result.rows);
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
