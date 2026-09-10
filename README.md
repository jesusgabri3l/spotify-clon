# Spotify Clon

Clon del cliente web de Spotify hecho con React + TypeScript, consumiendo la Spotify Web API.

**Demo:** https://spotify-clon-jade.vercel.app

## Restricción técnica de la API de Spotify

Spotify corre las apps nuevas en **Development Mode**, que limita el acceso a un whitelist de hasta 25 usuarios (antes 25, ahora reducido a 5) autorizados manualmente desde el dashboard del desarrollador. Pasar a **Extended Quota Mode** (sin ese límite) hoy requiere que la app pertenezca a una empresa registrada con más de 250,000 usuarios activos mensuales — cerrado para proyectos personales/portfolio.

Esto significa que un visitante cualquiera del portfolio **no puede loguearse** con su cuenta de Spotify para usar la app completa, aunque el código funcione perfectamente.

### Cómo se resolvió

La app usa dos flujos de autenticación distintos según el contexto:

- **Authorization Code + PKCE** (sin client secret expuesto en el frontend): se usa cuando el usuario inicia sesión con su cuenta de Spotify. Da acceso a datos personales — tus playlists, tus tracks guardados ("Tracks you like"), tu perfil.
- **Client Credentials**: se usa automáticamente para cualquier visitante anónimo, vía una función serverless en Vercel (`api/token.ts`) que guarda el `client_secret` del lado del servidor. Da acceso de solo lectura al catálogo público de Spotify — buscar y ver artistas, álbumes, tracks, playlists públicas — sin necesidad de loguearse ni estar en el whitelist.

Por eso en la UI:
- **Home y Search** son navegables por cualquiera, sin login.
- **"Your music" y "Tracks you like"** aparecen deshabilitados con un tooltip explicando el motivo cuando no hay sesión — son endpoints (`me/*`) que Client Credentials no puede leer, porque no representan a ningún usuario real.
- El botón de perfil funciona como trigger de login para quien sí quiera (y pueda) loguearse con su cuenta.

## Stack

- React + TypeScript + Vite
- MobX (estado)
- React Router
- SCSS + Tailwind
- Vercel (hosting + función serverless para Client Credentials)
