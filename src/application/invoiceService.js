import { createInvoice, toggleInvoicePayment, finalizeDemoServiceOrder } from '../domain/invoice/invoice'

// Guarda una factura nueva o reemplaza la versión existente usando su ID.
export function saveInvoice(invoices, invoice) {
  const existing = invoices.find(item => item.id === invoice.id)
  if (existing?.lifecycleStatus === 'finalized') throw new Error('No se puede editar una orden finalizada')
  const saved = createInvoice(invoice)
  const exists = invoices.some((item) => item.id === saved.id)
  return exists
    ? invoices.map((item) => item.id === saved.id ? saved : item)
    : [saved, ...invoices]
}

// Caso de uso para alternar el estado de pago de una factura.
export function togglePaidInvoice(invoices, invoice) {
  if (invoice.lifecycleStatus !== 'finalized') throw new Error('Finaliza la orden antes de registrar pagos')
  const changed = toggleInvoicePayment(invoice)
  return invoices.map(item => item.id === invoice.id ? changed : item)
}

// Calcula los indicadores que consume el dashboard.
export function getInvoiceStats(invoices) {
  return {
    count: invoices.length,
    total: invoices.reduce((sum, invoice) => sum + invoice.total, 0),
    pending: invoices.filter((invoice) => invoice.status === 'Pendiente').length,
  }
}

// Filtra el historial por texto y por estado de pago.
export function filterInvoices(invoices, query, statusFilter) {
  return invoices.filter((invoice) => {
    const matchesQuery = `${invoice.invoiceNumber} ${invoice.customerName} ${invoice.equipmentModel}`
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === 'Pagada'
    return matchesQuery && matchesStatus
  })
}

// Solo demostración: la numeración real se asignará transaccionalmente desde Supabase.
export function finalizeDemoOrder(invoices, invoice) {
  const finalized = finalizeDemoServiceOrder(invoices, invoice);
  return invoices.map(item => item.id === invoice.id ? finalized : item);
}
