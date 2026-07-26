import { BarraEstado } from './components/BarraEstado'
import { PantallaVacia } from './components/PantallaVacia'
import { TarjetaPedido } from './components/TarjetaPedido'
import { useCocinaSSE } from './hooks/useCocinaSSE'

export default function App() {
  const { pedidos, conectado } = useCocinaSSE()

  // El backend ya los ordena del más antiguo al más reciente
  // (ORDER BY fecha_creacion ASC), así que se muestran tal cual:
  // el pedido más viejo, el que hay que sacar ya, queda arriba.

  return (
    <div className="flex h-full flex-col">
      <BarraEstado cantidad={pedidos.length} conectado={conectado} />

      <main className="flex-1 overflow-y-auto p-6">
        {pedidos.length === 0 ? (
          <PantallaVacia />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {pedidos.map((pedido) => (
              <TarjetaPedido key={pedido.id} pedido={pedido} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
