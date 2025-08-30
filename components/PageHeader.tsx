import React from 'react'

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow">
          {/* corazón sencillo */}
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M12 21s-6.7-4.16-9.43-7.29C.78 11.7 1.1 8.7 3.3 7.1c1.8-1.3 4.3-1 5.7.7 1.4-1.7 3.9-2 5.7-.7 2.2 1.6 2.5 4.6.7 6.6C18.72 16.84 12 21 12 21z"/>
          </svg>
        </span>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            LuzMental
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 !opacity-100">
            {title}
          </h1>
          {subtitle && <p className="mt-0.5 text-lg text-slate-600">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
        <span>🛡️</span>
        <p>Este es un <strong>tamiz anónimo</strong>. No sustituye atención clínica.</p>
      </div>
    </header>
  )
}
