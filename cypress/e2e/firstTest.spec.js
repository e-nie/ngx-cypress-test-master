/// <reference types="cypress" />


describe('First test suite', () => {


    it('First test case', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        //find by tag name
        cy.get('input')

        //by id
        cy.get('#inputEmail1')

        //by class value
        cy.get('.input-full-width')

        //atrr name
        cy.get('[fullwidth]')

        //by attribute and value
        cy.get('[placeholder="Email"]')

        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by two attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag , attribute, id and class value
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //❗️by cypress testId
        cy.get('[data-cy="imputEmail1"')

    })

    it.only('Second test case', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Theory
        //get() method is used to get the element on the page by locator globally
        //find() method is used to find the element within the element(child) on the page by locator
        //contains() method is used to find the element by HTML text,  and by text and locator

        cy.contains('Sign in')
        cy.contains(' [status="warning"]', 'Sign in')

        //❗️сначала один метод, потом find
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()








    })
})
