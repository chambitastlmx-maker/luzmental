import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import QuestionRenderer from '@/components/QuestionRenderer';
import type { Question, Option, SubmitPayload } from '@/types';

function getSessionId() {
  let id = typeof window !== 'undefined' ? localStorage.getItem('session_uuid') : null;
  if (!id && typeof window !== 'undefined') {
    id = crypto.randomUUID();
    localStorage.setItem('session_uuid', id);
  }
  return id ?? 'unknown-session';
}

export default function Quiz() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const sessionId = useMemo(getSessionId, []);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      // Fetch questions
      const { data: qs, error: qerr } = await supabase
        .from('questions')
        .select('*')
        .eq('questionnaire_id', Number(id))
        .order('id', { ascending: true });
      if (qerr) { console.error(qerr); setLoading(false); return; }
      setQuestions(qs ?? []);
      const qIds = (qs ?? []).map(q => q.id);
      if (qIds.length) {
        const { data: opts, error: oerr } = await supabase
          .from('options')
          .select('*')
          .in('question_id', qIds)
          .order('id', { ascending: true });
        if (oerr) { console.error(oerr); setLoading(false); return; }
        setOptions(opts ?? []);
      } else {
        setOptions([]);
      }
      setLoading(false);
    })();
  }, [id]);

  const optionsByQ = useMemo(() => {
    const map: Record<number, Option[]> = {};
    for (const o of options) {
      map[o.question_id] = map[o.question_id] || [];
      map[o.question_id].push(o);
    }
    return map;
  }, [options]);

  const updateAnswer = (qid: number, val: any) => {
    setAnswers(prev => ({ ...prev, [qid]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: SubmitPayload = {
      questionnaire_id: Number(id),
      session_id: sessionId,
      items: questions.map(q => {
        const v = answers[q.id] || {};
        return {
          question_id: q.id,
          option_id: v.option_id,
          option_ids: v.option_ids,
          answer_value: v.answer_value,
          answer_text: v.answer_text,
        };
      }),
    };

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/thank-you');
    } else {
      const t = await res.text();
      alert('Error al enviar: ' + t);
    }
  };

  if (loading) return <p>Cargando…</p>;
  if (!questions.length) return <p>No hay preguntas para este cuestionario.</p>;

  return (
    <main>
      <h1>Cuestionario #{String(id)}</h1>
      <form onSubmit={handleSubmit}>
        {questions.map(q => (
          <div key={q.id} style={{marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #eee'}}>
            <QuestionRenderer
              question={q}
              options={optionsByQ[q.id] ?? []}
              value={answers[q.id]}
              onChange={(val)=>updateAnswer(q.id, val)}
            />
          </div>
        ))}
        <button type="submit" style={{padding:'10px 16px', border:'1px solid #ccc', borderRadius:8}}>Enviar</button>
      </form>
    </main>
  );
}
