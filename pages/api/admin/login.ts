import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body as { token?: string }
  if (!token || token !== process.env.ADMIN_DASH_TOKEN) {
    return res.status(401).json({ ok: false })
  }
  res.setHeader('Set-Cookie', serialize('ADMIN_DASH_TOKEN', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60*60*8, // 8h
  }))
  return res.status(200).json({ ok: true })
}
