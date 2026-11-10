export const initialInvoice = {
  invoiceNumber: 'FAC-0001',
  issueDate: '2026-11-03',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  equipmentType: 'Impresora',
  equipmentBrand: 'Epson',
  equipmentModel: 'L3110',
  equipmentSerial: '',
  diagnosis: '',
  notes: '',
  status: 'Pendiente',
  items: [{ type: 'service', description: '', quantity: 1, unitPrice: 0 }],
}

export const demoInvoices = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    invoiceNumber: 'FAC-0024',
    issueDate: '2026-11-03',
    customerName: 'Papelería El Faro',
    customerPhone: '300 456 7890',
    equipmentModel: 'Epson L3110',
    total: 185000,
    status: 'Pagada',
    items: [{ type: 'service', description: 'Mantenimiento general', quantity: 1, unitPrice: 185000 }],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    invoiceNumber: 'FAC-0023',
    issueDate: '2026-11-02',
    customerName: 'Carolina Martínez',
    customerPhone: '315 222 1044',
    equipmentModel: 'Canon G3000',
    total: 95000,
    status: 'Pendiente',
    items: [{ type: 'service', description: 'Limpieza y revisión', quantity: 1, unitPrice: 95000 }],
  },
]

export function calculateInvoiceTotal(items = []) {
  return items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0)
}

export function normalizeInvoice(invoice) {
  return {
    ...initialInvoice,
    ...invoice,
    items: invoice.items?.length
      ? invoice.items.map((item) => ({ ...item }))
      : initialInvoice.items.map((item) => ({ ...item })),
  }
}

export function createInvoice(invoice) {
  const normalized = normalizeInvoice(invoice)
  return {
    ...normalized,
    id: normalized.id || crypto.randomUUID(),
    total: calculateInvoiceTotal(normalized.items),
    status: normalized.status || 'Pendiente',
  }
}

export function toggleInvoicePayment(invoice) {
  return createInvoice({
    ...invoice,
    status: invoice.status === 'Pagada' ? 'Pendiente' : 'Pagada',
  })
}
