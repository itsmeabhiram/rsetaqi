"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { HistoricalData } from "@/lib/types"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

interface HistoricalChartProps {
  historicalData: HistoricalData
}

export default function HistoricalChart({ historicalData }: HistoricalChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="aqi">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
            <TabsTrigger value="aqi">AQI</TabsTrigger>
            <TabsTrigger value="pm25">PM2.5</TabsTrigger>
            <TabsTrigger value="pm10">PM10</TabsTrigger>
            <TabsTrigger value="voc">VOC</TabsTrigger>
            <TabsTrigger value="no2">NO₂</TabsTrigger>
            <TabsTrigger value="so2">SO₂</TabsTrigger>
            <TabsTrigger value="co">CO</TabsTrigger>
          </TabsList>
          <TabsContent value="aqi">
            <ChartDisplay data={historicalData.aqi} dataKey="value" label="AQI" />
          </TabsContent>
          <TabsContent value="pm25">
            <ChartDisplay data={historicalData.pm25} dataKey="value" label="PM2.5" unit="μg/m³" />
          </TabsContent>
          <TabsContent value="pm10">
            <ChartDisplay data={historicalData.pm10} dataKey="value" label="PM10" unit="μg/m³" />
          </TabsContent>
          <TabsContent value="voc">
            <ChartDisplay data={historicalData.voc} dataKey="value" label="VOC" unit="ppb" />
          </TabsContent>
          <TabsContent value="no2">
            <ChartDisplay data={historicalData.no2} dataKey="value" label="NO₂" unit="ppb" />
          </TabsContent>
          <TabsContent value="so2">
            <ChartDisplay data={historicalData.so2} dataKey="value" label="SO₂" unit="ppb" />
          </TabsContent>
          <TabsContent value="co">
            <ChartDisplay data={historicalData.co} dataKey="value" label="CO" unit="ppm" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface ChartDisplayProps {
  data: Array<{ time: string; value: number }>
  dataKey: string
  label: string
  unit?: string
}

function ChartDisplay({ data, dataKey, label, unit = "" }: ChartDisplayProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="h-[300px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={true}
            tickFormatter={(value, index) => {
              // Show fewer ticks for better readability
              return index % 3 === 0 ? value : ""
            }}
            label={{ value: "Time", position: "insideBottomRight", offset: -5 }}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={true}
            tickFormatter={(value) => `${value}`}
            label={{ value: unit, angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">{label}:</div>
                      <div className="font-medium">
                        {payload[0].value} {unit}
                      </div>
                      <div className="text-muted-foreground">Date:</div>
                      <div className="text-muted-foreground">{formatDate(payload[0].payload.time)}</div>
                      <div className="text-muted-foreground">Time:</div>
                      <div className="text-muted-foreground">{formatTime(payload[0].payload.time)}</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1 }}
            activeDot={{ r: 6, style: { fill: "#0ea5e9", opacity: 0.8 } }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

