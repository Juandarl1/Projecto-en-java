import { createInvoice, toggleInvoicePayment } from '../domain/invoice/invoice'

// Guarda una factura nueva o reemplaza la versión existente usando su ID.
export function saveInvoice(invoices, invoice) {
  const saved = createInvoice(invoice)
  const exists = invoices.some((item) => item.id === saved.id)
  return exists
    ? invoices.map((item) => item.id === saved.id ? saved : item)
    : [saved, ...invoices]
}

// Caso de uso para alternar el estado de pago de una factura.
export function togglePaidInvoice(invoices, invoice) {
  return saveInvoice(invoices, toggleInvoicePayment(invoice))
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
