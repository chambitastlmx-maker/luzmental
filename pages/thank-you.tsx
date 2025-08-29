import Link from 'next/link';

export default function ThankYou() {
  return (
    <main>
      <h1>¡Gracias!</h1>
      <p>Hemos recibido tus respuestas.</p>
      <Link href="/consent">Volver al inicio</Link>
    </main>
  );
}
