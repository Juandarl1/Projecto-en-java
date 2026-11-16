// Valores iniciales usados por el formulario de creación de facturas.
export const initialInvoice = {
  invoiceNumber: null,
  issueDate: [new Date().getFullYear(), String(new Date().getMonth() + 1).padStart(2, '0'), String(new Date().getDate()).padStart(2, '0')].join('-'),
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
  lifecycleStatus: 'draft',
  items: [{ type: 'service', description: '', quantity: 1, unitPrice: 0 }],
}

// Datos de ejemplo para que el prototipo tenga contenido al iniciar.
export const demoInvoices = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    invoiceNumber: 'OS-0024',
    issueDate: '2026-11-03',
    customerName: 'Papelería El Faro',
    customerPhone: '300 456 7890',
    equipmentModel: 'Epson L3110',
    total: 185000,
    status: 'Pagada',
    lifecycleStatus: 'finalized',
    items: [{ type: 'service', description: 'Mantenimiento general', quantity: 1, unitPrice: 185000 }],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    invoiceNumber: 'OS-0023',
    issueDate: '2026-11-02',
    customerName: 'Carolina Martínez',
    customerPhone: '315 222 1044',
    equipmentModel: 'Canon G3000',
    total: 95000,
    status: 'Pendiente',
    lifecycleStatus: 'finalized',
    items: [{ type: 'service', description: 'Limpieza y revisión', quantity: 1, unitPrice: 95000 }],
  },
]

export function calculateInvoiceTotal(items = []) {
  return items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0)
}

// Completa campos faltantes y copia las líneas para trabajar con una estructura segura.
export function normalizeInvoice(invoice) {
  return {
    ...initialInvoice,
    ...invoice,
    items: invoice.items?.length
      ? invoice.items.map((item) => ({ ...item }))
      : initialInvoice.items.map((item) => ({ ...item })),
  }
}

// Crea una factura válida, asignando UUID y total cuando sea necesario.
export function createInvoice(invoice) {
  const normalized = normalizeInvoice(invoice)
  return {
    ...normalized,
    id: normalized.id || crypto.randomUUID(),
    total: calculateInvoiceTotal(normalized.items),
    status: normalized.status || 'Pendiente',
  }
}

// Cambia una factura entre los estados Pendiente y Pagada.
export function toggleInvoicePayment(invoice) {
  return createInvoice({
    ...invoice,
    status: invoice.status === 'Pagada' ? 'Pendiente' : 'Pagada',
  })
}

// Finalización solo para el prototipo en memoria. PostgreSQL asignará el consecutivo real.
export function finalizeDemoServiceOrder(invoices, invoice) {
  if (invoice.lifecycleStatus !== 'draft') throw new Error('Solo se finalizan borradores');
  if (!invoice.customerName?.trim()) throw new Error('El cliente es obligatorio');
  if (!invoice.items?.some(item => item.type === 'service' && item.description?.trim())) {
    throw new Error('La orden requiere un servicio');
  }
  if (invoice.items.some(item => !item.description?.trim() || Number(item.quantity) <= 0 || !Number.isFinite(Number(item.quantity)) || Number(item.unitPrice) < 0 || !Number.isFinite(Number(item.unitPrice)))) {
    throw new Error('Revisa descripciones, cantidades y precios');
  }
  const max = invoices.reduce((n, item) => {
    const number = /^OS-(\d+)$/.exec(item.invoiceNumber || '');
    return number ? Math.max(n, Number(number[1])) : n;
  }, 0);
  return createInvoice({
    ...invoice, lifecycleStatus: 'finalized',
    invoiceNumber: 'OS-' + String(max + 1).padStart(4, '0'),
  });
}
