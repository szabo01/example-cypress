/// <reference types="cypress"/>

describe('Work with alerts', () => {

    // Executa uma vez apenas, antes de todos os testes...
    before(() => {
      cy.visit('http://barrigareact.wcaquino.me/')
      cy.get('.input-group > .form-control').type('lti@lti.com')
      cy.get(':nth-child(2) > .form-control').type('123456')
      cy.get('.btn').click()
      cy.get('.toast-message').should('contain', 'Bem vindo, Lti!')
    })

    it('Should create an account', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('Robinho')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')

    })

    it('Should update an account', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(., 'Robinho')]/..//i[@class='far fa-edit']").click()
        cy.get('[data-test=nome]')
          .clear()
          .type('Conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')
        
    })
})