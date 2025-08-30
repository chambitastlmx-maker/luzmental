export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">LuzMental</div>
          <div className="text-sm text-slate-600"><a href="/privacy" className="hover:underline">Privacidad</a></div>
        </div>
      </nav>
      <div className="mx-auto max-w-3xl px-4">{children}</div>
      <footer className="mt-8 border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LuzMental · Hecho con ❤️
      </footer>
    </>
  )
}
