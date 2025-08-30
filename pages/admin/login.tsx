import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [token, setToken] = useState('')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    if (res.ok) router.push('/admin')
    else alert('Token inválido')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white shadow rounded-2xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Acceso Admin</h1>
        <input
          type="password"
          placeholder="Token"
          value={token}
          onChange={(e)=>setToken(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
        <button className="w-full rounded-xl shadow px-4 py-2 bg-black text-white">Entrar</button>
      </form>
    </div>
  )
}
