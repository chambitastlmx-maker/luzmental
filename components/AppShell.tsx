'use client'
import React from 'react'
import Link from 'next/link'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
      {/* Skip link para accesibilidad */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only bg-brand text-white px-4 py-2 rounded-md absolute top-2 left-2 z-50"
      >
        Saltar al contenido
      </a>

      {/* Header fijo */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white font-bold shadow">
              L
            </span>
            <span className="font-semibold text-slate-900">LuzMental</span>
          </Link>
          <nav className="text-sm text-slate-600 flex items-center gap-4">
            <Link href="/consent" className="hover:text-brand">Consentimiento</Link>
          </nav>
        </div>
      </header>

      {/* Patrón de fondo (detrás del contenido) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(20px 20px at 10% 10%, rgba(0,0,0,0.04) 2px, transparent 2px) 0 0 / 40px 40px',
        }}
      />

      {/* Contenido principal */}
      <main id="contenido" className="flex-1 mx-auto w-full max-w-3xl px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LuzMental · Proyecto académico
      </footer>
    </div>
  )
}
