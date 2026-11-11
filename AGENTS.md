# Convenciones de FacturApp

## Contexto

- Aplicación React con Vite y módulos ES.
- Comandos principales: `npm run dev`, `npm run build` y `npm run preview`.
- Dependencias actuales: React, React DOM, Vite, `@vitejs/plugin-react` y `jspdf`.
- `Proyecto/` conserva la versión Java original; la aplicación activa está en `src/`.

## Arquitectura por capas

- `src/domain`: entidades y reglas de negocio de las facturas. No debe depender de React ni de detalles de infraestructura.
- `src/application`: casos de uso que coordinan operaciones como guardar, filtrar y cambiar el estado de una factura.
- `src/infrastructure`: adaptadores externos, generación de PDF, persistencia actual en memoria y mapeos de registros.
- `src/presentation`: componentes y páginas React; gestiona la interfaz, eventos y navegación.
- `src/shared`: utilidades reutilizables, como formateadores de moneda y fechas.

## Reglas de cambio

- Realiza cambios pequeños y enfocados; no mezcles refactorizaciones no relacionadas.
- Conserva la separación por capas y reutiliza las funciones existentes antes de duplicar lógica.
- Evita agregar dependencias si la funcionalidad puede resolverse con las herramientas actuales.
- No agregues credenciales, tokens, archivos `.env` ni configuraciones de servicios que aún no estén implementados.
- Después de modificar el proyecto, ejecuta `npm run build` y corrige cualquier error de compilación.
- No modifiques la implementación Java de `Proyecto/` al trabajar en la aplicación React, salvo que se solicite expresamente.
