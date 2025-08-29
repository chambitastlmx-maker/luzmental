'use client'
import React from 'react'

export function PrimaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
