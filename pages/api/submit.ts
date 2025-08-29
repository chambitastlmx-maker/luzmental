import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import type { SubmitPayload } from '@/types';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(url, serviceRole, { auth: { persistSession: false } });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const payload = req.body as SubmitPayload;
    if (!payload?.questionnaire_id || !payload?.session_id) {
      res.status(400).send('Missing questionnaire_id or session_id');
      return;
    }

    // Insert response
    const { data: resp, error: rerr } = await supabase
      .from('responses')
      .insert({
        questionnaire_id: payload.questionnaire_id,
        session_id: payload.session_id,
      })
      .select('id')
      .single();

    if (rerr || !resp) {
      console.error(rerr);
      res.status(500).send('Error inserting response');
      return;
    }

    const items = payload.items ?? [];
    const rows = [];
    for (const it of items) {
      if (!it) continue;
      // If multi, expand to multiple rows
      if (it.option_ids && Array.isArray(it.option_ids)) {
        for (const oid of it.option_ids) {
          rows.push({
            response_id: resp.id,
            question_id: it.question_id,
            option_id: oid,
            answer_value: null,
            answer_text: null,
          });
        }
      } else {
        rows.push({
          response_id: resp.id,
          question_id: it.question_id,
          option_id: it.option_id ?? null,
          answer_value: it.answer_value ?? null,
          answer_text: it.answer_text ?? null,
        });
      }
    }

    if (rows.length) {
      const { error: ierr } = await supabase.from('response_items').insert(rows);
      if (ierr) {
        console.error(ierr);
        res.status(500).send('Error inserting response items');
        return;
      }
    }

    res.status(200).json({ ok: true, response_id: resp.id });
  } catch (e: any) {
    console.error(e);
    res.status(500).send('Server error');
  }
}
