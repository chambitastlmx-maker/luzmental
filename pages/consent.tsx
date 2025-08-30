// trigger redeploy
import AppShell from '@/components/AppShell'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardBody } from '@/components/Card'
import { PrimaryButton } from '@/components/PrimaryButton'
import { useRouter } from 'next/router'



export default function Consent() {
  const router = useRouter(); 
  return (
  <AppShell>
    <PageHeader
      title="Consentimiento informado"
      subtitle="Plataforma de tamizaje LuzMental"
    />

    <Card>
      <CardBody>
        <p>
          Este cuestionario es parte de una investigación académica para detectar
          posibles síntomas de depresión en estudiantes universitarios. Tus respuestas
          son anónimas y no se almacenará información personal identificable (PII).
        </p>
        <ul>
          <li>Participación voluntaria y puedes abandonar en cualquier momento.</li>
          <li>No hay riesgos previsibles; si te sientes mal, por favor detente.</li>
          <li>Los datos se almacenan de forma anónima y con políticas de privacidad.</li>
        </ul>
        <p>
          Al continuar, confirmas que has leído y aceptas participar.
        </p>

        <div className="mt-6">
          <PrimaryButton onClick={() => router.push('/quiz/1')}>
            Acepto y deseo continuar
          </PrimaryButton>
        </div>
      </CardBody>
    </Card>
  </AppShell>
)
}
