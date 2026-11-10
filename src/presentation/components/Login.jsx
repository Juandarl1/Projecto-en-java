import { useState } from 'react'
import Logo from './Logo'

export default function Login({ onLogin }) {
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
