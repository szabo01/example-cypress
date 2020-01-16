/// <reference types="cypress"/>

describe('Work with basic elements', () => {

    // Executa uma vez apenas, antes de todos os testes...
    before(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
  
    //Executa antes de cada um dos testes 'it()'
    beforeEach(() => {
      cy.reload()
    })

    it('Using Jquery',() => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')

    })
})