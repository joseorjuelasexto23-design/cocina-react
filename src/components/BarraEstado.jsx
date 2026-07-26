export function BarraEstado({ cantidad, conectado }) {
  const hora = new Date().toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <header className="flex items-center justify-between border-b border-borde px-6 py-4">
      <div className="flex items-baseline gap-4">
        <h1 className="text-2xl font-black uppercase tracking-[0.25em] text-marca">
          Cocina
        </h1>
        <p className="text-sm font-semibold text-stone-500">
          {cantidad === 0
            ? 'Sin pedidos'
            : `${cantidad} ${cantidad === 1 ? 'pedido' : 'pedidos'} en preparación`}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <p className="font-mono text-2xl font-bold tabular-nums text-stone-300">
          {hora}
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${
              conectado ? 'bg-fresco' : 'bg-urgente animate-latido'
            }`}
          />
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
            {conectado ? 'En vivo' : 'Reconectando'}
          </span>
        </div>
      </div>
    </header>
  )
}
