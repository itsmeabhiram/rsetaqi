"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DataRequestForm() {
  const [formState, setFormState] = useState({
    name: "",
    uid: "",
    fromDate: "",
    fromTime: "",
    toDate: "",
    toTime: "",
    purpose: "",
    parameter: "all",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, parameter: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formState)
    setStatus("success")

    // Reset form after 3 seconds
    setTimeout(() => {
      setStatus("idle")
      setFormState({
        name: "",
        uid: "",
        fromDate: "",
        fromTime: "",
        toDate: "",
        toTime: "",
        purpose: "",
        parameter: "all",
      })
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Historical Data</CardTitle>
        <CardDescription>Fill out this form to request air quality data for a specific time period</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uid">User ID</Label>
              <Input
                id="uid"
                name="uid"
                value={formState.uid}
                onChange={handleChange}
                placeholder="UID12345"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="parameter">Parameter</Label>
              <Select value={formState.parameter} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parameter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Parameters</SelectItem>
                  <SelectItem value="aqi">AQI</SelectItem>
                  <SelectItem value="pm25">PM2.5</SelectItem>
                  <SelectItem value="pm10">PM10</SelectItem>
                  <SelectItem value="voc">VOC</SelectItem>
                  <SelectItem value="no2">NO₂</SelectItem>
                  <SelectItem value="so2">SO₂</SelectItem>
                  <SelectItem value="co">CO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>From</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="fromDate" className="sr-only">
                    From Date
                  </Label>
                  <Input
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    value={formState.fromDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromTime" className="sr-only">
                    From Time
                  </Label>
                  <Input
                    id="fromTime"
                    name="fromTime"
                    type="time"
                    value={formState.fromTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>To</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="toDate" className="sr-only">
                    To Date
                  </Label>
                  <Input
                    id="toDate"
                    name="toDate"
                    type="date"
                    value={formState.toDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toTime" className="sr-only">
                    To Time
                  </Label>
                  <Input
                    id="toTime"
                    name="toTime"
                    type="time"
                    value={formState.toTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              name="purpose"
              value={formState.purpose}
              onChange={handleChange}
              placeholder="Please describe why you need this data"
              required
            />
          </div>

          {status === "success" && (
            <div className="rounded-md bg-green-500/20 p-3 text-green-600">
              Your request has been submitted successfully. We will process it and get back to you.
            </div>
          )}

          {status === "error" && (
            <div className="rounded-md bg-red-500/20 p-3 text-red-600">
              There was an error submitting your request. Please try again.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

