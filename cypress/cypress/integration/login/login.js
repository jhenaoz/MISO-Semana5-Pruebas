import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'
Given('I open ghost page', () => {
  cy.visit(url)
})

When(`I login with {string} and password {string}`, (username, password) => {
  cy.login(username,password)
})

Then(`I see {string} in the page`, (error) => {
  cy.get('p').contains(error)
})