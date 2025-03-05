import { cva } from "class-variance-authority"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const aqiColorVariants = cva("", {
  variants: {
    level: {
      good: "bg-green-500 text-green-50",
      moderate: "bg-yellow-500 text-yellow-50",
      unhealthyForSensitive: "bg-orange-500 text-orange-50",
      unhealthy: "bg-red-500 text-red-50",
      veryUnhealthy: "bg-purple-500 text-purple-50",
      hazardous: "bg-rose-900 text-rose-50",
    },
  },
  defaultVariants: {
    level: "good",
  },
})

const getAqiLevel = (aqi: number) => {
  if (aqi <= 50) return "good"
  if (aqi <= 100) return "moderate"
  if (aqi <= 150) return "unhealthyForSensitive"
  if (aqi <= 200) return "unhealthy"
  if (aqi <= 300) return "veryUnhealthy"
  return "hazardous"
}

const getAqiText = (aqi: number) => {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

interface AqiDisplayProps {
  aqi: number
}

export default function AqiDisplay({ aqi }: AqiDisplayProps) {
  const level = getAqiLevel(aqi)
  const text = getAqiText(aqi)

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Air Quality Index</h2>
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn("flex h-40 w-40 flex-col items-center justify-center rounded-md", aqiColorVariants({ level }))}
        >
          <span className="text-5xl font-bold">{aqi}</span>
          <span className="text-sm font-medium">AQI</span>
        </div>
        <div className="mt-4 text-center">
          <p className="text-2xl font-semibold">{text}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 text-sm font-medium">AQI Scale</h3>
        <div className="flex h-8 w-full rounded-md overflow-hidden">
          <div className="bg-green-500 h-full flex-1 text-center text-xs text-green-50 flex items-center justify-center">
            <span className="hidden sm:inline">Good</span>
            <span className="sm:hidden">0-50</span>
          </div>
          <div className="bg-yellow-500 h-full flex-1 text-center text-xs text-yellow-50 flex items-center justify-center">
            <span className="hidden sm:inline">Moderate</span>
            <span className="sm:hidden">51-100</span>
          </div>
          <div className="bg-orange-500 h-full flex-1 text-center text-xs text-orange-50 flex items-center justify-center">
            <span className="hidden sm:inline">Unhealthy for Sensitive</span>
            <span className="sm:hidden">101-150</span>
          </div>
          <div className="bg-red-500 h-full flex-1 text-center text-xs text-red-50 flex items-center justify-center">
            <span className="hidden sm:inline">Unhealthy</span>
            <span className="sm:hidden">151-200</span>
          </div>
          <div className="bg-purple-500 h-full flex-1 text-center text-xs text-purple-50 flex items-center justify-center">
            <span className="hidden sm:inline">Very Unhealthy</span>
            <span className="sm:hidden">201-300</span>
          </div>
          <div className="bg-rose-900 h-full flex-1 text-center text-xs text-rose-50 flex items-center justify-center">
            <span className="hidden sm:inline">Hazardous</span>
            <span className="sm:hidden">301+</span>
          </div>
        </div>
        <div className="flex justify-between text-xs mt-1 px-1 text-muted-foreground">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>300</span>
          <span>500</span>
        </div>
      </div>
    </div>
  )
}

