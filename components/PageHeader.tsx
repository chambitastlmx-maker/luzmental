'use client'
import React from 'react'

export function PageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow">
          {/* Corazón en SVG simple */}
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M12 21s-6.716-4.159-9.428-7.29C.777 11.709 1.091 8.7 3.293 7.11 5.09 5.82 7.6 6.163 9 7.8c1.4-1.637 3.91-1.98 5.707-.69 2.202 1.59 2.516 4.599.721 6.6C18.716 16.841 12 21 12 21z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
        <span className="mt-0.5">🛡️</span>
        <p>
          Este es un <strong>tamiz anónimo</strong>. No sustituye atención clínica. Si te sientes en riesgo, busca ayuda profesional.
        </p>
      </div>
    </header>
  )
}
