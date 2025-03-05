import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudFog, Leaf, Factory } from "lucide-react"
import type { Parameter } from "@/lib/types"

interface ParameterGridProps {
  parameters: {
    voc: Parameter
    pm25: Parameter
    pm10: Parameter
    pm1: Parameter
    no2: Parameter
    so2: Parameter
    co: Parameter
  }
}

const getStatusColor = (value: number, threshold: number) => {
  if (value <= threshold * 0.5) return "text-green-500"
  if (value <= threshold * 0.75) return "text-yellow-500"
  if (value <= threshold) return "text-orange-500"
  return "text-red-500"
}

export default function ParameterGrid({ parameters }: ParameterGridProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Air Quality Parameters</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ParameterCard
          title="VOC"
          value={parameters.voc.value}
          unit={parameters.voc.unit}
          icon={<Leaf className="h-5 w-5" />}
          status={getStatusColor(parameters.voc.value, parameters.voc.threshold)}
        />
        <ParameterCard
          title="PM2.5"
          value={parameters.pm25.value}
          unit={parameters.pm25.unit}
          icon={<CloudFog className="h-5 w-5" />}
          status={getStatusColor(parameters.pm25.value, parameters.pm25.threshold)}
        />
        <ParameterCard
          title="PM10"
          value={parameters.pm10.value}
          unit={parameters.pm10.unit}
          icon={<CloudFog className="h-5 w-5" />}
          status={getStatusColor(parameters.pm10.value, parameters.pm10.threshold)}
        />
        <ParameterCard
          title="PM1"
          value={parameters.pm1.value}
          unit={parameters.pm1.unit}
          icon={<CloudFog className="h-5 w-5" />}
          status={getStatusColor(parameters.pm1.value, parameters.pm1.threshold)}
        />
        <ParameterCard
          title="NO₂"
          value={parameters.no2.value}
          unit={parameters.no2.unit}
          icon={<Factory className="h-5 w-5" />}
          status={getStatusColor(parameters.no2.value, parameters.no2.threshold)}
        />
        <ParameterCard
          title="SO₂"
          value={parameters.so2.value}
          unit={parameters.so2.unit}
          icon={<Factory className="h-5 w-5" />}
          status={getStatusColor(parameters.so2.value, parameters.so2.threshold)}
        />
        <ParameterCard
          title="CO"
          value={parameters.co.value}
          unit={parameters.co.unit}
          icon={<Factory className="h-5 w-5" />}
          status={getStatusColor(parameters.co.value, parameters.co.threshold)}
        />
      </div>
    </div>
  )
}

interface ParameterCardProps {
  title: string
  value: number
  unit: string
  icon: React.ReactNode
  status: string
}

function ParameterCard({ title, value, unit, icon, status }: ParameterCardProps) {
  const getCardBackground = () => {
    if (status === "text-green-500") return "border-green-500/20 bg-green-500/5"
    if (status === "text-yellow-500") return "border-yellow-500/20 bg-yellow-500/5"
    if (status === "text-orange-500") return "border-orange-500/20 bg-orange-500/5"
    if (status === "text-red-500") return "border-red-500/20 bg-red-500/5"
    return ""
  }

  return (
    <Card className={getCardBackground()}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={status}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${status}`}>
          {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
    </Card>
  )
}

