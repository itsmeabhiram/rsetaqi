import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Droplets, Gauge } from "lucide-react"

interface EnvironmentalMetricsProps {
  temperature: number
  humidity: number
  pressure: number
}

export default function EnvironmentalMetrics({ temperature, humidity, pressure }: EnvironmentalMetricsProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Environmental Conditions</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {temperature} <span className="text-sm font-normal text-muted-foreground">°C</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {humidity} <span className="text-sm font-normal text-muted-foreground">%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Air Pressure</CardTitle>
            <Gauge className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pressure} <span className="text-sm font-normal text-muted-foreground">hPa</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

