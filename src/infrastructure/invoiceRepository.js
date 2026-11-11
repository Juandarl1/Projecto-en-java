// Encapsula la persistencia actual en memoria para poder sustituirla por Supabase.
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
