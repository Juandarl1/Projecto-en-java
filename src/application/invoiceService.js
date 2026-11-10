import { createInvoice, toggleInvoicePayment } from '../domain/invoice/invoice'

export function saveInvoice(invoices, invoice) {
  const saved = createInvoice(invoice)
  const exists = invoices.some((item) => item.id === saved.id)
  return exists
    ? invoices.map((item) => item.id === saved.id ? saved : item)
    : [saved, ...invoices]
}

export function togglePaidInvoice(invoices, invoice) {
  return saveInvoice(invoices, toggleInvoicePayment(invoice))
}

export function getInvoiceStats(invoices) {
  return {
    count: invoices.length,
    total: invoices.reduce((sum, invoice) => sum + invoice.total, 0),
    pending: invoices.filter((invoice) => invoice.status === 'Pendiente').length,
  }
}

export function filterInvoices(invoices, query, statusFilter) {
  return invoices.filter((invoice) => {
    const matchesQuery = `${invoice.invoiceNumber} ${invoice.customerName} ${invoice.equipmentModel}`
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === 'Pagada'
    return matchesQuery && matchesStatus
  })
}
