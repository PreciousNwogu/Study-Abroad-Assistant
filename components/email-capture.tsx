"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

interface EmailCaptureProps {
  onSubmit: (email: string) => void
}

export function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && email.includes("@")) {
      onSubmit(email.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-3">
      <div className="flex space-x-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1"
          required
        />
        <Button type="submit" disabled={!email.trim() || !email.includes("@")}>
          <Mail className="w-4 h-4 mr-1" />
          Send List
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        We'll send you a comprehensive list of recommended universities and visa information.
      </p>
    </form>
  )
}
