import Head from 'next/head'
import AppShell from '@/components/AppShell'
import { Card, CardBody } from '@/components/Card'

export default function ThankYou() {
  return (
    <AppShell>
      <Head>
        <title>Gracias – LuzMental</title>
        <meta name="description" content="Gracias por responder el tamiz." />
      </Head>

      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold text-slate-900">¡Gracias!</h1>
          <p className="mt-2 text-slate-600">
            Tu respuesta fue registrada. Cuida de tu bienestar emocional 💙
          </p>
        </CardBody>
      </Card>
    </AppShell>
  )
}
