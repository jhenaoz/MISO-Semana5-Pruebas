import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url1 = 'http://localhost:2368/ghost/#/signin'
const url2 = 'http://localhost:2368/ghost/#/post'

Given('I open ghost post page to create one', () => {
    cy.visit(url1)
})

When(`I login with {string} and password {string}`, (username, password) => {
    cy.login(username,password)
})

Then(`I go to the post page`, () => {
    cy.visit(url2)
})