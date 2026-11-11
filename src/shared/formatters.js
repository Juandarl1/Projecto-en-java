// Formatea valores monetarios con la moneda y convenciones de Colombia.
export const money = (value) => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
}).format(Number(value) || 0)

// Formatea fechas de factura para mostrarlas de manera legible en la interfaz.
export const formatDate = (date) => new Intl.DateTimeFormat('es-CO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(`${date}T12:00:00`))
