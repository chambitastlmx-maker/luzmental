'use client'
import React from 'react'
import { Card, CardBody } from './Card'

export type Option = { id: number; text: string; value?: number }

export function QuestionCard({
  index,
  total,
  text,
  name,
  options,
  value,
  onChange,
}: {
  index: number
  total: number
  text: string
  name: string
  options: Option[]
  value?: number | string
  onChange: (optId: number) => void
}) {
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="mb-3 text-sm font-medium text-slate-500">Pregunta {index} de {total}</div>
        <h3 className="mb-4 text-base font-semibold text-slate-900">{text}</h3>
        <fieldset className="grid gap-2">
          {options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                String(value) === String(opt.id)
                  ? 'border-slate-900 bg-slate-900/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.id}
                checked={String(value) === String(opt.id)}
                onChange={() => onChange(opt.id)}
                className="h-4 w-4 accent-slate-900"
              />
              <span className="text-sm text-slate-800">{opt.text}</span>
            </label>
          ))}
        </fieldset>
      </CardBody>
    </Card>
  )
}
