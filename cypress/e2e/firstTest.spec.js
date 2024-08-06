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
    //❗️Сохранение локаторов

    it('Save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()



        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //🔴here we are duplicating the code, we can not save the repeating code in a variable: INCORRECT APPROACH:
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')//сработает
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password') //а два не сработает уже, тк ищет только один раз

        //поэтому используем алиасы
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
    it(' Extract text values', () => {
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
    it('Radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1. Using the cypress method check() to select the radio button:
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            // cy.wrap(radioButtons).first().check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({ force: true }).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        }
        )
    })

    it('Checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({ force: true })
    })

    it('Datepicker', () => {

        function selectDay(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureMonth = date.toLocaleDateString('en-US', { month: 'short' })
            let futureDay = date.getDate()
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDay(day)
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }
            })
            return dateToAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDay(100)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    })

    it('Lists and dropdowns', () => {
        cy.visit('/')

        //1.
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        //2. Looping through the dropdown list to select all the options one by one:

        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                if (index < 3) {
                    cy.wrap(dropdown).click()
                }

            })

        })

    })

    it.only('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1. Get the row of the table by the text of the cell:
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        //2. Get the row by index:
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Adam')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Sandler')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Adam')
            cy.wrap(tableColumns).eq(3).should('contain', 'Sandler')
        })


        //3. Get each row of the table and assert the values:
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder = "Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (age === 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })

        })

    })


})

