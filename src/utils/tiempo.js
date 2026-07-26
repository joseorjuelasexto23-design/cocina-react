/**
 * Reglas de espera de la cocina, expresadas en MINUTOS porque es
 * la unidad que envía el backend (calculada con TIMESTAMPDIFF).
 *
 * Los umbrales viven aquí y no repartidos por los componentes:
 * son una regla del negocio, no un detalle visual. Si el dueño
 * decide que 8 minutos ya es urgente, se cambia en un solo lugar.
 */
export const UMBRAL_TIBIO = 5    // minutos
export const UMBRAL_URGENTE = 10

/** 'fresco' | 'tibio' | 'urgente' según los minutos de espera. */
export function nivelEspera(minutos) {
  if (minutos >= UMBRAL_URGENTE) return 'urgente'
  if (minutos >= UMBRAL_TIBIO) return 'tibio'
  return 'fresco'
}

/** Etiqueta corta de espera: 0 → "recién", 1 → "1 min", 7 → "7 min". */
export function etiquetaEspera(minutos) {
  if (minutos <= 0) return 'recién'
  return `${minutos} min`
}
