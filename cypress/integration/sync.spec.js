/// <reference types="cypress"/>


describe('Esperas...', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  //Executa antes de cada um dos testes 'it()'
  beforeEach(() => {
    cy.reload()

  })

  it('Deve aguardar elemento estar disponivel', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('Robson')

  })

  it.only('Deve fazer retrys', () => {
    cy.get('#buttonDelay').click()

    cy.get('#novoCampo')
      .should('not.exist')
      .should('exist')
  })

  it.only('Uso do find', () => {
    cy.get('#buttonListDOM').click()
    cy.get('#lista li')
      .find('span') // aqui, o should fica cobrando ao find, porém o find está preso ao escopo do item 1
      .should('contain', 'Item 1')

    // cy.get('#lista li')
    //   .find('span')
    //   .should('contain', 'Item 2')

    cy.get('#lista li span')
      .should('contain', 'Item 2')
  })

  it.only('Uso do timeout', () => {
    // cy.get('#buttonDelay').click()
    // cy.get('#novoCampo')
    //   .should('exist')

    // cy.get('#buttonListDOM').click()
    // // cy.wait(5000) o correto é usar {timeout: 30000} (não utiliza o tempo todo, mas sim até que a condição seja aceita, para poder prosseguir para o próximo fluxo)
    // cy.get('#lista li span' { timeout: 30000 })
    //   .should('contain', 'Item 2')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li span')
      .should('have.length', 1)
    cy.get('#lista li span')
      .should('have.length', 2)



  })

  it.only('Click retry', () => {
    cy.get('#buttonCount')
      .click()
      .should('have.value', '1111')
  })

  it.only('Should vs then', () => {
    // aqui é uma função
    cy.get('#buttonListDOM').click().then($el => {


      expect($el).to.have.length(1)
      // se for necessário fazer novas buscas, o cy.get tem que ficar dentro de um then
      cy.get('#buttonList')

      // return 2
      // Should ignora o que está dentro do return
      // Should ao chegar no final, sempre vai retornar o objeto que ele recebeu
      // com o should não retornaria, porquê sempre o que está sendo retornado é o elemento
      // Só quem considera o retorno é o then
    })
    // .and('eq', 2)
    //   .and('not.have.id', 'buttonListDOM')

    // Vai fazer a busca e depois eu vou pegar a promisses
    // el está referenciando a um elemento da tela (conversão)
    // Should fica sendo executado ao logon da espera, enquanto o then aguardou que o get fosse concluido
    // get com should é mais alinhado (get fica mandando coisa pro should e fica executando e fazendo o retry)
    // cy.get('#lista li span').then($el => {
    //   // estão dizendo a mesma coisa, só que em notações diferentes

    //   expect($el).to.have.length(1)
    //   // .should('have.length', 1)

    // }).and('have.id', 'buttonListDOM')

  })
})