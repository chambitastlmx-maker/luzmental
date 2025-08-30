'use client'
import React from 'react'
import Link from 'next/link'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header fijo */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3">
          {/* Logo / badge */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
              L
            </span>
            <span className="font-semibold text-slate-900">LuzMental</span>
          </Link>

          {/* Nav futura */}
          <nav className="text-sm text-slate-600">
            <Link href="/consent" className="hover:text-indigo-600">
              Consentimiento
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main id="contenido" className="flex-1 mx-auto w-full max-w-3xl px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LuzMental · Proyecto académico.  
        <br />
        <Link href="/thank-you" className="text-indigo-600 hover:underline">
          Contacto / Info
        </Link>
      </footer>
    </div>
  )
}
