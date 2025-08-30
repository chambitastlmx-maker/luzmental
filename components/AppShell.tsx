'use client'
import React from 'react'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative">
      {/* Skip link para accesibilidad */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only bg-indigo-600 text-white px-4 py-2 rounded-md absolute top-2 left-2 z-50"
      >
        Saltar al contenido
      </a>

      {/* Patrón de fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(20px 20px at 10% 10%, rgba(0,0,0,0.04) 2px, transparent 2px) 0 0 / 40px 40px',
        }}
      />

      {/* Contenido principal */}
      <div id="contenido" className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}
