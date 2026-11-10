export function createInvoiceRepository(seed = []) {
  let invoices = [...seed]

  return {
    getAll: () => invoices,
    save: (nextInvoices) => {
      invoices = [...nextInvoices]
      return invoices
    },
  }
}
