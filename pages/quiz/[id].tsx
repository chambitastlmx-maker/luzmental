// pages/quiz/[id].tsx
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import QuestionRenderer from '@/components/QuestionRenderer'
import AppShell from '@/components/AppShell'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardBody } from '@/components/Card'
import { PrimaryButton } from '@/components/PrimaryButton'
import { ProgressBar } from '@/components/ProgressBar'
import type { Question, Option, SubmitPayload } from '@/types'

function getSessionId() {
  let id = typeof window !== 'undefined' ? localStorage.getItem('session_uuid') : null
  if (!id && typeof window !== 'undefined') {
    id = crypto.randomUUID()
    localStorage.setItem('session_uuid', id)
  }
  return id ?? 'unknown-session'
}

export default function Quiz() {
  const router = useRouter()
  const { id } = router.query

  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [options, setOptions] = useState<Option[]>([])
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const sessionId = useMemo(getSessionId, [])

  // ---- fetch preguntas + opciones
  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoading(true)
      const { data: qs, error: qerr } = await supabase
        .from('questions')
        .select('*')
        .eq('questionnaire_id', Number(id))
        .order('id', { ascending: true })

      if (qerr) {
        console.error(qerr)
        setQuestions([])
        setOptions([])
        setLoading(false)
        return
      }

      setQuestions(qs ?? [])
      const qIds = (qs ?? []).map((q) => q.id)

      if (qIds.length) {
        const { data: opts, error: oerr } = await supabase
          .from('options')
          .select('*')
          .in('question_id', qIds)
          .order('id', { ascending: true })

        if (oerr) {
          console.error(oerr)
          setOptions([])
        } else {
          setOptions(opts ?? [])
        }
      } else {
        setOptions([])
      }

      setLoading(false)
    })()
  }, [id])

  // ---- indexar opciones por pregunta
  const optionsByQ = useMemo(() => {
    const map: Record<number, Option[]> = {}
    for (const o of options) {
      map[o.question_id] = map[o.question_id] || []
      map[o.question_id].push(o)
    }
    return map
  }, [options])

  // ---- progreso: cuenta respuestas “no vacías”
  const isAnswered = (v: any) =>
    v?.option_id != null ||
    (Array.isArray(v?.option_ids) && v.option_ids.length > 0) ||
    v?.answer_value != null ||
    (typeof v?.answer_text === 'string' && v.answer_text.trim().length > 0)

  const answeredCount = useMemo(
    () => questions.filter((q) => isAnswered(answers[q.id])).length,
    [answers, questions]
  )
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0

  // ---- actualizar respuesta
  const updateAnswer = (qid: number, val: any) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }))
  }

  // ---- enviar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: SubmitPayload = {
      questionnaire_id: Number(id),
      session_id: sessionId,
      items: questions.map((q) => {
        const v = answers[q.id] || {}
        return {
          question_id: q.id,
          option_id: v.option_id,
          option_ids: v.option_ids,
          answer_value: v.answer_value,
          answer_text: v.answer_text,
        }
      }),
    }

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/thank-you')
    } else {
      const t = await res.text()
      alert('Error al enviar: ' + t)
    }
  }

  // ---------------------------
  // SEO (paso 10)
  const title = `Cuestionario #${String(id)} – LuzMental`
  const description = 'Responde el cuestionario de tamizaje (anónimo).'

  // ---------------------------
  // SKELETON (paso 8)
  if (loading) {
    return (
      <AppShell>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={`https://luzmental.vercel.app/quiz/${id ?? ''}`} />
        </Head>

        <PageHeader title={`Cuestionario #${String(id ?? '')}`} subtitle="Cargando preguntas…" />

        <div id="contenido" className="space-y-4">
          <div className="animate-pulse">
            <div className="h-3 w-1/2 rounded bg-slate-200" />
          </div>

          {/* Tarjetas fantasma aproximando el layout */}
          <div className="animate-pulse space-y-4">
            <div className="h-24 rounded-2xl bg-slate-200" />
            <div className="h-24 rounded-2xl bg-slate-200" />
            <div className="h-24 rounded-2xl bg-slate-200" />
          </div>

          <div className="animate-pulse">
            <div className="h-11 w-full rounded-xl bg-slate-200" />
          </div>
        </div>
      </AppShell>
    )
  }

  // mensaje si no hay preguntas
  if (!questions.length) {
    return (
      <AppShell>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>

        <PageHeader title={`Cuestionario #${String(id)}`} subtitle="No hay preguntas disponibles." />
        <Card>
          <CardBody>
            <p className="text-slate-600">No hay preguntas para este cuestionario.</p>
          </CardBody>
        </Card>
      </AppShell>
    )
  }

  // ---------------------------
  // RENDER normal (con a11y sutil – paso 9)
  return (
    <AppShell>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://luzmental.vercel.app/quiz/${id}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <PageHeader
        title={`Cuestionario #${String(id)}`}
        subtitle="Por favor, responde con sinceridad. Puedes salir cuando quieras."
      />

      <div className="mb-4">
        <ProgressBar value={progress} />
        <p className="mt-1 text-xs text-slate-500">
          {answeredCount} de {questions.length} respondidas ({progress}%)
        </p>
      </div>

      <main id="contenido">
        <form onSubmit={handleSubmit} aria-describedby="instrucciones-form">
          <p id="instrucciones-form" className="sr-only">
            Selecciona una opción para cada pregunta y luego presiona Enviar.
          </p>

          <div className="space-y-4">
            {questions.map((q) => (
              <Card key={q.id}>
                <CardBody>
                  {/* QuestionRenderer ya maneja radios/inputs;
                      asegúrate de que internamente use label/fieldset */}
                  <QuestionRenderer
                    question={q}
                    options={optionsByQ[q.id] ?? []}
                    value={answers[q.id]}
                    onChange={(val) => updateAnswer(q.id, val)}
                  />
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <PrimaryButton type="submit">Enviar</PrimaryButton>
            <p className="mt-2 text-center text-xs text-slate-500">
              Este tamiz es orientativo y no sustituye atención profesional.
            </p>
          </div>
        </form>
      </main>
    </AppShell>
  )
}
