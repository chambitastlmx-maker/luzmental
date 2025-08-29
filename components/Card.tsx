'use client'
import React from 'react'

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div className="border-b border-slate-100 p-5">
      {kicker ? <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{kicker}</div> : null}
      <h2 className="mt-1 text-lg font-semibold leading-tight text-slate-900">{title}</h2>
    </div>
  )
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}
