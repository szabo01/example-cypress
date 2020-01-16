/// <reference types="cypress"/>

describe('Work with alerts', () => {

  // Executa uma vez apenas, antes de todos os testes...
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  //Executa antes de cada um dos testes 'it()'
  beforeEach(() => {
    cy.reload()
  })

  // Ótimo para pegar os anúncios de sucesso a partir do alert
  it('Alert', () => {
    cy.get('#alert').click()
    // Pega eventos que ocorrem na tela
    cy.on('window:alert', msg => {
      console.log(msg)
      expect(msg).to.be.equal('Alert Simples')
    })
  })

  it.only('Alert com mock', () => {
    // Substitui uma função, sobrescrever um comportamento ( dizer o que vai retornar (métodos dificeis))
    // Alias é ótimo dado como alerta
    const stub = cy.stub().as('alerta')
    // Pega eventos que ocorrem na tela
    // O stub está substituindo o método do it logo acima
    cy.on('window:alert', stub)
    // Assertiva depois do click
    // Depois que ele fizer o click, então chame a
    cy.get('#alert').click().then(() => {
      //  Para conseguir a primeira, estou pedindo a que existe no array indexado, na posição 0
      //  parâmetro que eu quero que ela seja chamada
      //  Aqui exemplifica que ela foi chamada com o respectivo parâmetro
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
      expect(stub.getCall(0)).not.to.be.calledWith('Robson Szabo')
    })
  })

  it.only('Confirm', () => {
    cy.get('#confirm').click()
    // Pega eventos que ocorrem na tela
    cy.on('window:confirm', msg => {
      console.log(msg)
      expect(msg).to.be.equal('Confirm Simples')
    })

    cy.on('window:alert', msg => {
      console.log(msg)
      expect(msg).to.be.equal('Confirmado')
    })

    cy.get('#confirm').click()
  })

  it.only('Confirm', () => {
    cy.get('#confirm').click()
    // Pega eventos que ocorrem na tela
    cy.on('window:confirm', msg => {
      console.log(msg)
      expect(msg).to.be.equal('Confirm Simples')
    })

    cy.on('window:alert', msg => {
      console.log(msg)
      expect(msg).to.be.equal('Confirmado')
    })

    cy.get('#confirm').click()
  })

  it.only('Deny', () => {
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
      return false
      // com esse return, estou pedindo para que o botão cancelar seja clicado
    })

    cy.on('window.alert', msg => {
      expect(msg).to.be.equal('Negado')
    })
    cy.get('#confirm').click()

    cy.get('#confirm').click()
  })


  it.only('Prompt', () => {
    // mocando método prompt do window
    // Agora tenho o objeto que está gerenciando toda a página
    // para trabalhar com ele, preciso coloca-lo em uma promisse que recebo como parâmetro o window
    cy.window().then(win => {
      // ;; o stub cria um método muito parecido com o do releaseEvents, porém
      // , o método é genérico e não sabe seu comportamento, desse modo, coloco o return e peço o que desejo
      cy.stub(win, 'prompt').returns('42')
    })

    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Era 42?')
    })

    cy.on('window:alert', msg => {
      console.log(msg)
      expect(msg).to.be.equal(':D')
    })

    cy.get('#prompt').click()



    // cy.get('#confirm').click()
    // // Pega eventos que ocorrem na tela
    // cy.on('window:prompt', msg => {
    //   console.log(msg)
    //   expect(msg).to.be.equal('Confirm Simples')
    // })

    // cy.on('window:alert', msg => {
    //   console.log(msg)
    //   expect(msg).to.be.equal('Confirmado')
    // })

  })


  it.only('Validando mensagens', () => {

    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

    cy.get('#formNome').type('Robson')
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

    cy.get('[data-cy=dataSobrenome]').type('Szabo')
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

    cy.get('#formSexoMasc').click()
    cy.get('#formCadastrar').click()

    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
  })
})