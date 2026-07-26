export function PantallaVacia() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <p className="text-6xl font-black tracking-tight text-stone-700">
        Todo al día
      </p>
      <p className="text-lg font-semibold text-stone-600">
        Los pedidos nuevos aparecen aquí automáticamente.
      </p>
    </div>
  )
}
