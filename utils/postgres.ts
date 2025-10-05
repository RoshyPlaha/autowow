import { Pool } from "pg";
import { Car } from "../models/car";

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
  async insert(car: Omit<Car, "id" | "created_at">): Promise<Car> {
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
  async getAll(): Promise<Car[]> {
    const query = "SELECT * FROM cars ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  },

  // Get car by ID
  async getById(id: number): Promise<Car | null> {
    const query = "SELECT * FROM cars WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Get car by VIN
  async getByVin(vin: string): Promise<Car | null> {
    const query = "SELECT * FROM cars WHERE vin = $1";
    const result = await pool.query(query, [vin]);
    return result.rows[0] || null;
  },

  // Search cars by make and model
  async searchByMakeModel(make: string, model: string): Promise<Car[]> {
    const query =
      "SELECT * FROM cars WHERE make ILIKE $1 AND model ILIKE $2 ORDER BY created_at DESC";
    const result = await pool.query(query, [`%${make}%`, `%${model}%`]);
    return result.rows;
  },

  // Update car
  async update(id: number, updates: Partial<Car>): Promise<Car | null> {
    const fields = Object.keys(updates).filter(
      (key) => key !== "id" && key !== "created_at"
    );
    const setClause = fields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(", ");

    if (!setClause) {
      throw new Error("No fields to update");
    }

    const query = `UPDATE cars SET ${setClause} WHERE id = $1 RETURNING *`;
    const values = [id, ...fields.map((field) => updates[field as keyof Car])];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  // Delete car
  async delete(id: number): Promise<boolean> {
    const query = "DELETE FROM cars WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
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
  }): Promise<Car[]> {
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
