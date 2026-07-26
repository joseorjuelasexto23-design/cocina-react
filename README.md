<<<<<<< HEAD
# Pantalla de cocina en tiempo real — React + SSE

Interfaz de cocina para restaurante, pensada para un Smart TV: los pedidos aparecen solos cuando el mesero los envía y desaparecen cuando se recogen, sin que nadie toque la pantalla.

Es la reimplementación en **React** de una pantalla que ya opera en un negocio real, consumiendo el mismo backend PHP mediante **Server-Sent Events**.

> Backend del sistema completo: [las-acacias-pos](https://github.com/joseorjuelasexto23-design/las-acacias-pos)

---

## Por qué existe

En el sistema original (PHP + Alpine.js) la pantalla de cocina ya funcionaba. Este repositorio la reconstruye como aplicación React independiente para separar el frontend del backend y trabajar con componentes, hooks y estado del lado del cliente.

El backend no cambió: sigue siendo el mismo endpoint SSE. Eso es lo interesante del ejercicio — la interfaz se puede reemplazar por completo sin tocar el servidor.

---

## Decisiones técnicas

**SSE en lugar de WebSockets.** El flujo es unidireccional: el servidor manda, la pantalla recibe. SSE viaja sobre HTTP normal, `EventSource` reconecta solo si se cae la red, y no exige un proceso extra corriendo en el equipo del local.

**El tiempo de espera lo calcula el backend.** El endpoint envía los minutos ya calculados con `TIMESTAMPDIFF` en MySQL. El cliente los usa tal cual en vez de recalcular desde una fecha: así la espera es la misma que ve el servidor, sin depender de la hora del navegador del TV.

**Los umbrales de espera viven en un módulo aparte.** Cuándo un pedido pasa de "fresco" a "urgente" es una regla del negocio, no un detalle visual: está en `utils/tiempo.js` y no repartida por los componentes.

**Normalización en el borde.** El hook traduce la respuesta del backend a la forma que usan los componentes. Si mañana el endpoint renombra un campo, se ajusta en un solo archivo.

**Sin fuentes remotas.** El local tiene internet inestable; la pantalla debe arrancar igual si se cae. Toda la tipografía es del sistema.

---

## La espera se ve, no se lee

Un cocinero mira la pantalla de reojo, con las manos ocupadas y a varios metros. Por eso el tiempo de espera está codificado en la franja superior de cada tarjeta antes que en el número:

| Estado | Espera | Señal |
|---|---|---|
| Fresco | menos de 5 min | franja verde |
| Tibio | 5 a 10 min | franja ámbar |
| Urgente | más de 10 min | franja roja parpadeante |

Los pedidos llegan ordenados del más antiguo al más reciente: lo que hay que sacar ya, arriba.

---

## Instalación

```bash
npm install
npm run dev
```

Vite queda en `http://localhost:5173` y hace de proxy hacia el backend PHP. Si tu backend no está en `http://localhost/las-acacias`, cambia la constante `BACKEND` en `vite.config.js`.

Requiere el backend corriendo con una sesión válida (el endpoint SSE está protegido por `auth.php`).

---

## Formato de los eventos

El endpoint emite por SSE, cada vez que cambia algo:

```json
{
  "status": "success",
  "data": [
    {
      "id": 3,
      "mesa": "Mesa 3",
      "hora": "16:17",
      "minutos": 4,
      "mesero": "Andrés",
      "items": [
        { "producto": "Caldo - Costilla", "cantidad": 1, "notas": "sin cilantro" }
      ]
    }
  ]
}
```

---

## Estructura

```
src/
├── App.jsx                    # Composición de la pantalla
├── components/
│   ├── BarraEstado.jsx        # Contador, hora y estado de conexión
│   ├── TarjetaPedido.jsx      # Pedido con indicador de espera
│   └── PantallaVacia.jsx
├── hooks/
│   └── useCocinaSSE.js        # Conexión SSE y normalización
└── utils/
    └── tiempo.js              # Umbrales y etiqueta de espera
```

---

## Stack

React 18 · Vite · Tailwind CSS · Server-Sent Events

Sin librerías de estado ni de fetching: es una sola vista con una sola fuente de datos, y `useState` con `useEffect` lo cubren sin agregar dependencias.

---

## Autor

**José Andrés Orjuela Montero** — Ingeniería de Sistemas, UNIMINUTO (Soacha).
Parte de un sistema POS en producción en un negocio real.
=======
# cocina-react
gestion de cocina con React JS
>>>>>>> b91975b4acf6a17e14d8ced7284033717505adeb
