/// <reference types="cypress"/>

describe('Cypress basic', () => {
  it.only('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    // const title = cy.title();
    // console.log(title)

    // Atravez do should que é possível fazer assertivas
    cy.title().should('be.equal', 'Campo de Treinamento')
    // cy.title().should('contain', 'Campo').debug()

    cy.title()
      .should('be.equal', 'Campo de Treinamento') //deve ser igual a isso
      .and('contain', 'Campo') //deve conter isso


    let syncTitle
    // Tanto then, como should, ambos tratam promisses
    cy.title().then(title => {
      console.log(title)

      cy.get('#formNome').type(title)

      syncTitle = title
    })

    cy.get('[data-cy=dataSobrenome]').then($el => {
      $el.val(syncTitle)
    })

    cy.get('#elementosForm\\:sugestoes').then($el => {
      cy.wrap($el).type(syncTitle)
    })


  })

  it('Should find and interact with an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!')


  })
})