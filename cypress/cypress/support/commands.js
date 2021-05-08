// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
const GhostAdminAPI = require('@tryghost/admin-api');

Cypress.Commands.add('login', (username, password) => { 
    cy.get('#ember8').click().type(username);
    cy.get('#ember10').click().type(password);
    cy.get('#ember12').click();
 })

Cypress.Commands.add('deleteTags', () => {
    const api = new GhostAdminAPI({
        url: 'https://ghost3-3-0.herokuapp.com',
        // Admin API key goes here
        key: '6096f662bee550001c0d879b:d93bbe382d07538ea15f32fec8068324047b2f3cac813396ad0ac9faff2bea13',
        version: 'v3'
    });
    
    api.tags.browse({limit: 10})
      .then(tags => tags.forEach(tag => {
        api.tags.delete({id: tag.id});
      }))
      .catch(error => console.error(error));
}) 
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
