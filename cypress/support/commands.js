// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import loc from './locators'
// locator = em que botão eu devo clicar
// message = mensagem a ser checada
Cypress.Commands.add('clickAlert', (locator, message) => {
    
        cy.get(locator).click()
        // Pega eventos que ocorrem na tela
        cy.on('window:alert', msg => {
          console.log(msg)
          expect(msg).to.be.equal(message)
        })

})

Cypress.Commands.add('login', (user, password) => {
  cy.visit('http://barrigareact.wcaquino.me/')
      cy.get(loc.LOGIN.USER).type('lti@lti.com')
      cy.get(loc.LOGIN.PASSWORD).type('123456')
      cy.get(loc.LOGIN.BTN_LOGIN).click()
      cy.get(loc.MESSAGE).should('contain', 'Bem vindo, Lti!')

})

Cypress.Commands.add('resetApp', () => {
  cy.get(loc.MENU.SETTINGS).click()
  cy.get(loc.MENU.RESET).click()
})