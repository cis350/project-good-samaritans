// webapp.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('us', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000')
    })
  
    it('logs in', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('input[id="1"]').type('Monkey').should('have.value', 'Monkey')
      cy.get('input[id="2"]').type('password').should('have.value', 'password')
      cy.get('button[id="3"]').click()
      })

      it('does not approve login', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('input[id="1"]').type('Monkey').should('have.value', 'Monkey')
        cy.get('input[id="2"]').type('123').should('have.value', '123')
        cy.get('button[id="3"]').click()
        //if on homepage, should be able to do this
        cy.get('input[id="1"]').type('Monkey').should('have.value', 'MonkeyMonkey')
        })

        it('training', () => {
            // We use the `cy.get()` command to get all elements that match the selector.
            // Then, we use `should` to assert that there are two matched items,
            // which are the two default items.
            cy.get('input[id="1"]').type('Monkey').should('have.value', 'Monkey')
            cy.get('input[id="2"]').type('password').should('have.value', 'password')
            cy.get('button[id="3"]').click()
            cy.get('button[id="training"]').click();
            //should be able to return if on training
            cy.get('button').click();
        })

        it('account', () => {
            // We use the `cy.get()` command to get all elements that match the selector.
            // Then, we use `should` to assert that there are two matched items,
            // which are the two default items.
            cy.get('input[id="1"]').type('Monkey').should('have.value', 'Monkey')
            cy.get('input[id="2"]').type('password').should('have.value', 'password')
            cy.get('button[id="3"]').click()
            cy.get('button[id="account"]').click();
            //should be able to return if on account
            cy.get('button').click();
        })

        it('my help posts', () => {
            // We use the `cy.get()` command to get all elements that match the selector.
            // Then, we use `should` to assert that there are two matched items,
            // which are the two default items.
            cy.get('input[id="1"]').type('Monkey').should('have.value', 'Monkey')
            cy.get('input[id="2"]').type('password').should('have.value', 'password')
            cy.get('button[id="3"]').click()
            cy.get('button[id="16"]').click();
        })

        it('messaging', () => {
            // We use the `cy.get()` command to get all elements that match the selector.
            // Then, we use `should` to assert that there are two matched items,
            // which are the two default items.
            cy.get('input[id="1"]').type('Monkey').should('have.value', 'Monkey')
            cy.get('input[id="2"]').type('password').should('have.value', 'password')
            cy.get('button[id="3"]').click()
            cy.get('button[id="17"]').click()
            cy.get('input[id="21"]').type('Bob Oke').should('have.value', 'Bob Oke')
            cy.get('button[id="22"]').click()
        })


        it('messaging sends back', () => {
            // We use the `cy.get()` command to get all elements that match the selector.
            // Then, we use `should` to assert that there are two matched items,
            // which are the two default items.
            cy.get('input[id="1"]').type('Monkey').should('have.value', 'Monkey')
            cy.get('input[id="2"]').type('password').should('have.value', 'password')
            cy.get('button[id="3"]').click()
            cy.get('button[id="17"]').click()
            cy.get('input[id="21"]').type('Bob Oke').should('have.value', 'Bob Oke')
            cy.get('button[id="22"]').click()
            cy.get('button[id="23"]').click()
        })
    
    })