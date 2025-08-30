import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [{ data: daily }, { data: risk }, { data: avg }, { data: totals }] = await Promise.all([
    supabaseAdmin.from('stats_daily').select('*').order('day', { ascending: true }),
    supabaseAdmin.from('stats_risk_distribution').select('*'),
    supabaseAdmin.from('stats_avg_score_daily').select('*').order('day', { ascending: true }),
    supabaseAdmin.rpc('get_totals')
  ])

  return res.status(200).json({ daily, risk, avg, totals })
}
