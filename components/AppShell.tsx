'use client'
import React from 'react'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  )
}
