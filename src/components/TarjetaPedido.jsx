import { etiquetaEspera, nivelEspera } from '../utils/tiempo'

const ESTILOS = {
  fresco: { barra: 'bg-fresco', reloj: 'text-fresco', borde: 'border-borde' },
  tibio: { barra: 'bg-tibio', reloj: 'text-tibio', borde: 'border-tibio/40' },
  urgente: {
    barra: 'bg-urgente animate-latido',
    reloj: 'text-urgente',
    borde: 'border-urgente/70',
  },
}

export function TarjetaPedido({ pedido }) {
  const nivel = nivelEspera(pedido.minutos)
  const estilo = ESTILOS[nivel]

  return (
    <article
      className={`animate-entrada overflow-hidden rounded-2xl border bg-panel shadow-lg ${estilo.borde}`}
    >
      {/* La franja superior es el indicador de espera: se lee
          desde el otro lado de la cocina sin mirar el número. */}
      <div className={`h-2 w-full ${estilo.barra}`} />

      <header className="flex items-start justify-between gap-4 px-5 pt-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
            Mesa
          </p>
          <h2 className="truncate text-4xl font-black leading-tight">
            {pedido.mesa}
          </h2>
          {pedido.mesero && (
            <p className="mt-1 text-sm font-semibold text-stone-400">
              {pedido.mesero}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className={`text-2xl font-black tabular-nums ${estilo.reloj}`}>
            {etiquetaEspera(pedido.minutos)}
          </p>
          <p className="text-xs font-semibold text-stone-500">{pedido.hora}</p>
        </div>
      </header>

      <ul className="mt-4 divide-y divide-borde border-t border-borde">
        {pedido.items.map((item) => (
          <li key={item.clave} className="flex items-start gap-3 px-5 py-3">
            <span className="mt-0.5 shrink-0 rounded-md bg-marca px-2 py-0.5 font-mono text-sm font-black text-carbon">
              {item.cantidad}
            </span>
            <div className="min-w-0">
              <p className="text-xl font-bold leading-snug">{item.nombre}</p>
              {item.notas && (
                <p className="mt-0.5 text-base font-semibold text-tibio">
                  {item.notas}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}
