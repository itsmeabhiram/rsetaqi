import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Shield, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react"

interface HealthRecommendationProps {
  aqi: number
}

export default function HealthRecommendation({ aqi }: HealthRecommendationProps) {
  const { title, icon, recommendations } = getHealthRecommendation(aqi)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <div>{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-0.5 text-muted-foreground">•</div>
              <div>{recommendation}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function getHealthRecommendation(aqi: number) {
  if (aqi <= 50) {
    return {
      title: "Good Air Quality - Enjoy Your Activities",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      recommendations: [
        "Air quality is considered satisfactory, and air pollution poses little or no risk.",
        "Ideal conditions for outdoor activities and exercise.",
        "No special precautions needed for the general population.",
      ],
    }
  } else if (aqi <= 100) {
    return {
      title: "Moderate Air Quality - Use Caution",
      icon: <Shield className="h-5 w-5 text-yellow-500" />,
      recommendations: [
        "Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.",
        "Unusually sensitive people should consider reducing prolonged or heavy exertion outdoors.",
        "It's still good for most outdoor activities.",
      ],
    }
  } else if (aqi <= 150) {
    return {
      title: "Unhealthy for Sensitive Groups - Take Precautions",
      icon: <ShieldAlert className="h-5 w-5 text-orange-500" />,
      recommendations: [
        "Members of sensitive groups may experience health effects.",
        "People with heart or lung disease, older adults, and children should reduce prolonged or heavy outdoor exertion.",
        "Consider moving longer or more intense activities indoors or rescheduling them.",
      ],
    }
  } else if (aqi <= 200) {
    return {
      title: "Unhealthy Air Quality - Limit Outdoor Activities",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      recommendations: [
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
        "People with heart or lung disease, older adults, and children should avoid prolonged or heavy exertion.",
        "Everyone else should reduce prolonged or heavy exertion outdoors.",
        "Consider staying indoors and keeping windows closed.",
      ],
    }
  } else if (aqi <= 300) {
    return {
      title: "Very Unhealthy Air Quality - Avoid Outdoor Activities",
      icon: <ShieldX className="h-5 w-5 text-purple-500" />,
      recommendations: [
        "Health warnings of emergency conditions. The entire population is more likely to be affected.",
        "People with heart or lung disease, older adults, and children should avoid all physical activity outdoors.",
        "Everyone else should avoid prolonged or heavy exertion.",
        "Stay indoors and keep activity levels low.",
        "Keep windows and doors closed.",
        "Use air purifiers if available.",
      ],
    }
  } else {
    return {
      title: "Hazardous Air Quality - Stay Indoors",
      icon: <ShieldX className="h-5 w-5 text-rose-900" />,
      recommendations: [
        "Health alert: everyone may experience more serious health effects.",
        "Everyone should avoid all outdoor physical activity.",
        "Remain indoors and keep activity levels low.",
        "Keep all windows and doors closed.",
        "Use air purifiers if available.",
        "Consider wearing N95 masks if you must go outside.",
        "Follow public health authority recommendations.",
      ],
    }
  }
}

