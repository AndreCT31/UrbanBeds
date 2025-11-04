# Urban Beds · Hostal de la Montaña

Landing page enfocada en presentar la experiencia de hospedaje de Hostal de la Montaña (Urban Beds). El sitio fue construido con Next.js 15, React 19 y Tailwind CSS 4 para lograr una experiencia fluida, rápida y optimizada para móviles.

## Características principales
- **Hero con video**: fondo en bucle con control de precarga y overlay ajustable para destacar el logotipo y el llamado a la acción.
- **Secciones informativas**: bloques para Nosotros, Alojamientos, Testimonios, Ubicación y Contacto con animaciones de entrada basadas en scroll.
- **Carrusel de habitaciones**: galería con navegación táctil y descripción de amenities.
- **Integración con Google Maps**: mapa estilizado mediante `@react-google-maps/api` para ubicar la propiedad.
- **Accesos rápidos**: botón flotante de WhatsApp y CTA de reserva enlazado a Cloudbeds.
- **Diseño responsive**: navegación móvil colapsable, tipografías fluidas y contenedores adaptados a cualquier ancho de dispositivo.

## Requisitos
- Node.js 18.18+ o 20.x
- npm 9+ (o el gestor equivalente que prefieras)
- API key de Google Maps con acceso al SDK de Maps JavaScript

## Configuración
1. Clona el repositorio y entra al directorio del proyecto.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto y define tu clave de Google Maps:

   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key
   ```

## Scripts disponibles
- `npm run dev`: inicia el servidor de desarrollo en `http://localhost:3000`.
- `npm run build`: genera el build optimizado para producción.
- `npm run start`: sirve el build generado.
- `npm run lint`: ejecuta ESLint sobre el código base.

## Estructura del proyecto
```
public/                 # Activos estáticos (videos, imágenes, íconos)
src/
  app/                  # Entradas del directorio app/ y layout raíz
  components/           # Componentes reutilizables y secciones de la página
    elements/           # Bloques específicos (About, Rooms, Location, etc.)
    ui/                 # UI del sitio (navbar, footer, mobile nav, etc.)
  hooks/                # Hooks personalizados (e.g., animaciones al hacer scroll)
  lib/                  # Contextos y utilidades (precarga de recursos, loading state)

tailwind.config.ts      # Configuración de Tailwind CSS 4
next.config.ts          # Configuración de Next.js
```

## Despliegue
- **Vercel**: el proyecto está listo para desplegarse con un clic. Recuerda añadir `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` como Environment Variable.
- **Servidor propio**: ejecuta `npm run build` y después `npm run start` detrás de tu reverse proxy preferido.

## Buenas prácticas
- Ejecuta `npm run lint` antes de hacer commit para detectar problemas de estilo o accesibilidad.
- Optimiza las imágenes en `public/` para mantener tiempos de carga bajos, especialmente en dispositivos móviles.
- Si agregas nuevas secciones, reutiliza el hook `useScrollReveal` para mantener consistencia en las animaciones.

## Créditos
Proyecto desarrollado con Next.js, React, Tailwind CSS y Lucide Icons. Integraciones adicionales: Cloudbeds para reservas y Google Maps para la localización.
