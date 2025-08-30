'use client'
import React from 'react'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative">
      {/* patrón muy suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          background:
            'radial-gradient(20px 20px at 10% 10%, rgba(0,0,0,0.04) 2px, transparent 2px) 0 0 / 40px 40px',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}
