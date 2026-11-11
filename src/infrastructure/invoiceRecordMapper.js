// Adapta el modelo del dominio a nombres snake_case compatibles con Supabase.
export function toInvoiceRecord(invoice) {
  return {
    id: invoice.id,
    invoice_number: invoice.invoiceNumber,
    issue_date: invoice.issueDate,
    customer_name: invoice.customerName,
    customer_phone: invoice.customerPhone,
    customer_email: invoice.customerEmail,
    customer_address: invoice.customerAddress,
    equipment_type: invoice.equipmentType,
    equipment_brand: invoice.equipmentBrand,
    equipment_model: invoice.equipmentModel,
    equipment_serial: invoice.equipmentSerial,
    diagnosis: invoice.diagnosis,
    notes: invoice.notes,
    status: invoice.status,
    total: invoice.total,
    items: (invoice.items || []).map((item) => ({
      item_type: item.type,
      description: item.description,
      quantity: Number(item.quantity) || 0,
      unit_price: Number(item.unitPrice) || 0,
      line_total: (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    })),
  }
}
