import sqlite3 from "sqlite3"
import { open } from "sqlite"

// This script would run on your Raspberry Pi to create and populate the database

async function setupDatabase() {
  // Open a database connection
  const db = await open({
    filename: "air_quality.db",
    driver: sqlite3.Database,
  })

  console.log("Creating database schema...")

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS sensor_readings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      aqi INTEGER NOT NULL,
      voc REAL NOT NULL,
      pm25 REAL NOT NULL,
      pm10 REAL NOT NULL,
      pm1 REAL NOT NULL,
      no2 REAL NOT NULL,
      so2 REAL NOT NULL,
      co REAL NOT NULL,
      temperature REAL NOT NULL,
      humidity REAL NOT NULL,
      pressure REAL NOT NULL
    )
  `)

  console.log("Database schema created successfully.")

  // Insert some sample data
  console.log("Inserting sample data...")

  // Current timestamp
  const now = new Date().toISOString()

  // Insert current reading
  await db.run(
    `
    INSERT INTO sensor_readings (
      timestamp, aqi, voc, pm25, pm10, pm1, no2, so2, co, temperature, humidity, pressure
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [now, 75, 120, 18.5, 42, 8.2, 32, 15, 0.8, 22.5, 45, 1013],
  )

  // Insert historical data (24 hours)
  for (let i = 1; i <= 24; i++) {
    const pastTime = new Date(Date.now() - i * 60 * 60 * 1000).toISOString()

    // Add some random variation to the values
    const randomFactor = 0.8 + Math.random() * 0.4 // Between 0.8 and 1.2

    await db.run(
      `
      INSERT INTO sensor_readings (
        timestamp, aqi, voc, pm25, pm10, pm1, no2, so2, co, temperature, humidity, pressure
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        pastTime,
        Math.round(75 * randomFactor),
        Math.round(120 * randomFactor),
        Math.round(18.5 * randomFactor * 10) / 10,
        Math.round(42 * randomFactor),
        Math.round(8.2 * randomFactor * 10) / 10,
        Math.round(32 * randomFactor),
        Math.round(15 * randomFactor),
        Math.round(0.8 * randomFactor * 10) / 10,
        Math.round(22.5 * randomFactor * 10) / 10,
        Math.round(45 * randomFactor),
        Math.round(1013 * randomFactor),
      ],
    )
  }

  console.log("Sample data inserted successfully.")

  // Create a function to simulate sensor readings
  console.log("Setting up a function to simulate real-time sensor readings...")

  function simulateReading() {
    const randomFactor = 0.9 + Math.random() * 0.2 // Between 0.9 and 1.1

    return {
      timestamp: new Date().toISOString(),
      aqi: Math.round(75 * randomFactor),
      voc: Math.round(120 * randomFactor),
      pm25: Math.round(18.5 * randomFactor * 10) / 10,
      pm10: Math.round(42 * randomFactor),
      pm1: Math.round(8.2 * randomFactor * 10) / 10,
      no2: Math.round(32 * randomFactor),
      so2: Math.round(15 * randomFactor),
      co: Math.round(0.8 * randomFactor * 10) / 10,
      temperature: Math.round(22.5 * randomFactor * 10) / 10,
      humidity: Math.round(45 * randomFactor),
      pressure: Math.round(1013 * randomFactor),
    }
  }

  // Example of how to insert a new reading every 10 seconds
  console.log("Example: Inserting a new reading every 10 seconds (press Ctrl+C to stop)")

  // Insert one reading immediately
  const reading = simulateReading()
  await db.run(
    `
    INSERT INTO sensor_readings (
      timestamp, aqi, voc, pm25, pm10, pm1, no2, so2, co, temperature, humidity, pressure
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      reading.timestamp,
      reading.aqi,
      reading.voc,
      reading.pm25,
      reading.pm10,
      reading.pm1,
      reading.no2,
      reading.so2,
      reading.co,
      reading.temperature,
      reading.humidity,
      reading.pressure,
    ],
  )

  console.log("New reading inserted:", reading)

  // In a real application, you would set up an interval:
  // setInterval(async () => {
  //   const reading = simulateReading();
  //   await db.run(`
  //     INSERT INTO sensor_readings (
  //       timestamp, aqi, voc, pm25, pm10, pm1, no2, so2, co, temperature, humidity, pressure
  //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //   `, [
  //     reading.timestamp, reading.aqi, reading.voc, reading.pm25, reading.pm10,
  //     reading.pm1, reading.no2, reading.so2, reading.co, reading.temperature,
  //     reading.humidity, reading.pressure
  //   ]);
  //   console.log('New reading inserted:', reading);
  // }, 10000);

  console.log("Database setup complete!")
  console.log("In a real application, you would connect this to actual sensors.")
  console.log("To use this database with your Next.js app:")
  console.log("1. Make sure your Raspberry Pi is accessible from your Next.js server")
  console.log("2. Update the database path in your Next.js app")
  console.log("3. Implement the fetchAirQualityData function to query this database")
}

setupDatabase().catch(console.error)

