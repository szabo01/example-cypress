/// <reference types="cypress"/>

describe('Work with alerts', () => {

    // Executa uma vez apenas, antes de todos os testes...
    before(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '17/01/2020')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '17/01/2020')

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2021')

    })

    it.only('Does to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '15792')
        cy.get('#resultado > span').invoke('text').should('gt', '12365498721')

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 0)
        cy.wait(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > ').invoke('text').should('lte', 1000)

        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > ').invoke('text').should('gte', 20000)

    })
})