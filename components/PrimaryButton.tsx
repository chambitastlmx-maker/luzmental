'use client'
import React from 'react'

export function PrimaryButton(
  { children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className={`inline-flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-white shadow
      transition duration-200 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-0
      focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
