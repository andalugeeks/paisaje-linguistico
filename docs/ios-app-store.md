# Ficha de la App Store (iOS)

La ficha de Paisaje Andalûh se mantiene en el repo y se sube con el workflow
[`ios-app-store.yml`](../.github/workflows/ios-app-store.yml):

- **Textos** (español `es-ES` e inglés `en-US`): `apps/mobile-mzima-client/fastlane/metadata/`.
  Nombre, subtítulo (≤ 30), palabras clave (≤ 100, separadas por comas), texto promocional
  (≤ 170), descripción, URLs de privacidad y soporte, categoría (Educación / Referencia),
  copyright y notas para el revisor.
- **Capturas**: las genera el propio workflow en un simulador de iPhone 17 Pro Max
  (1320×2868, el tamaño de 6,9" que exige Apple) recorriendo la app con
  [Maestro](https://maestro.dev) según `apps/mobile-mzima-client/.maestro/app-store-screenshots.yaml`.
  Son las mismas en los dos idiomas porque la interfaz de la app está en andaluz.
- La app es **solo para iPhone** (`TARGETED_DEVICE_FAMILY = 1`): no hacen falta capturas de iPad.

## Ejecutarlo

Actions → *iOS App Store listing* → *Run workflow*:

- Sin marcar *upload*: solo hace las capturas y las deja como artifact
  `app-store-screenshots` para revisarlas.
- Marcando *upload*: además sube textos y capturas a App Store Connect con
  `fastlane deliver`, sobre la versión indicada en `MARKETING_VERSION`. **Nunca envía la app a
  revisión.** Usa los mismos secretos `ASC_*` que el workflow de TestFlight.

## Lo que hay que hacer a mano en App Store Connect

La API no cubre estas partes. Las respuestas están pensadas para la app tal como es hoy:
sin analítica, sin publicidad, sin Intercom.

### 1. Privacidad de la app (Distribución → Privacidad de la app)

¿Recogéis datos? **Sí.** Ninguno se usa para rastreo (*tracking*).

| Tipo de dato | Para qué | ¿Vinculado a la identidad? |
|---|---|---|
| Información de contacto → Correo electrónico | Funcionalidad de la app | Sí |
| Información de contacto → Nombre | Funcionalidad de la app | Sí |
| Contenido del usuario → Fotos o vídeos | Funcionalidad de la app | Sí |
| Contenido del usuario → Otro contenido del usuario (transcripciones, descripciones, denuncias) | Funcionalidad de la app | Sí |
| Ubicación → Ubicación precisa (la de cada aportación) | Funcionalidad de la app | Sí |
| Identificadores → ID de usuario | Funcionalidad de la app | Sí |

No marques diagnósticos, datos de uso, compras, salud ni contactos: la app no los recoge.
"Vinculado" es sí porque, con cuenta, las aportaciones quedan asociadas a ella; sin cuenta
no se guarda nada que te identifique.

**URL de la política de privacidad:** `https://andaluh.es/politica-privacidad/`. ⚠️ Antes de
enviar a revisión, la página publicada tiene que incluir la sección de Paisaje Andalûh. Hoy
solo está en la web nueva (andaluh.local).

### 2. Clasificación por edades (Información de la app → Clasificación por edades)

- Contenido generado por usuarios: **Sí**. Está moderado: revisión previa, denuncias y bloqueo.
- Mensajería o chat entre usuarios: **No**.
- Publicidad: **No**.
- Acceso web sin restricciones: **No**.
- Violencia, contenido sexual, drogas, juego, terror, etc.: **Ninguno**.
- Lenguaje soez o humor crudo: **Poco frecuente / leve**. Algún grafiti o rótulo puede
  llevarlo, aunque pase por revisión.

Acepta la edad que proponga Apple con esas respuestas.

### 3. Precio y disponibilidad

Gratis. Disponible en todos los países, o como mínimo en España.

### 4. Información de la app

- **Derechos de contenido:** sí, contiene contenido de terceros: las fotos y textos de los
  usuarios, que tienen derecho a publicarlo al aportarlo.
- **Nombre del vendedor:** hoy aparece "Hackules Inc.". Hay que corregirlo con Apple Developer
  Support antes de publicar.

### 5. Revisión de la app (en la versión)

- **Teléfono de contacto:** el workflow no lo rellena; ponlo a mano.
- **Cuenta de demostración:** no hace falta, porque el registro está abierto. Si quieres
  facilitárselo al revisor, crea una cuenta de prueba y añádela.
- **Compilación:** elige la última de TestFlight en el apartado *Compilación*.

Después: *Añadir a revisión* → *Enviar a revisión*.
