"use server"

import type { AirQualityData } from "./types"

// This is a mock function that returns sample data
// In production, replace this with actual database queries
export async function fetchAirQualityData(): Promise<AirQualityData> {
  try {
    // In a real implementation, you would connect to your SQLite database on the Pi
    // const db = await open({
    //   filename: '/path/to/your/database.sqlite',
    //   driver: Database
    // });

    // const latestReadings = await db.get(`
    //   SELECT * FROM sensor_readings
    //   ORDER BY timestamp DESC
    //   LIMIT 1
    // `);

    // const historicalAqi = await db.all(`
    //   SELECT timestamp as time, aqi as value
    //   FROM sensor_readings
    //   ORDER BY timestamp DESC
    //   LIMIT 24
    // `);

    // ... fetch other historical data similarly

    // For now, return mock data
    return getMockData()
  } catch (error) {
    console.error("Error fetching data from database:", error)
    // Return mock data as fallback
    return getMockData()
  }
}

// Mock data for development
function getMockData(): AirQualityData {
  // Generate some random historical data
  const generateHistoricalData = (baseValue: number, variance: number) => {
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date()
      date.setHours(date.getHours() - (23 - i))
      const time = `${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      const value = Math.max(0, baseValue + (Math.random() * variance * 2 - variance))
      return { time, value: Math.round(value * 10) / 10, date: date.toISOString() }
    }).reverse()
  }

  return {
    aqi: 75,
    timestamp: new Date().toISOString(),
    parameters: {
      voc: { value: 120, unit: "ppb", threshold: 200 },
      pm25: { value: 18.5, unit: "μg/m³", threshold: 35 },
      pm10: { value: 42, unit: "μg/m³", threshold: 150 },
      pm1: { value: 8.2, unit: "μg/m³", threshold: 15 },
      no2: { value: 32, unit: "ppb", threshold: 100 },
      so2: { value: 15, unit: "ppb", threshold: 75 },
      co: { value: 0.8, unit: "ppm", threshold: 9 },
    },
    environmental: {
      temperature: 22.5,
      humidity: 45,
      pressure: 1013,
    },
    historical: {
      aqi: generateHistoricalData(75, 20),
      pm25: generateHistoricalData(18.5, 5),
      pm10: generateHistoricalData(42, 10),
      pm1: generateHistoricalData(8.2, 2),
      voc: generateHistoricalData(120, 30),
      no2: generateHistoricalData(32, 8),
      so2: generateHistoricalData(15, 5),
      co: generateHistoricalData(0.8, 0.2),
    },
  }
}

