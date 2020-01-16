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


  it('Text', () => {
    cy.get('body').should('contain', 'Cuidado')
    cy.get('span').should('contain', 'Cuidado')
    cy.get('.facilAchar').should('contain', 'Cuidado')
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  })

  it('Links', () => {

    cy.get('[href="#"]').click()
    cy.get('#resultado').should('have.text', 'Voltou!')

    cy.reload()
    cy.get('#resultado').should('have.not.text', 'Voltou!')
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text', 'Voltou!')

  })

  it('Text Fileds', () => {
    cy.get('#formNome').type('Robson Szabo')
    //Aqui deve ser have.value e não have.text
    cy.get('#formNome').should('have.value', 'Robson Szabo')

    // Para os dois pontos serem entendidos, foi preciso colocar mais uma \
    cy.get('#elementosForm\\:sugestoes')
      .type('LTI')
      .should('have.value', 'LTI')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')

    cy.get('[data-cy=dataSobrenome]')
      .type('Robson{backspace}')
      .should('have.value', 'Robso')

    cy.get('#elementosForm\\:sugestoes')
      .clear()
      .type('LTI{selectall}acerto', { delay: 100 })
      .should('have.value', 'acerto')

  })

  it('Radio button', () => {
    cy.get('#formSexoFem')
      .click()
      .should('be.checked')

    cy.get('#formSexoMasc').should('not.be.checked')

    cy.get("[name='formSexo']").should('have.length', 2)

  })

  it('Checkbox', () => {
    cy.get('#formComidaPizza')
      .click()
      .should('be.checked')

    cy.get('[name=formComidaFavorita]').click({ multiple: true })
    cy.get('#formComidaPizza').should('not.be.checked')
    cy.get('[name=formComidaFavorita]').should('be.checked')

  })

  it.only('Combo', () => {
    cy.get('[data-test=dataEscolaridade]')
      .select('2o grau completo')
      .should('have.value', ('2graucomp'))

    cy.get('[data-test=dataEscolaridade]')
      .select('1graucomp')
      .should('have.value', ('1graucomp'))

    cy.get('[data-test=dataEscolaridade] option')
      .should('have.length', 8)
    cy.get('[data-test=dataEscolaridade] option').then($arr => {
      // Como estou usando a ffunction, irei usar o this
      const values = []
      $arr.each(function () {
        values.push(this.innerHTML)
      })
      expect(values).to.include.members(["Superior", "Mestrado"])

    })
  })

  it.only('Combo multiplo', () => {
    cy.get('[data-testid=dataEsportes')
      .select(['natacao', 'Corrida', 'nada'])

    // Não funciona
    // cy.get('[data-testid=dataEsportes').should('have.value', 'natacao', 'Corrida', 'nada')

    cy.get('[data-testid=dataEsportes').then($el => {
      // Pode ser feita mais de uma assertiva dentro do bloco
      expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
      expect($el.val()).to.have.length(3)
    })

    // O array que voltar a partir do 'val', será utilizado o should ( que terei um array diretamente)
    // 'eql' é como se fosse um deep equal
    cy.get('[data-testid=dataEsportes')
      .invoke('val')
      .should('eql', ['natacao', 'Corrida', 'nada'])

  })
})


