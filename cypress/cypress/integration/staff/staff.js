import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/staff'
const url2 = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'
const url3 = 'https://ghost3-3-0.herokuapp.com/ghost/#/staff/admin'
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
    cy.get('#user-password-old').click().type(oldPassword);
    cy.get('#user-password-new').click().type(newPassword);
    cy.get('#user-new-password-verification').click().type(newPassword);
    cy.get('button > span').contains('Change Password').click();
})

When(`I reset password with old password {string} and new password {string}`, (oldPassword, newPassword) => {
    cy.get('#user-password-old').click().type(oldPassword);
    cy.get('#user-password-new').click().type(newPassword);
    cy.get('#user-new-password-verification').click().type(newPassword);
    cy.get('button > span').contains('Saved').click();
})

When(`I go to the bio from specific user and write {string}`, (text) => {
    cy.get('#user-bio').click({ force: true }).clear();
    cy.get('#user-bio').click({ force: true }).type(text);
    cy.get('button > span').contains('Save').click();
})

Then(`I see in the bio {string}`, (error) => {
    cy.get('#user-bio').should('have.value', error)
})

When(`I delete unsent email with email`, () => {
    // cy.reload()
    // cy.wait(4000)
    cy.get('.red-hover').contains('Revoke').click();
})

