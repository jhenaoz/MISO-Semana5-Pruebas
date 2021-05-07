import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'http://localhost:2368/ghost/#/staff'
const url2 = 'http://localhost:2368/ghost/#/signin'
const url3 = 'http://localhost:2368/ghost/#/staff/javier'
Given('I open ghost staff page to invite people', () => {
    cy.visit(url2)
})

When(`I login with {string} and password {string}`, (username, password) => {
    cy.login(username,password)
})

Then(`I go to the staff page`, () => {
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

Then(`I go to the staff page in specific user`, () => {
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



