import { useState } from 'react'
import { getInvoiceStats, saveInvoice, togglePaidInvoice } from '../application/invoiceService'
import { demoInvoices } from '../domain/invoice/invoice'
import { toInvoiceRecord } from '../infrastructure/invoiceRecordMapper'
import { downloadInvoicePdf } from '../infrastructure/invoicePdf'
import Login from './components/Login'
import Shell from './components/Shell'
import Dashboard from './pages/Dashboard'
import InvoiceForm from './pages/InvoiceForm'
import Invoices from './pages/Invoices'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [view, setView] = useState('inicio')
  const [invoices, setInvoices] = useState(demoInvoices)
  const [editingInvoice, setEditingInvoice] = useState(null)

  function handleSave(invoice) {
    setInvoices((current) => saveInvoice(current, invoice).map((item) => ({
      ...item,
      record: toInvoiceRecord(item),
    })))
    setEditingInvoice(null)
    setView('facturas')
  }

  function handleTogglePaid(invoice) {
    setInvoices((current) => togglePaidInvoice(current, invoice).map((item) => ({
      ...item,
      record: toInvoiceRecord(item),
    })))
  }

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />
  return <Shell view={view} setView={setView} onLogout={() => setLoggedIn(false)}>
    {view === 'inicio' && <Dashboard invoices={invoices} setView={setView} stats={getInvoiceStats(invoices)} />}
    {view === 'nueva' && <InvoiceForm onSave={handleSave} onCancel={() => setView('inicio')} />}
    {view === 'editar' && <InvoiceForm invoiceToEdit={editingInvoice} onSave={handleSave} onCancel={() => { setEditingInvoice(null); setView('facturas') }} />}
    {view === 'facturas' && <Invoices invoices={invoices} setView={setView} onEdit={(invoice) => { setEditingInvoice(invoice); setView('editar') }} onTogglePaid={handleTogglePaid} onPrint={downloadInvoicePdf} />}
  </Shell>
}
