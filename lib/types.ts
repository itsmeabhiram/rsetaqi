export interface Parameter {
  value: number
  unit: string
  threshold: number
}

// Update the HistoricalData interface to include date
export interface HistoricalData {
  aqi: Array<{ time: string; value: number; date: string }>
  pm25: Array<{ time: string; value: number; date: string }>
  pm10: Array<{ time: string; value: number; date: string }>
  pm1: Array<{ time: string; value: number; date: string }>
  voc: Array<{ time: string; value: number; date: string }>
  no2: Array<{ time: string; value: number; date: string }>
  so2: Array<{ time: string; value: number; date: string }>
  co: Array<{ time: string; value: number; date: string }>
}

// Update the AirQualityData interface to include timestamp
export interface AirQualityData {
  aqi: number
  timestamp: string
  parameters: {
    voc: Parameter
    pm25: Parameter
    pm10: Parameter
    pm1: Parameter
    no2: Parameter
    so2: Parameter
    co: Parameter
  }
  environmental: {
    temperature: number
    humidity: number
    pressure: number
  }
  historical: HistoricalData
}

