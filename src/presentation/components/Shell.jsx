import Logo from './Logo'

const menuItems = [
  { id: 'inicio', label: 'Resumen', icon: '⌂' },
  { id: 'nueva', label: 'Nueva factura', icon: '+' },
  { id: 'facturas', label: 'Mis facturas', icon: '▤' },
]

// Proporciona la estructura visual común: menú lateral, barra superior y contenido de cada página.
export default function Shell({ view, setView, onLogout, children }) {
  return <div className="app-shell"><aside className="sidebar"><Logo compact /><div className="sidebar-label">FACTURACIÓN</div><nav>{menuItems.map((item) => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}><span className="nav-icon">{item.icon}</span>{item.label}</button>)}</nav><div className="sidebar-bottom"><div className="sidebar-label">CUENTA</div><button><span className="nav-icon">⚙</span>Configuración</button><button onClick={onLogout}><span className="nav-icon">↪</span>Cerrar sesión</button><div className="user-card"><div className="avatar">T</div><div><strong>Técnico independiente</strong><small>admin@facturapp.com</small></div><span>•••</span></div></div></aside><main className="content"><header className="topbar"><div className="mobile-logo"><Logo compact /></div><div className="topbar-actions"><button className="icon-button">⌕</button><button className="icon-button notification">♢<i /></button><div className="topbar-date">Martes, 03 de noviembre de 2026</div></div></header>{children}</main></div>
}
