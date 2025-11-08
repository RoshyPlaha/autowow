#!/bin/bash

# Script to update the seed data from vehicles.json
# Run this script whenever you modify vehicles.json

echo "🔄 Updating seed data from vehicles.json..."

# Check if jq is available
if command -v jq &> /dev/null; then
    echo "✅ jq found, generating SQL from JSON..."
    
    # Generate the SQL INSERT statements
    echo "-- Auto-generated SQL from vehicles.json" > seed-from-json.sql
    echo "-- Generated on: $(date)" >> seed-from-json.sql
    echo "" >> seed-from-json.sql
    echo "-- Seed the database with vehicle data from JSON" >> seed-from-json.sql
    echo "DO \$\$" >> seed-from-json.sql
    echo "DECLARE" >> seed-from-json.sql
    echo "    car_count INTEGER;" >> seed-from-json.sql
    echo "BEGIN" >> seed-from-json.sql
    echo "    -- Get count of existing cars" >> seed-from-json.sql
    echo "    SELECT COUNT(*) INTO car_count FROM cars;" >> seed-from-json.sql
    echo "    " >> seed-from-json.sql
    echo "    -- Only seed if table is empty" >> seed-from-json.sql
    echo "    IF car_count = 0 THEN" >> seed-from-json.sql
    echo "        -- Insert vehicles from JSON data" >> seed-from-json.sql
    
    # Process each vehicle in the JSON file
    jq_filter="
      def sql_str(s):
        if s == null or s == \"\" then \"NULL\"
        else \"'\" + (s | gsub(\"'\"; \"''\")) + \"'\"
        end;

      def sql_num(n):
        if n == null or n == \"\" then \"NULL\"
        else (n | tostring)
        end;

      .[] |
        \"        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES (\" +
        sql_str(.vin) + \", \" +
        sql_str(.make) + \", \" +
        sql_str(.model) + \", \" +
        sql_num(.year) + \", \" +
        sql_num(.engine_cc) + \", \" +
        sql_str(.color) + \", \" +
        sql_num(.mileage) + \", \" +
        sql_num(.price) + \");\"
    "

    jq -r "$jq_filter" vehicles.json >> seed-from-json.sql
    
    echo "" >> seed-from-json.sql
    echo "        RAISE NOTICE 'Successfully seeded database with vehicles from JSON data';" >> seed-from-json.sql
    echo "    ELSE" >> seed-from-json.sql
    echo "        RAISE NOTICE 'Database already contains % vehicles, skipping seed', car_count;" >> seed-from-json.sql
    echo "    END IF;" >> seed-from-json.sql
    echo "END \$\$;" >> seed-from-json.sql
    
    echo "✅ Generated seed-from-json.sql from vehicles.json"
else
    echo "⚠️  jq not found. Please install jq to auto-generate SQL from JSON."
    echo "   On macOS: brew install jq"
    echo "   On Ubuntu: sudo apt-get install jq"
    echo ""
    echo "   For now, using the existing seed-from-json.sql file."
fi

echo ""
echo "📋 To apply changes:"
echo "   1. Stop the database: npm run db:stop"
echo "   2. Reset the database: npm run db:reset"
echo "   3. Or manually: cd localDB && docker-compose down -v && docker-compose up -d"
echo ""
echo "🎯 The database will be automatically seeded when containers start!"
