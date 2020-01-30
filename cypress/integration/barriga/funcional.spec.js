/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Work with alerts', () => {

  // Executa uma vez apenas, antes de todos os testes...
  before(() => {
    cy.login('lti@lti.com', '123456')
    cy.resetApp();
  })

  it('Should create an account', () => {
    cy.acessarMenuConta();
    cy.inserirConta('Robinho')

    // cy.get(loc.CONTAS.NOME).type('Robinho')
    // cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

  })

  it('Should update an account', () => {
    cy.acessarMenuConta();
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Robinho')).click()
    cy.get(loc.CONTAS.NOME)
      .clear()
      .type('Conta alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

  })

  it('Should not create an account with same name', () => {
    cy.acessarMenuConta();

    cy.get(loc.CONTAS.NOME).type('Conta alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')

  })

  it('Should create a transition', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()

    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('LTI')
    cy.get(loc.MOVIMENTACAO.VALOR).type('123')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')

    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)

    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('LTI', '123')).should('exist')


  })


  it('Should get balarce', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain', '123,00')
  })

  it('Should remove a transaction', () => {
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('LTI')).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')

  })

})