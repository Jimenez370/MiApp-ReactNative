# FinanTrack — finanzas personales (demo)

Primera versión móvil diseñada para iPhone, con **React Native, Expo SDK 58, Expo Router y JavaScript**.

## Funcionalidades

- **Inicio:** saldo disponible, ingresos, gastos y resumen mensual.
- **Movimientos:** historial con filtro por tipo y formulario para agregar ingresos/gastos.
- **Estadísticas:** evolución semanal y categorías de gasto.
- **Presupuestos:** límites de demostración y barras de progreso.
- Datos ficticios, en **pesos mexicanos (MXN)** y en español. Se reinician al cerrar o recargar la app.

No hay autenticación, backend, base de datos ni conexión a cuentas bancarias.

## Requisitos

- Node.js compatible con Expo SDK 58 (Node 22.13+, 24.3+ o 26+).
- Windows o macOS y un editor (por ejemplo Antigravity).
- Un iPhone para probar la interfaz y una instalación de Expo Go **compatible con SDK 58**.

> **Nota para iPhone físico:** durante la transición de SDK 58 (octubre-noviembre de 2026), Expo Go de la App Store puede ser una versión anterior. Si aparece un error de incompatibilidad de SDK, el proyecto no se puede abrir en esa instalación de Expo Go. No cambies manualmente la versión de una dependencia. Consulta https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/ . Una alternativa es una development build con EAS o instalar un Expo Go compatible a través de TestFlight/\`eas go\` con los requisitos de Apple, hasta que la versión de la App Store sea compatible.

## Iniciar

\`\`\`bash
npm ci
npx expo start
\`\`\`

Con el iPhone y la computadora conectados a la misma Wi-Fi, escanea el QR usando la cámara del teléfono y abre el proyecto en **Expo Go compatible**. Si hay problemas de conexión, prueba:

\`\`\`bash
npx expo start --tunnel
\`\`\`

## Comprobaciones

\`\`\`bash
npx expo-doctor@latest
npx expo export --platform ios --output-dir dist-test
\`\`\`

## Estructura

\`\`\`text
src/
  app/                  # 4 pantallas de Expo Router (.jsx)
  components/finantrack/ # componentes y formulario
  constants/            # colores y categorías
  context/              # estado temporal de movimientos
  data/                 # datos de demostración
  utils/                # formato MXN y cálculos
\`\`\`

Los activos y componentes de ejemplo anteriores se conservan sin usarse para facilitar una transición gradual. La ruta de ejemplo \`src/app/explore.jsx\` se elimina de las rutas activas porque ya no pertenece a la navegación de FinanTrack.

## Notas

- El \`app.json\` está configurado para iOS y iPhone.
- Los íconos de la app y de lanzamiento siguen siendo temporales (assets de Expo); se personalizarán más adelante.
- Los presupuestos son valores demo; todavía no se pueden editar.
- Para publicar una app independiente en App Store se necesitará una compilación y firma iOS.

## Iconos

Los iconos de la interfaz utilizan `expo-symbols` (SF Symbols nativos de iOS), ya incluido en Expo SDK 58. Se usa un componente reutilizable `src/components/finantrack/finance-icon.jsx` y se definen nombres de iconos por categoría en `src/constants/finantrack.js`. No se necesitan dependencias nuevas.
