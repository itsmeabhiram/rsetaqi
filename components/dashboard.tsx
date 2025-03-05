"use client"

import { useEffect, useState, useCallback } from "react"
import { fetchAirQualityData } from "@/lib/data"
import type { AirQualityData } from "@/lib/types"
import AqiDisplay from "@/components/aqi-display"
import ParameterGrid from "@/components/parameter-grid"
import EnvironmentalMetrics from "@/components/environmental-metrics"
import HealthRecommendation from "@/components/health-recommendation"
import HistoricalChart from "@/components/historical-chart"
import DataRequestForm from "@/components/data-request-form"

export default function Dashboard() {
  const [data, setData] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const airQualityData = await fetchAirQualityData()
      setData(airQualityData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()

    // Set up interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [fetchData])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-foreground">Failed to load air quality data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 text-foreground md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Air Quality Monitor</h1>
            <p className="text-muted-foreground">Real-time air quality monitoring dashboard</p>
          </div>
          <div className="mt-4 text-right md:mt-0">
            <h2 className="text-lg font-semibold">
              Location: <span className="text-primary">RSET Campus</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(data.timestamp).toLocaleTimeString()} -{" "}
              {new Date(data.timestamp).toLocaleDateString()}
            </p>
          </div>
        </header>

        <div className="mb-8">
          <AqiDisplay aqi={data.aqi} />
        </div>

        <div className="mb-8">
          <ParameterGrid parameters={data.parameters} />
        </div>

        <div className="mb-8">
          <EnvironmentalMetrics
            temperature={data.environmental.temperature}
            humidity={data.environmental.humidity}
            pressure={data.environmental.pressure}
          />
        </div>

        <div className="mb-8">
          <HealthRecommendation aqi={data.aqi} />
        </div>

        <div className="mb-8">
          <HistoricalChart historicalData={data.historical} />
        </div>

        <div>
          <DataRequestForm />
        </div>
      </div>
    </div>
  )
}

