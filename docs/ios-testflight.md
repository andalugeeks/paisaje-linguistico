# App iOS: compilación en la nube y TestFlight

La app móvil (`apps/mobile-mzima-client`, Capacitor 8) se compila para iOS sin Mac
propio: el workflow [`ios-testflight.yml`](../.github/workflows/ios-testflight.yml)
corre en un runner `macos-26-intel` de GitHub Actions (Xcode 26.6), firma con la **firma
gestionada en la nube** de Xcode usando una API Key de App Store Connect y sube la
build a TestFlight.

## Cuándo se ejecuta

- A mano: Actions → *iOS TestFlight* → *Run workflow*.
- Solo en push a `main` que toque `apps/mobile-mzima-client/**`, `libs/**`,
  `package*.json` o el propio workflow. Nunca en PRs ni en forks (no tienen secretos).

## Pasos del workflow

1. Build web con Node 18 (Nx 16 / Angular 14): `nx build mobile-mzima-client --configuration=production`.
2. `npx cap sync ios` con Node 22 (Capacitor 8), que ejecuta `pod install`.
3. `xcodebuild archive` **sin firmar** (`CODE_SIGNING_ALLOWED=NO`, con
   `DEVELOPMENT_TEAM` y `CURRENT_PROJECT_VERSION`).
4. `xcodebuild -exportArchive` (`method` = `app-store-connect`, `signingStyle` =
   `automatic`) con `-allowProvisioningUpdates` y la API Key: aquí es donde se firma,
   con el certificado de distribución gestionado en la nube y el perfil de
   aprovisionamiento que Xcode crea o reutiliza. No hay certificados ni perfiles en el repo.
5. `xcrun altool --upload-app` con la misma API Key.
6. Se guardan como artifacts los logs de xcodebuild y el `Podfile.lock` resuelto. El `.ipa`
   no se guarda: en un repo público cualquier usuario con sesión podría descargarlo, y
   lleva dentro el token de Mapbox.

Número de build (`CFBundleVersion`): `<run_number>.<run_attempt>`, siempre creciente.
La versión (`MARKETING_VERSION`) se mantiene alineada a mano con `versionName` de
`android/app/build.gradle`.

## Configuración en Apple (una sola vez)

- Equipo: *AndaluGeeks Team*, Team ID `LAWPFLVDHJ` (va en el `project.pbxproj` y en el workflow).
- App ID explícito `es.andaluh.paisaje` registrado en developer.apple.com → Identifiers.
- App creada en App Store Connect con ese bundle ID.
- API Key de equipo con rol **Admin** (App Store Connect → Usuarios y acceso →
  Integraciones → App Store Connect API).
- TestFlight: grupo de **Pruebas internas** con distribución automática. Los testers
  individuales de una build requieren Beta App Review; los internos no.

## Secretos de GitHub

| Secreto | Contenido |
|---|---|
| `ASC_KEY_P8` | Contenido del fichero `AuthKey_XXXX.p8` |
| `ASC_KEY_ID` | Key ID de la API Key |
| `ASC_ISSUER_ID` | Issuer ID (UUID) de App Store Connect |
| `MAPBOX_MOBILE_TOKEN` | Token público de Mapbox **sin restricción de URL** para las apps (en iOS la WebView sirve desde `capacitor://localhost`, que las restricciones de URL rechazan). Se inyecta en `env.json` solo durante el build; no está en el repo |

```sh
R=andalugeeks/paisaje-linguistico
gh secret set ASC_KEY_P8 -R $R < AuthKey_XXXX.p8
gh secret set ASC_KEY_ID -R $R
gh secret set ASC_ISSUER_ID -R $R
gh secret set MAPBOX_MOBILE_TOKEN -R $R
```

El `.p8` solo se puede descargar una vez: guárdalo fuera del repo. El workflow lo escribe
en el runner y lo borra al terminar, pase lo que pase.

## Notas

- `ITSAppUsesNonExemptEncryption = false` en `Info.plist` evita el aviso
  "Missing Compliance" en cada build: la app solo usa HTTPS.
- El proyecto iOS sigue con CocoaPods (Capacitor 8 crea proyectos SPM por defecto, pero
  respeta los existentes). El iOS mínimo es 15.0.
- **Límite de certificados.** El archive no firma a propósito. Si firmara con
  `-allowProvisioningUpdates`, Xcode crearía un certificado de desarrollo nuevo
  ("Created via API") en cada runner limpio. Así se llegó al límite del equipo y los
  archives empezaron a fallar con "Choose a certificate to revoke". Los 10 acumulados
  se revocaron el 2026-11-16. Si vuelve a pasar, revisa en developer.apple.com →
  Certificates que ningún paso, salvo el export, firme con la API Key.
- **Runner Intel.** En noviembre de 2026 el pool macOS arm64 de GitHub no tenía
  capacidad y los jobs se cancelaban a los 15 min sin runner ("The job was not acquired
  by Runner of type hosted even after multiple attempts"). Por eso se usa
  `macos-26-intel`, que trae el mismo Xcode 26.6 (`/Applications/Xcode_26.6.app`). Se
  puede volver a `macos-26` cuando el pool arm64 se recupere.
