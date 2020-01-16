/// <reference types="cypress"/>

describe('helpers....', () => {

  it('Wrap', () => {
    const obj = { nome: 'Robson', idade: 22 }
    expect(obj).to.have.property('nome')

    cy.wrap(obj).should('have.property', 'nome')

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    // cy.get('#formNome').should($el => {

    //   cy.wrap($el).type('Funciona via cypress')
    //   // Aqui é um objeto do Jquery
    //   // $el.val('Funciona via Jquery')
    // })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    })

    cy.get('#buttonSimple').then(() => console.log('Encontrei o botão'))

    // promise.then(num => console.log(num))

    cy.wrap(promise).then(res => console.log(res))
    cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

    cy.wrap(1).then(num => {
      // se fosse com o should, ele iria ignorar o retorno
      return 2
    }).should('be.equal', 2)

  })

  it.only('Its...', () => {
    const obj = { nome: 'Robson', idade: 22 }
    cy.wrap(obj).should('have.property', 'nome', 'Robson')
    cy.wrap(obj).its('nome').should('be.equal', 'Robson')

    const obj2 = { nome: 'Robson', idade: 22, endereco: { rua: 'Dos gatos' } }
    cy.wrap(obj2).its('endereco').should('have.property', 'rua')
    cy.wrap(obj2).its('endereco').its('rua').should('contain', 'gatos')
    cy.wrap(obj2).its('endereco.rua').should('contain', 'gatos')

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.title().its('length').should('be.equal', 20)
    // its trabalha comm as propriedades
  })

  it.only('invoke...', () => {
    const getValue = () => 1;

    const soma = (a, b) => a + b;

    cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
    cy.wrap({ fn: soma }).invoke('fn', 3, 7).should('be.equal', 10)

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    // invoke funciona de forma similar ao type
    cy.get('#formNome').invoke('val', 'Texto via invoke')

    cy.window().invoke('alert', 'LTI')

    cy.get('#resultado')
      .invoke('html', '<input type="button", value="hacked!"/>')



  })
})