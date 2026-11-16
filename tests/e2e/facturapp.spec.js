import { test, expect } from '@playwright/test'

async function login(page) {
  await page.goto('/')
  await page.getByRole('button', { name: /Ingresar/ }).click()
  await expect(page.getByRole('heading', { name: 'Tus órdenes, en orden' })).toBeVisible()
}

async function createDraft(page) {
  await page.locator('button.primary-button').filter({ hasText: 'Nueva orden' }).click()
  await page.locator('.field').filter({ hasText: 'Nombre / razón social' }).locator('input').fill('Cliente E2E Ficticio')
  await page.locator('.field').filter({ hasText: 'Teléfono' }).locator('input').fill('300 000 0000')
  await page.locator('.line-item input').nth(0).fill('Mantenimiento preventivo')
  await page.locator('.line-item input[type="number"]').nth(1).fill('150000')
  await page.getByRole('button', { name: 'Guardar orden' }).click()
  await expect(page.getByRole('heading', { name: 'Mis órdenes de servicio' })).toBeVisible()
  return page.getByRole('row').filter({ hasText: 'Borrador' })
}

async function openHistory(page) {
  await page.getByRole('button', { name: 'Mis órdenes' }).click()
  await expect(page.getByRole('heading', { name: 'Mis órdenes de servicio' })).toBeVisible()
}

test('inicia sesión con las credenciales de demostración', async ({ page }) => {
  await login(page)
})

test('crea una orden de servicio en borrador', async ({ page }) => {
  await login(page)
  const draftRow = await createDraft(page)

  await expect(draftRow).toContainText('Cliente E2E Ficticio')
  await expect(draftRow.locator('button.invoice-link')).toHaveText('Borrador')
})

test('edita y guarda un borrador', async ({ page }) => {
  await login(page)
  const draftRow = await createDraft(page)

  await draftRow.locator('button.invoice-link').click()
  await page.locator('.field').filter({ hasText: 'Teléfono' }).locator('input').fill('301 111 2222')
  await page.getByRole('button', { name: 'Guardar cambios' }).click()

  const savedRow = page.getByRole('row').filter({ hasText: 'Borrador' })
  await expect(savedRow).toContainText('301 111 2222')
})

test('finaliza una orden y asigna el siguiente consecutivo', async ({ page }) => {
  await login(page)
  const draftRow = await createDraft(page)

  await draftRow.getByRole('button', { name: 'Finalizar' }).click()

  const finalizedRow = page.getByRole('row').filter({ hasText: 'OS-0025' })
  await expect(finalizedRow).toBeVisible()
  await expect(finalizedRow).not.toContainText('Borrador')
})

test('impide editar una orden finalizada desde la interfaz', async ({ page }) => {
  await login(page)
  await openHistory(page)
  const finalizedRow = page.getByRole('row').filter({ hasText: 'OS-0024' })

  await expect(finalizedRow.getByRole('button', { name: 'Editar' })).toHaveCount(0)
  await finalizedRow.getByRole('button', { name: 'OS-0024' }).click()
  await expect(page.getByRole('heading', { name: 'Mis órdenes de servicio' })).toBeVisible()
})

test('permite cambiar el estado de pago de una orden finalizada', async ({ page }) => {
  await login(page)
  await openHistory(page)
  const pendingRow = page.getByRole('row').filter({ hasText: 'OS-0023' })

  await pendingRow.getByRole('button', { name: 'Pendiente' }).click()
  await expect(pendingRow.getByRole('button', { name: 'Pagada' })).toBeVisible()
})

test('descarga el PDF de una orden finalizada', async ({ page }) => {
  await login(page)
  await openHistory(page)
  const finalizedRow = page.getByRole('row').filter({ hasText: 'OS-0024' })

  const downloadPromise = page.waitForEvent('download')
  await finalizedRow.getByRole('button', { name: 'PDF' }).click()
  const download = await downloadPromise

  expect(download.suggestedFilename()).toMatch(/^OS-0024-.+\.pdf$/)
})

test('navega entre el dashboard y el historial', async ({ page }) => {
  await login(page)

  await page.getByRole('button', { name: 'Mis órdenes' }).click()
  await expect(page.getByRole('heading', { name: 'Mis órdenes de servicio' })).toBeVisible()

  await page.getByRole('button', { name: 'Resumen' }).click()
  await expect(page.getByRole('heading', { name: 'Tus órdenes, en orden' })).toBeVisible()
})
