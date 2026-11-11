// Representa una métrica resumida del negocio en el panel principal.
export default function Stat({ title, value, trend, icon }) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><p>{title}</p><strong>{value}</strong><small><span>↗</span> {trend}</small></div>
}
