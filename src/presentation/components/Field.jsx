export default function Field({ label, value, onChange, placeholder, type = 'text', children }) {
  return <div className="field"><label>{label}</label>{children || <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />}</div>
}
