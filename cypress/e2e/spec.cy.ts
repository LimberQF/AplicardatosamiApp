describe('Prueba de Autenticación', () => {
  it('Inicia sesión como operario logístico', () => {
    cy.visit('/')
    cy.get('ion-input').eq(0).type('admin')
    cy.get('ion-input').eq(1).type('1234')
    cy.get('ion-button').click()
    cy.contains('Turno Noche')
  })
})
