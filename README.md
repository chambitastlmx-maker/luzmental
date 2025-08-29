# Lucy Screening App Starter

Starter Next.js 14 + TypeScript con Supabase para un cuestionario anónimo.

## Rápido inicio
1) Clona o descarga este repo.
2) Copia `.env.example` a `.env.local` y rellena tus claves.
3) Ejecuta `npm i` y luego `npm run dev`.
4) Abre `http://localhost:3000/consent` y continúa al cuestionario.

## Páginas
- `/consent`: consentimiento informado.
- `/quiz/[id]`: renderiza preguntas/opciones desde Supabase y envía al API.
- `/thank-you`: confirmación.

## API
- `POST /api/submit`: recibe el payload de respuestas y guarda en `responses` y `response_items` usando la service role key (solo en el servidor).

## Supabase
- Ejecuta `supabase/policies.sql` en tu editor SQL para RLS.
- Opcional: `supabase/seed_phq9.sql` para poblar un cuestionario de muestra (PHQ-9 demo).
