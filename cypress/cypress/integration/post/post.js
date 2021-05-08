import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url1 = 'http://localhost:2369/ghost/#/signin'
const url2 = 'http://localhost:2369/ghost/#/posts'
const url3 = 'http://localhost:2369/ghost/#/editor/post/608ef84525477f5493343ead';

Given('I open ghost post page to create one', () => {
    cy.visit(url1)
})

When(`I login with {string} and password {string}`, (username, password) => {
    cy.login(username,password)
})

Then(`I go to the post page`, () => {
    cy.visit(url2)
})

// I create a post with title "Post Test" and body "Cuerpo texto"
When(`I create a post with {title} and role {body}`, (title, body) => {
    cy.get('.view-actions').click();
    cy.get('#ember1675').click().type(title, {force: true});
    cy.get('#ember1676').select(body, {force: true});
    cy.get('#ember1669').click();
})

Then(`I go to the post page`, () => {
    cy.visit(url3)
})

// I change title with old text for new text "Post Test 2"
When(`I change title with old text for new text {string}`, (newTitle) => {
    cy.get('#ember1675').click().type(newTitle, {force: true});
    cy.get('#ember1965').click();
    cy.get('.gh-publishmenu-radio-content').contains('Set it live now').click();
    cy.get('button > span').contains('Publish').click();
    cy.get('#ember26 > article > div').contains('Published');
})