# Web de Boda - Daniel & Raquel

Web minimalista con React + Vite para la boda de Daniel, Raquel y Catalina.

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## Stack
- React 18 + Vite + TailwindCSS v4
- Framer Motion + React Hook Form
- Deploy: Netlify

## Estructura
```
src/
├── components/sections/    # Hero, Catalina, EventDetails, RSVP, OurStory
├── components/ui/         # Button, Card, CountdownTimer
├── data/weddingData.js    # Datos centralizados
└── public/images/         # Fotos 1.jpg a 8.jpg
```

## Fotos
- **1.jpg**: Hero (fondo)
- **2,4,6.jpg**: Our Story 
- **3.jpg**: Event Details
- **5,7,8.jpg**: Catalina Section

## Funcionalidades
- Countdown timer en tiempo real
- Formulario RSVP → Google Sheets
- Mapa Google Maps desplegable
- Timeline con línea vertical
- Responsive design completo

## Configuración
- Datos: editar `src/data/weddingData.js`
- Fotos: reemplazar en `public/images/`
- Deploy: Netlify
