# FacturApp

Aplicación web para técnicos independientes que realizan mantenimiento y reparación
de impresoras. Permite crear facturas con los datos del cliente, equipo atendido,
diagnóstico, repuestos, servicios realizados y valores detallados.

## Desarrollo

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Flujo actual

- Crear una factura con número y fecha de emisión.
- Registrar persona o empresa, teléfono, correo y dirección.
- Identificar el equipo por tipo, marca, referencia y número de serie.
- Añadir servicios y repuestos con cantidad, valor unitario y total automático.
- Guardar diagnóstico, notas, estado de pago y consultar el historial.
- Generar y descargar cada factura como archivo PDF.
- Editar una factura desde su número o referencia de equipo.
- Cambiar el estado entre pendiente y pagada desde el historial.
- Identificar cada factura con un UUID único.

Los registros nuevos incluyen una propiedad `record` con nombres de columnas en
`snake_case`, lista para conectarse posteriormente a Supabase. La transformación
está centralizada en `src/infrastructure/invoiceRecordMapper.js`.

## Arquitectura por capas

- `src/domain`: entidades y reglas de negocio de las facturas.
- `src/application`: casos de uso para guardar, filtrar y actualizar facturas.
- `src/infrastructure`: generación de PDF, límite de persistencia y mapeo preparado para Supabase.
- `src/presentation`: componentes y páginas React.
- `src/shared`: formateadores reutilizables.

## Acceso de demostración

- Usuario: `admin`
- Contraseña: `1234`

La carpeta `Proyecto/` conserva la implementación original en Java como referencia
durante la migración.
