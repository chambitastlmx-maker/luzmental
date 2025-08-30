import useSWR from 'swr'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Legend } from 'recharts'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}

export default function AdminDashboard() {
  const { data } = useSWR('/api/admin/metrics', fetcher, { refreshInterval: 15000 })
  const daily = data?.daily ?? []
  const risk = data?.risk ?? []
  const avg = data?.avg ?? []
  const totals = data?.totals ?? { total_responses: 0, last_24h: 0, avg_score: 0 }

  return (
    <main className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold">LuzMental · Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total respuestas" value={totals.total_responses ?? 0} />
        <StatCard label="Últimas 24h" value={totals.last_24h ?? 0} />
        <StatCard label="Puntaje promedio" value={(totals.avg_score ?? 0).toFixed(2)} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Respuestas por día</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily}>
                <XAxis dataKey="day" tickFormatter={(d)=> new Date(d).toLocaleDateString()} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="responses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Nivel de riesgo</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie dataKey="count" data={risk} outerRadius={100} label />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 rounded-2xl shadow bg-white lg:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Promedio diario</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={avg}>
                <XAxis dataKey="day" tickFormatter={(d)=> new Date(d).toLocaleDateString()} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avg_score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  )
}
