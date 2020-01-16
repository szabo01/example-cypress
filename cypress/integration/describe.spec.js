/// <reference types="cypress"/>

//Escopo de um teste
it('A external test...', () => {

})

// Serve para agrupar testes
describe.skip('Should group test', () => {
  describe('Should group more specific tests...', () => {
    it('A specific test', () => {

    })
  })

  describe('Should group more...', () => {
    it('A specific test 2', () => {

    })
  })

  it('A internal test', () => {

  })
})