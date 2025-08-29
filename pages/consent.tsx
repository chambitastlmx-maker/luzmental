import Link from 'next/link';

export default function Consent() {
  return (
    <main>
      <h1>Consentimiento informado</h1>
      <p>
        Este cuestionario es parte de una investigación académica para detectar posibles
        síntomas de depresión en estudiantes universitarios. Tus respuestas son anónimas
        y no se almacenará información personal identificable (PII).
      </p>
      <ul>
        <li>Participación voluntaria y puedes abandonar en cualquier momento.</li>
        <li>No hay riesgos previsibles; si te sientes mal, por favor detente.</li>
        <li>Los datos se almacenan de forma anónima y con políticas de privacidad.</li>
      </ul>
      <p>
        Al continuar, confirmas que has leído y aceptas participar.
      </p>
      <Link href="/quiz/1" style={{display:'inline-block', padding:'10px 16px', border:'1px solid #ccc', borderRadius:8, textDecoration:'none'}}>Continuar</Link>
    </main>
  );
}
