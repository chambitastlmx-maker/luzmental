'use client'
import React from 'react'

export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)))
  return (
    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full bg-slate-900 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
