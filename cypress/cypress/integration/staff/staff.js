import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = '/#/staff'
const url3 = '/#/staff/admin'
const url2 = '/#/signin'
Given('I open ghost staff page to invite people', () => {
    cy.visit(url2)
})

When(`I login with {string} and password {string}`, (username, password) => {
    cy.login(username, password)
})

When(`I go to the staff page`, () => {
    cy.visit(url)
})

// I invite people with "pruebas@pruebas.com" and role "Administrator"
When(`I invite people with {string} and role {string}`, (email, role) => {
    cy.get('.view-actions').click();
    cy.get('#new-user-email').click().type(email);
    cy.get('#new-user-role').select(role);
    cy.get('button > span').contains('Send invitation now').click();
    cy.screenshot('pagina-send');
})

When(`I invite people with email in use {string} and role {string}`, (email, role) => {
    cy.get('.view-actions').click();
    cy.get('#new-user-email').click().type(email);
    cy.get('#new-user-role').select(role);
    cy.get('button > span').contains('Send invitation now').click();
    cy.screenshot('email-use');
})

Then(`I see {string} in the page`, (error) => {
    cy.get('div').contains(error)
})

Given('I open ghost staff page to invite people with email in use', () => {
    cy.visit(url2)
})

Given('I open ghost staff page in specific user', () => {
    cy.visit(url2)
})

When(`I go to the staff page in specific user`, () => {
    cy.visit(url3)
})
// I change password with old password "fakepassword1234" and new password "fakenewpassword"
When(`I change password with old password {string} and new password {string}`, (oldPassword, newPassword) => {
    cy.get('#user-password-old').click({force: true}).type(oldPassword);
    cy.get('#user-password-new').click({force: true}).type(newPassword);
    cy.get('#user-new-password-verification').click({force: true}).type(newPassword);
    cy.get('.button-change-password > span').contains('Change Password').click();
    cy.screenshot('error-pass');
})


When(`I go to the bio from specific user and write {string}`, (text) => {
    cy.get('#user-bio').click({ force: true }).clear();
    cy.get('#user-bio').click({ force: true }).type(text);
    cy.get('button > span').contains('Save').click();
    cy.screenshot('bio');
})

Then(`I see in the bio {string}`, (error) => {
    cy.get('#user-bio').should('have.value', error)
})

When(`I delete unsent email with email`, () => {
    // cy.reload()
    // cy.wait(4000)
    cy.get('.red-hover').contains('Revoke').click();
    cy.screenshot('unset-email');
})

