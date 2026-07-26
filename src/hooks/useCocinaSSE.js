import { useEffect, useRef, useState } from 'react'

/**
 * Conecta con cocina_stream.php (Server-Sent Events) y mantiene
 * la lista de pedidos pendientes.
 *
 * Se eligió SSE y no WebSockets porque el flujo es unidireccional
 * (servidor → pantalla): SSE viaja sobre HTTP normal, EventSource
 * reconecta solo y no exige un proceso adicional en el equipo del local.
 *
 * El backend emite, cada vez que cambia algo:
 *   data: {"status":"success","data":[
 *     {
 *       "id": 3,
 *       "mesa": "Mesa 3",
 *       "hora": "16:17",
 *       "minutos": 4,
 *       "mesero": "Andrés",
 *       "items": [{ "producto": "Caldo - Costilla", "cantidad": 1, "notas": null }]
 *     }
 *   ]}
 *
 * El tiempo de espera lo calcula MySQL con TIMESTAMPDIFF y llega como
 * `minutos`. Se usa ese valor en vez de recalcular en el cliente, para
 * que la espera coincida con la del backend sin importar la hora del
 * navegador.
 */
export function useCocinaSSE(url = '/api/includes/cocina_stream.php') {
  const [pedidos, setPedidos] = useState([])
  const [conectado, setConectado] = useState(false)
  const fuenteRef = useRef(null)

  useEffect(() => {
    const fuente = new EventSource(url)
    fuenteRef.current = fuente

    fuente.onopen = () => setConectado(true)

    fuente.onmessage = (evento) => {
      try {
        const payload = JSON.parse(evento.data)
        const lista = payload?.data ?? (Array.isArray(payload) ? payload : [])
        setPedidos(lista.map(normalizarPedido))
        setConectado(true)
      } catch {
        // Un evento malformado no debe tumbar la pantalla:
        // se ignora y se espera el siguiente.
      }
    }

    fuente.onerror = () => {
      // EventSource reintenta solo. Se marca desconectado para avisar
      // a la cocina que los datos podrían estar desactualizados.
      setConectado(false)
    }

    return () => fuente.close()
  }, [url])

  return { pedidos, conectado }
}

/** Da forma uniforme a cada pedido para los componentes. */
function normalizarPedido(crudo) {
  return {
    id: crudo.id,
    mesa: crudo.mesa ?? 'Sin mesa',
    mesero: crudo.mesero ?? '',
    hora: crudo.hora ?? '--:--',
    // El backend ya lo calculó con TIMESTAMPDIFF (en minutos).
    minutos: Number(crudo.minutos ?? 0),
    items: (crudo.items ?? []).map((item, indice) => ({
      clave: `${crudo.id}-${indice}`,
      nombre: item.producto ?? '',
      cantidad: Number(item.cantidad ?? 1),
      notas: item.notas || null,
    })),
  }
}
