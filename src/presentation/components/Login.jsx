import Logo from './Logo'

// Presenta el acceso de demostración y notifica al contenedor cuando las credenciales son válidas.
export default function Login({ onLogin }) {
  // El prototipo usa un acceso demostrativo sin credenciales almacenadas.
  function submit(event) {
    event.preventDefault()
    onLogin()
  }

  return <main className="login-page">
    <section className="login-visual"><div className="visual-shade" /><div className="visual-content">
      <Logo />
      <div className="visual-copy"><p className="eyebrow">Facturación sin complicaciones</p><h1>Tu trabajo técnico,<br /><em>bien respaldado.</em></h1><p>Crea facturas profesionales para cada servicio de reparación y mantén toda la información de tus clientes y equipos en orden.</p></div>
      <span className="visual-footer">© 2026 FacturApp</span>
    </div></section>
    <section className="login-panel"><div className="login-form-wrap"><div className="mobile-logo"><Logo compact /></div><p className="eyebrow">Acceso demostrativo</p><h2>Inicia sesión</h2><p className="muted">Este entorno local no requiere credenciales reales.</p>
      <form onSubmit={submit}><button className="primary-button full" type="submit">Ingresar <span>→</span></button></form>
      <p className="login-help">¿Necesitas ayuda? <button className="text-button">Contacta con soporte</button></p>
    </div></section>
  </main>
}
