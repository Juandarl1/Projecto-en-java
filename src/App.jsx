import { useState } from 'react'
import { toInvoiceRecord } from './lib/invoice'
import { downloadInvoicePdf } from './lib/invoicePdf'

const initialInvoice = {
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
  items: [{ type: 'service', description: '', quantity: 1, unitPrice: 0 }],
}

const demoInvoices = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    invoiceNumber: 'FAC-0024',
    issueDate: '2026-11-03',
    customerName: 'Papelería El Faro',
    customerPhone: '300 456 7890',
    equipmentModel: 'Epson L3110',
    total: 185000,
    status: 'Pagada',
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
  },
]

const menuItems = [
  { id: 'inicio', label: 'Resumen', icon: '⌂' },
  { id: 'nueva', label: 'Nueva factura', icon: '+' },
  { id: 'facturas', label: 'Mis facturas', icon: '▤' },
]

const money = (value) => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
}).format(Number(value) || 0)

const formatDate = (date) => new Intl.DateTimeFormat('es-CO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(`${date}T12:00:00`))

function Logo({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}>
    <div className="brand-mark">F</div>
    <div><strong>Factur<span>App</span></strong>{!compact && <small>FACTURACIÓN PARA TÉCNICOS</small>}</div>
  </div>
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (username === 'admin' && password === '1234') onLogin()
    else setError('El usuario o la contraseña no son correctos.')
  }

  return <main className="login-page">
    <section className="login-visual"><div className="visual-shade" /><div className="visual-content">
      <Logo />
      <div className="visual-copy"><p className="eyebrow">Facturación sin complicaciones</p><h1>Tu trabajo técnico,<br /><em>bien respaldado.</em></h1><p>Crea facturas profesionales para cada servicio de reparación y mantén toda la información de tus clientes y equipos en orden.</p></div>
      <span className="visual-footer">© 2026 FacturApp</span>
    </div></section>
    <section className="login-panel"><div className="login-form-wrap"><div className="mobile-logo"><Logo compact /></div><p className="eyebrow">Bienvenido de nuevo</p><h2>Inicia sesión</h2><p className="muted">Ingresa para continuar facturando tus servicios.</p>
      <form onSubmit={submit}><label htmlFor="username">Usuario</label><div className="input-wrap"><span>♙</span><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} /></div><label htmlFor="password">Contraseña</label><div className="input-wrap"><span>••</span><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></div><div className="form-options"><label className="check"><input type="checkbox" defaultChecked /> <span>Recordarme</span></label><button type="button" className="text-button">¿Olvidaste tu contraseña?</button></div>{error && <p className="error">{error}</p>}<button className="primary-button full" type="submit">Ingresar <span>→</span></button></form>
      <p className="login-help">¿Necesitas ayuda? <button className="text-button">Contacta con soporte</button></p>
    </div></section>
  </main>
}

function Shell({ view, setView, onLogout, children }) {
  return <div className="app-shell"><aside className="sidebar"><Logo compact /><div className="sidebar-label">FACTURACIÓN</div><nav>{menuItems.map((item) => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}><span className="nav-icon">{item.icon}</span>{item.label}</button>)}</nav><div className="sidebar-bottom"><div className="sidebar-label">CUENTA</div><button><span className="nav-icon">⚙</span>Configuración</button><button onClick={onLogout}><span className="nav-icon">↪</span>Cerrar sesión</button><div className="user-card"><div className="avatar">T</div><div><strong>Técnico independiente</strong><small>admin@facturapp.com</small></div><span>•••</span></div></div></aside><main className="content"><header className="topbar"><div className="mobile-logo"><Logo compact /></div><div className="topbar-actions"><button className="icon-button">⌕</button><button className="icon-button notification">♢<i /></button><div className="topbar-date">Martes, 03 de noviembre de 2026</div></div></header>{children}</main></div>
}

function Dashboard({ invoices, setView }) {
  const total = invoices.reduce((sum, invoice) => sum + invoice.total, 0)
  return <div className="page"><div className="page-heading"><div><p className="eyebrow">Martes, 03 de noviembre</p><h1>Tu facturación, en orden <span>✦</span></h1><p className="muted">Registra cada reparación y encuentra tus facturas cuando las necesites.</p></div><button className="primary-button" onClick={() => setView('nueva')}>+ Nueva factura</button></div>
    <div className="stats-grid"><Stat title="Facturas registradas" value={invoices.length} trend="Lista para consultar" icon="▤" /><Stat title="Facturado en total" value={money(total)} trend="Desde que comenzaste" icon="$" /><Stat title="Servicios realizados" value={invoices.length} trend="Reparaciones documentadas" icon="✓" /><Stat title="Pendientes de pago" value={invoices.filter((invoice) => invoice.status === 'Pendiente').length} trend="Para hacer seguimiento" icon="◌" /></div>
    <div className="dashboard-grid"><section className="panel recent-panel"><div className="panel-heading"><div><h3>Últimas facturas</h3><p className="muted">Tus servicios más recientes</p></div><button className="text-button" onClick={() => setView('facturas')}>Ver todas →</button></div><div className="activity-list">{invoices.slice(0, 4).map((invoice) => <div className="activity-row" key={invoice.id}><div className="cloth-icon">▤</div><div className="activity-info"><strong>{invoice.invoiceNumber} · {invoice.customerName}</strong><span>{invoice.equipmentModel} · {formatDate(invoice.issueDate)}</span></div><div className={`status ${invoice.status === 'Pagada' ? 'lista' : 'pendiente'}`}>{invoice.status}</div><strong className="amount">{money(invoice.total)}</strong></div>)}</div></section><section className="panel quick-panel"><h3>¿Qué necesitas hacer?</h3><p className="muted">Registra tu trabajo en pocos pasos.</p><button className="quick-action" onClick={() => setView('nueva')}><span className="quick-icon blue">+</span><span><strong>Crear una factura</strong><small>Cliente, equipo, repuestos y servicio</small></span><b>→</b></button><button className="quick-action" onClick={() => setView('facturas')}><span className="quick-icon orange">▤</span><span><strong>Consultar facturas</strong><small>Busca un trabajo anterior</small></span><b>→</b></button></section></div>
  </div>
}

function Stat({ title, value, trend, icon }) { return <div className="stat-card"><div className="stat-icon">{icon}</div><p>{title}</p><strong>{value}</strong><small><span>↗</span> {trend}</small></div> }

function Field({ label, value, onChange, placeholder, type = 'text', children }) {
  return <div className="field"><label>{label}</label>{children || <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />}</div>
}

function InvoiceForm({ invoiceToEdit, onSave, onCancel }) {
  const [invoice, setInvoice] = useState(() => invoiceToEdit ? { ...initialInvoice, ...invoiceToEdit, items: invoiceToEdit.items?.length ? invoiceToEdit.items.map((item) => ({ ...item })) : initialInvoice.items.map((item) => ({ ...item })) } : initialInvoice)
  const total = invoice.items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0)
  const update = (key, value) => setInvoice((current) => ({ ...current, [key]: value }))
  const updateItem = (index, key, value) => setInvoice((current) => ({ ...current, items: current.items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item) }))
  const addItem = (type) => setInvoice((current) => ({ ...current, items: [...current.items, { type, description: '', quantity: 1, unitPrice: 0 }] }))
  const removeItem = (index) => setInvoice((current) => ({ ...current, items: current.items.filter((_, itemIndex) => itemIndex !== index) }))

  function submit(event) {
    event.preventDefault()
    onSave({ ...invoice, id: invoice.id || crypto.randomUUID(), total, status: invoice.status || 'Pendiente' })
  }

  return <div className="page form-page"><div className="page-heading"><div><button className="back-button" onClick={onCancel}>← Volver a mis facturas</button><p className="eyebrow">{invoiceToEdit ? 'Editar factura' : 'Nueva factura'}</p><h1>{invoiceToEdit ? 'Actualiza tu servicio' : 'Documenta tu servicio'}</h1><p className="muted">Guarda los datos del cliente, equipo, repuestos y trabajo realizado.</p></div><div className="invoice-number"><span>Número de factura</span><strong>{invoice.invoiceNumber}</strong><small>ID: {invoice.id || 'Se generará al guardar'}</small></div></div>
    <form className="invoice-form" onSubmit={submit}><section className="panel form-section"><div className="section-title"><span className="section-number">01</span><div><h3>Datos de la factura</h3><p className="muted">Identifica el documento y cuándo realizaste el servicio.</p></div></div><div className="field-grid three"><Field label="Número de factura" value={invoice.invoiceNumber} onChange={(value) => update('invoiceNumber', value)} placeholder="FAC-0001" /><Field label="Fecha de emisión" type="date" value={invoice.issueDate} onChange={(value) => update('issueDate', value)} /><Field label="Estado de pago"><select value={invoice.status || 'Pendiente'} onChange={(event) => update('status', event.target.value)}><option>Pendiente</option><option>Pagada</option></select></Field></div></section>
      <section className="panel form-section"><div className="section-title"><span className="section-number">02</span><div><h3>Cliente</h3><p className="muted">Persona o empresa a quien prestaste el servicio.</p></div></div><div className="field-grid two"><Field label="Nombre / razón social" value={invoice.customerName} onChange={(value) => update('customerName', value)} placeholder="Ej. Papelería El Faro" /><Field label="Teléfono" value={invoice.customerPhone} onChange={(value) => update('customerPhone', value)} placeholder="Ej. 300 123 4567" /><Field label="Correo electrónico" value={invoice.customerEmail} onChange={(value) => update('customerEmail', value)} placeholder="cliente@correo.com" /><Field label="Dirección" value={invoice.customerAddress} onChange={(value) => update('customerAddress', value)} placeholder="Dirección del cliente" /></div></section>
      <section className="panel form-section"><div className="section-title"><span className="section-number">03</span><div><h3>Equipo atendido</h3><p className="muted">Registra la referencia y serial para identificar el equipo.</p></div></div><div className="field-grid three"><Field label="Tipo de equipo"><select value={invoice.equipmentType} onChange={(event) => update('equipmentType', event.target.value)}><option>Impresora</option><option>Multifuncional</option><option>Computador</option><option>Otro</option></select></Field><Field label="Marca"><select value={invoice.equipmentBrand} onChange={(event) => update('equipmentBrand', event.target.value)}><option>Epson</option><option>Canon</option><option>HP</option><option>Brother</option><option>Otra</option></select></Field><Field label="Referencia / modelo" value={invoice.equipmentModel} onChange={(value) => update('equipmentModel', value)} placeholder="Ej. Epson L3110" /><Field label="Número de serie" value={invoice.equipmentSerial} onChange={(value) => update('equipmentSerial', value)} placeholder="Serial del equipo" /><div className="field field-wide"><label>Diagnóstico / falla reportada</label><textarea value={invoice.diagnosis} onChange={(event) => update('diagnosis', event.target.value)} placeholder="Ej. No imprime, presenta líneas..." /></div></div></section>
      <section className="panel form-section"><div className="section-title"><span className="section-number">04</span><div><h3>Detalle del servicio</h3><p className="muted">Agrega el servicio realizado y cada repuesto utilizado.</p></div></div><div className="line-items"><div className="line-header"><span>Tipo</span><span>Descripción</span><span>Cant.</span><span>Valor unitario</span><span>Total</span><span /></div>{invoice.items.map((item, index) => <div className="line-item" key={`${item.type}-${index}`}><select value={item.type} onChange={(event) => updateItem(index, 'type', event.target.value)}><option value="service">Servicio</option><option value="part">Repuesto</option></select><input value={item.description} onChange={(event) => updateItem(index, 'description', event.target.value)} placeholder={item.type === 'part' ? 'Ej. Cabezal de impresión' : 'Ej. Mantenimiento general'} /><input type="number" min="1" value={item.quantity} onChange={(event) => updateItem(index, 'quantity', event.target.value)} /><input type="number" min="0" value={item.unitPrice} onChange={(event) => updateItem(index, 'unitPrice', event.target.value)} placeholder="0" /><strong>{money((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0))}</strong><button type="button" className="remove-line" onClick={() => removeItem(index)} disabled={invoice.items.length === 1}>×</button></div>)}</div><div className="line-actions"><button type="button" className="text-button" onClick={() => addItem('service')}>+ Agregar servicio</button><button type="button" className="text-button" onClick={() => addItem('part')}>+ Agregar repuesto</button></div><div className="total-box"><span>Total de la factura</span><strong>{money(total)}</strong></div></section>
      <section className="panel form-section"><div className="section-title"><span className="section-number">05</span><div><h3>Notas adicionales</h3><p className="muted">Incluye garantía, recomendaciones u observaciones para el cliente.</p></div></div><textarea className="full-textarea" value={invoice.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Ej. Garantía de 30 días sobre el servicio realizado..." /></section>
      <div className="form-actions"><button type="button" className="secondary-button" onClick={onCancel}>Cancelar</button><button className="primary-button" type="submit">{invoiceToEdit ? 'Guardar cambios' : 'Guardar factura'} <span>→</span></button></div>
    </form>
  </div>
}

function Invoices({ invoices, setView, onEdit, onTogglePaid, onPrint }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const paidCount = invoices.filter((invoice) => invoice.status === 'Pagada').length
  const filtered = invoices.filter((invoice) => {
    const matchesQuery = `${invoice.invoiceNumber} ${invoice.customerName} ${invoice.equipmentModel}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === 'Pagada'
    return matchesQuery && matchesStatus
  })
  return <div className="page"><div className="page-heading"><div><p className="eyebrow">Historial de trabajo</p><h1>Mis facturas</h1><p className="muted">Consulta, edita, descarga y actualiza tus servicios.</p></div><button className="primary-button" onClick={() => setView('nueva')}>+ Nueva factura</button></div><section className="panel invoices-panel"><div className="table-toolbar"><div className="search-box">⌕ <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar factura, cliente o equipo..." /></div><div className="invoice-filters"><button className={`filter-tag ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>Todas <span>{invoices.length}</span></button><button className={`filter-tag paid-filter ${statusFilter === 'paid' ? 'active' : ''}`} onClick={() => setStatusFilter('paid')}>Facturas pagadas <span>{paidCount}</span></button><span className="result-count">{filtered.length} facturas</span></div></div><table><thead><tr><th>Factura / ID</th><th>Cliente</th><th>Equipo</th><th>Fecha</th><th>Estado</th><th>Total</th><th>Acciones</th></tr></thead><tbody>{filtered.map((invoice) => <tr key={invoice.id}><td><button className="invoice-link" onClick={() => onEdit(invoice)}>#{invoice.invoiceNumber}</button><small className="table-subtext">{invoice.id}</small></td><td><strong>{invoice.customerName || 'Sin nombre'}</strong><small className="table-subtext">{invoice.customerPhone}</small></td><td><button className="reference-link" onClick={() => onEdit(invoice)}>{invoice.equipmentModel || 'Sin referencia'}</button></td><td>{formatDate(invoice.issueDate)}</td><td><button className={`status status-button ${invoice.status === 'Pagada' ? 'lista' : 'pendiente'}`} onClick={() => onTogglePaid(invoice)} title="Cambiar estado">{invoice.status}</button></td><td><strong>{money(invoice.total)}</strong></td><td><div className="invoice-actions"><button onClick={() => onEdit(invoice)} title="Editar factura">Editar</button><button onClick={() => onPrint(invoice)} title="Descargar PDF">PDF</button></div></td></tr>)}</tbody></table></section></div>
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [view, setView] = useState('inicio')
  const [invoices, setInvoices] = useState(demoInvoices)
  const [editingInvoice, setEditingInvoice] = useState(null)
  function saveInvoice(invoice) {
    setInvoices((current) => {
      const saved = { ...invoice, record: toInvoiceRecord(invoice) }
      const exists = current.some((item) => item.id === saved.id)
      return exists ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current]
    })
    setView('facturas')
  }

  function togglePaid(invoice) {
    saveInvoice({ ...invoice, status: invoice.status === 'Pagada' ? 'Pendiente' : 'Pagada' })
  }

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />
  return <Shell view={view} setView={setView} onLogout={() => setLoggedIn(false)}>{view === 'inicio' && <Dashboard invoices={invoices} setView={setView} />}{view === 'nueva' && <InvoiceForm onSave={saveInvoice} onCancel={() => setView('inicio')} />}{view === 'editar' && <InvoiceForm invoiceToEdit={editingInvoice} onSave={saveInvoice} onCancel={() => { setEditingInvoice(null); setView('facturas') }} />}{view === 'facturas' && <Invoices invoices={invoices} setView={setView} onEdit={(invoice) => { setEditingInvoice(invoice); setView('editar') }} onTogglePaid={togglePaid} onPrint={downloadInvoicePdf} />}</Shell>
}

export default App
