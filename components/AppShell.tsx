'use client'
import React from 'react'
import Link from 'next/link'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
      {/* Header… (si ya lo tienes) */}

      {/* 🔧 Patrón de fondo: detrás del contenido */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(20px 20px at 10% 10%, rgba(0,0,0,0.04) 2px, transparent 2px) 0 0 / 40px 40px',
        }}
      />

      <main id="contenido" className="flex-1 mx-auto w-full max-w-3xl px-4 py-8">
        {children}
      </main>

      {/* Footer… (si ya lo tienes) */}
    </div>
  )
}
