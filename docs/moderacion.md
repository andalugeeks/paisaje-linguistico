# Moderación: denuncias, bloqueos y borrado de cuentas

La app móvil cumple las normas de App Review **1.2** (contenido generado por usuarios) y
**5.1.1(v)** (borrado de la cuenta desde la app) así:

| Requisito | Cómo se cumple |
|---|---|
| Filtrar contenido inaceptable | El formulario "Corpus" tiene *require approval*: nada se publica sin revisión manual. |
| Denunciar contenido | ⚠️ en el pie de cada publicación (también sin sesión) y en su menú `⋯`. |
| Bloquear usuarios | Mismo menú, con sesión. Oculta en ese dispositivo las publicaciones del usuario y avisa a los admins. |
| Contacto publicado | Perfil → "Contâtto y çoporte" (`andalugeeks@gmail.com`). |
| Borrar la cuenta | Perfil → "Borrâh mi cuenta" (con sesión). |

La API de Ushahidi **no permite que un usuario se borre a sí mismo**, así que la app no
borra nada: registra una **solicitud** que procesa un admin. Apple lo acepta si el plazo se
comunica (lo hace la app) y se confirma al usuario cuando está hecho.

## La encuesta "Solicitudes" (configuración, una sola vez)

Todas las denuncias, bloqueos y solicitudes de borrado llegan como publicaciones de una
encuesta (formulario) privada de Ushahidi:

1. En el panel de Ushahidi: **Ajustes → Encuestas → Añadir encuesta**.
2. Nombre: `Solicitudes a AndaluGeeks (denuncias y borrado de cuenta)`.
   Descripción: `Uso interno: la app crea aquí las denuncias de contenido, los bloqueos de
   usuarios y las solicitudes de borrado de cuenta.`
3. Campos: solo **Título** y **Descripción** (los que trae por defecto). No añadas campos
   obligatorios: la app solo rellena esos dos.
4. Opciones: **Requiere revisión antes de publicarse: sí** (así solo lo ven los admins) y
   **Quién puede añadir: todo el mundo** (las denuncias pueden ser anónimas).
5. Guarda y apunta el **ID** de la encuesta (aparece en la URL al editarla, `…/settings/surveys/update/<ID>`).
6. Pon ese ID en `apps/mobile-mzima-client/src/env.json` → `"moderation_survey_id": <ID>`.

La app oculta esa encuesta al crear aportaciones y en los filtros del mapa. El cliente
web de Ushahidi sí lo muestra en "Añadir publicación"; sirve también como canal para
quien use la web.

## Procesar las solicitudes

Revisa la encuesta "Solicitudes" en el panel (filtro *En revisión*). Cada entrada lleva en
el título su tipo:

- **`[DENUNCIA] Publicación #N`** (plazo comprometido: **72 horas**). Abre la publicación
  `#N`, y si incumple las normas, archívala o bórrala. Si el autor reincide, desactiva o
  borra su usuario.
- **`[BLOQUEO] Usuario #N`**. El bloqueo ya es efectivo en el dispositivo de quien lo hizo.
  Revisa las publicaciones de ese usuario por si hay algo que retirar.
- **`[BORRADO DE CUENTA] Usuario #N`** (plazo comprometido: **30 días**). La descripción
  dice si el usuario quiere **conservar sus publicaciones sin su nombre** o **borrarlas**, y
  a qué email avisar.
  1. Si quiere borrarlas: borra sus publicaciones (Datos → filtrar por autor).
  2. Borra el usuario (Ajustes → Usuarios).
  3. Escríbele al email indicado confirmando que su cuenta se ha borrado.

Cuando termines, archiva la entrada de "Solicitudes" para dejar constancia.
