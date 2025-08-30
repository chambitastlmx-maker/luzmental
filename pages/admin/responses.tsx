import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

export default function Responses() {
  const { data } = useSWR('/api/admin/responses', fetcher)
  const rows = data?.rows ?? []

  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Respuestas</h1>
      <div className="overflow-auto rounded-2xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Response</th>
              <th className="px-3 py-2 text-left">Cuestionario</th>
              <th className="px-3 py-2 text-left">Fecha</th>
              <th className="px-3 py-2 text-left">Total</th>
              <th className="px-3 py-2 text-left">Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r:any)=> (
              <tr key={r.response_id} className="border-t">
                <td className="px-3 py-2">{r.response_id}</td>
                <td className="px-3 py-2">{r.questionnaire_id}</td>
                <td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td>
                <td className="px-3 py-2">{r.total_score}</td>
                <td className="px-3 py-2">{r.risk_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
