/// <reference types="cypress"/>


describe('Should test a funcional level', () => {
  let token

  before(() => {
    cy.getToken('lti@lti.com', '123456')
      .then(tkn => {
        token = tkn
      })
  })

  beforeEach(() => {
    cy.resetRest()
  })

  it('Should create an account', () => {
    cy.request({
      method: 'POST',
      url: '/contas',

      // também posso mandar o bearer
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'Conta via rest',
      }
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
  })

  it('Should update an account', () => {
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: 'Conta de Szabo alterada com sucesso '
      }

    }).then(res => {
      cy.request({
        url: `/contas/${res.body[0].id}`,
        method: 'PUT',
        headers: { Authorization: `JWT ${token}` },
        body: {
          nome: "Conta de Szabo alterada com sucesso"
        }
      }).as('response')
    })
    cy.get('@response').its('status').should('be.equal', 200)

  })

  it.only('Should not create an account with same name', () => {
    cy.request({
      url: '/contas',
      method: 'POST',
      // também posso mandar o bearer
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'Conta mesmo nome',
      },
      failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
      console.log(res)
      expect(res.status).to.be.equal(400)

      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
    })
  })

  it.only('Should create a transition', () => {
    cy.getContaByName('Conta para movimentacoes')
      .then(contaId => {
        cy.request({
          method: 'POST',
          url: '/transacoes',
          headers: { Authorization: `JWT ${token}` },
          body: {
            conta_id: "41656",
            data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
            data_transacao: Cypress.moment().format('DD/MM/YYYY'),
            descricao: "desc",
            envolvido: "inter",
            status: true,
            tipo: "REC",
            valor: "123"

          }
        }).as('response')

      })
    cy.get('@response').its('status').should('be.equal', 201)
    cy.get('@response').its('body.id').should('exist')
  })


  it('Should get balarce', () => {

  })

  it('Should remove a transaction', () => {

  })

})