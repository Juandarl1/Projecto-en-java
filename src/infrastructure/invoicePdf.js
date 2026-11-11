import { jsPDF } from 'jspdf'
import { money } from '../shared/formatters'

// Convierte una factura en un PDF descargable para entregar al cliente o archivarlo.
export function downloadInvoicePdf(invoice) {
  const pdf = new jsPDF()
  const pageWidth = pdf.internal.pageSize.getWidth()
  let y = 22
  pdf.setFillColor(18, 45, 65)
  pdf.rect(0, 0, pageWidth, 39, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(22)
  pdf.text('FacturApp', 18, 17)
  pdf.setFontSize(10)
  pdf.text('FACTURA DE SERVICIO TÉCNICO', 18, 28)
  pdf.text(invoice.invoiceNumber || 'Sin número', pageWidth - 18, 17, { align: 'right' })
  pdf.setFontSize(9)
  pdf.text(`ID: ${invoice.id}`, pageWidth - 18, 28, { align: 'right' })
  y = 54
  pdf.setTextColor(35, 62, 81)
  pdf.setFontSize(11)
  pdf.text('Datos de la factura', 18, y)
  pdf.setFontSize(9)
  pdf.setTextColor(90, 110, 120)
  pdf.text(`Fecha de emisión: ${invoice.issueDate}`, 18, y + 9)
  pdf.text(`Estado: ${invoice.status}`, 18, y + 17)
  pdf.setTextColor(35, 62, 81)
  pdf.setFontSize(11)
  pdf.text('Cliente', 18, y + 34)
  pdf.setFontSize(9)
  pdf.setTextColor(90, 110, 120)
  pdf.text(`Nombre / razón social: ${invoice.customerName || 'No registrado'}`, 18, y + 43)
  pdf.text(`Teléfono: ${invoice.customerPhone || 'No registrado'}`, 18, y + 51)
  pdf.text(`Correo: ${invoice.customerEmail || 'No registrado'}`, 18, y + 59)
  pdf.setTextColor(35, 62, 81)
  pdf.setFontSize(11)
  pdf.text('Equipo atendido', pageWidth / 2 + 5, y + 34)
  pdf.setFontSize(9)
  pdf.setTextColor(90, 110, 120)
  pdf.text(`Tipo: ${invoice.equipmentType || 'No registrado'}`, pageWidth / 2 + 5, y + 43)
  pdf.text(`Marca / referencia: ${invoice.equipmentBrand || ''} ${invoice.equipmentModel || ''}`, pageWidth / 2 + 5, y + 51)
  pdf.text(`Serial: ${invoice.equipmentSerial || 'No registrado'}`, pageWidth / 2 + 5, y + 59)
  y += 84
  pdf.setFillColor(242, 246, 248)
  pdf.rect(18, y - 6, pageWidth - 36, 10, 'F')
  pdf.setTextColor(80, 100, 110)
  pdf.setFontSize(8)
  pdf.text('TIPO', 21, y)
  pdf.text('DESCRIPCIÓN', 54, y)
  pdf.text('CANT.', 126, y)
  pdf.text('VALOR UNITARIO', 148, y)
  pdf.text('TOTAL', pageWidth - 20, y, { align: 'right' })
  y += 11
  pdf.setTextColor(45, 70, 88)
  pdf.setFontSize(9)
  ;(invoice.items || []).forEach((item) => {
    const lineTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)
    pdf.text(item.type === 'part' ? 'Repuesto' : 'Servicio', 21, y)
    pdf.text(String(item.description || 'Sin descripción').slice(0, 38), 54, y)
    pdf.text(String(item.quantity || 0), 129, y)
    pdf.text(money(item.unitPrice), 148, y)
    pdf.text(money(lineTotal), pageWidth - 20, y, { align: 'right' })
    y += 9
  })
  pdf.setDrawColor(220, 228, 232)
  pdf.line(18, y + 2, pageWidth - 18, y + 2)
  pdf.setFontSize(13)
  pdf.setTextColor(18, 45, 65)
  pdf.text(`TOTAL: ${money(invoice.total)}`, pageWidth - 18, y + 14, { align: 'right' })
  y += 32
  if (invoice.diagnosis) {
    pdf.setFontSize(10)
    pdf.text('Diagnóstico / falla reportada', 18, y)
    pdf.setFontSize(9)
    pdf.setTextColor(90, 110, 120)
    const diagnosisLines = pdf.splitTextToSize(invoice.diagnosis, pageWidth - 36)
    pdf.text(diagnosisLines, 18, y + 9)
    y += 9 + diagnosisLines.length * 5
  }
  if (invoice.notes) {
    pdf.setTextColor(35, 62, 81)
    pdf.setFontSize(10)
    pdf.text('Notas adicionales', 18, y + 10)
    pdf.setFontSize(9)
    pdf.setTextColor(90, 110, 120)
    pdf.text(pdf.splitTextToSize(invoice.notes, pageWidth - 36), 18, y + 19)
  }
  pdf.save(`${invoice.invoiceNumber || 'factura'}-${invoice.id}.pdf`)
}
