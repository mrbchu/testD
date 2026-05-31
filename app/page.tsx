"use client"

import React from "react"
import { AppProvider } from "@/lib/context/AppContext"
import DatePlannerApp from "@/components/DatePlanner/DatePlannerApp"

export default function Home() {
  return (
    <AppProvider>
      <main className="min-h-screen bg-transparent">
        <DatePlannerApp />
      </main>
    </AppProvider>
  )
}