import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = '/#/signin'
Given('I open ghost page', () => {
  cy.visit(url)
})

When(`I login with {string} and password {string}`, (username, password) => {
  cy.login(username,password);
  cy.screenshot('Login Page');
})

Then(`I see {string} in the page`, (error) => {
  cy.get('p').contains(error)
})

Then(`I see {string} in the home page`, (usermail) => {
  cy.get('.gh-user-email').contains(usermail)
})

Then(`I see admin section in the home page`, (usermail) => {
  cy.get('.gh-nav-settings > .gh-nav-list-h').contains('Settings')
})

Then(`I am not able to see admin section in the home page`, (usermail) => {
  cy.get('.gh-nav-settings > .gh-nav-list-h').should('not.exist');
})

