import { Given, Then, When, After } from "cypress-cucumber-preprocessor/steps";

const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin';
const tagsUrl = 'https://ghost3-3-0.herokuapp.com/ghost/#/tags';
const internalTagUrl = 'https://ghost3-3-0.herokuapp.com/ghost/#/tags?type=internal';

Given('I open ghost page', () => {
  cy.visit(url)
})

When('I login with {string} and password {string}', (username, password) => {
  cy.login(username,password)
});

When(`I create a new tag with the name {string}`, (tagName) => {
  cy.get('[href="#/tags/"]').click();
  cy.get('.gh-btn').contains('New tag').click();
  cy.get('#tag-name').click({force: true}).type(tagName);
  cy.get('button').contains('Save').click();
});


When('I delete an internal tag {string}', (tagName) => {
  cy.reload()
  cy.visit(internalTagUrl);
  cy.get('.gh-tag-list-name').contains(tagName).click();
  cy.get('button').contains('Delete tag').click();
  cy.get('.modal-footer > button').contains('Delete').click();
});

When('I delete a {string}', (tagName) => {
  cy.visit(tagsUrl);
  cy.get('.gh-tag-list-name').contains(tagName).click();
  cy.get('button').contains('Delete tag').click();
  cy.get('.modal-footer > button').contains('Delete').click();
});


Then('The internal tag {string} should not be present', () => {
  cy.reload()
  cy.visit(internalTagUrl);
  cy.get('h3').contains("You haven't created any internal tags yet!")
});

Then('The tag {string} should not be present', () => {
    cy.get('h3').contains("You haven't created any public tags yet!")
});

Then('The tag {string} should be created', (tagName) => {
  cy.visit(tagsUrl);
  cy.get('.gh-tag-list-name').contains(tagName);
});

Then('The internal tag {string} should be created', (tagName) => {
  cy.reload()
  cy.visit(internalTagUrl);
  cy.get('.gh-tag-list-name').contains(tagName);
});

After(() => {
  cy.deleteTags();
});
