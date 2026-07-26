/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Negro cálido: menos fatiga visual que el negro puro
        // en una pantalla encendida todo el día.
        carbon: '#141210',
        panel: '#1F1B18',
        borde: '#332C26',
        // Estados de espera del pedido
        fresco: '#3FA372',
        tibio: '#D9A441',
        urgente: '#D9483B',
        marca: '#D27D2D',
      },
      fontFamily: {
        // Sin fuentes remotas: la pantalla debe arrancar
        // aunque el local se quede sin internet.
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        entrada: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        latido: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.45' },
        },
      },
      animation: {
        entrada: 'entrada .32s ease-out',
        latido: 'latido 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
