import Head from 'next/head'
import Link from 'next/link'
import AppShell from '@/components/AppShell'
import { Card, CardBody } from '@/components/Card'

export default function Home() {
  return (
    <AppShell>
      <Head>
        <title>LuzMental</title>
        <meta name="description" content="Plataforma de tamizaje LuzMental." />
      </Head>

      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold text-slate-900">Bienvenida/o</h1>
          <p className="mt-2 text-slate-600">
            Antes de iniciar, por favor revisa el consentimiento informado.
          </p>
          <div className="mt-4">
            <Link href="/consent" className="text-brand hover:underline">
              Ir al consentimiento →
            </Link>
          </div>
        </CardBody>
      </Card>
    </AppShell>
  )
}
