// Muestra la identidad visual de FacturApp en sus versiones completa o compacta.
export default function Logo({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}>
    <div className="brand-mark">F</div>
    <div><strong>Factur<span>App</span></strong>{!compact && <small>FACTURACIÓN PARA TÉCNICOS</small>}</div>
  </div>
}
