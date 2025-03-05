"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function PiDatabaseSetup() {
  const [dbPath, setDbPath] = useState("/home/pi/air_quality.db")
  const [interval, setInterval] = useState("10")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("success")
    setMessage("Configuration saved. Database connection established.")
    // In a real app, you would send this configuration to your backend
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Raspberry Pi Database Setup</CardTitle>
          <CardDescription>Configure the connection to your Raspberry Pi SQLite database</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="db-path">Database Path</Label>
              <Input
                id="db-path"
                value={dbPath}
                onChange={(e) => setDbPath(e.target.value)}
                placeholder="/path/to/your/database.db"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interval">Refresh Interval (seconds)</Label>
              <Input
                id="interval"
                type="number"
                min="1"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              />
            </div>
            {status === "success" && <div className="p-3 rounded-md bg-green-500/20 text-green-600">{message}</div>}
            {status === "error" && <div className="p-3 rounded-md bg-red-500/20 text-red-600">{message}</div>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Save Configuration
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

