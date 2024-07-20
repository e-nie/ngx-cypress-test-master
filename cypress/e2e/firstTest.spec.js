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

    it('Second test case', () => {
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
    it('Save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()



        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //here we are duplicating the code, we can not save the repeating code in a variable: INCORRECT APPROACH:
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')//сработает
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password') //а два не сработает уже, тк

        // ❗️Saving locators - CORRECT APPROACH:

        //1. Cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')


        //2. Using the cypress then() method

        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    //🔴 Extracting test values
    it.only(' Extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        //1. 
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')


        //but what about if we want to save the extracted text into the variable and use it later?


        //2. Using the JQuery text() method to extract the html text:

        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(label).should('contain', 'Email address')
        })

        //3. Using cypress method invoke() to extract the text:

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
            //can save as an alias:
            cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')
        })

        //4. Getting the value of class or any other attribute:

        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        //5. Invoke properties from the input field:
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com')
            .then((property) => {
            expect(property).to.equal('test@test.com')

        })

    })

})
