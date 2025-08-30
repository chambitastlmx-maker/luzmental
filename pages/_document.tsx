import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body>
        {/* (opcional) enlace de salto para teclado */}
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-2 rounded">
          Saltar al contenido
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
