import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'http://localhost:2368/ghost/#/signin'
Given('I open ghost page', () => {
  cy.visit(url)
})

When(`I login with {string} and password {string}`, (username, password) => {
  cy.login(username,password)
})

Then(`I see {string} in the page`, (error) => {
  cy.get('p').contains(error)
})