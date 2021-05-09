import { Given, Then, When, Before } from "cypress-cucumber-preprocessor/steps";

const url1 = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'
const urlPage = 'https://ghost3-3-0.herokuapp.com/ghost/#/pages';


Given('I open ghost page', () => {
    cy.visit(url1)
})

When('I login with {string} and password {string}', (username, password) => {
    cy.login(username,password)
})


When(`I create a page with title {string} and body {string}`, (title, body) => {
    cy.get('[href="#/pages/"]').click({force: true});
    cy.get('[href="#/editor/page/"]').click({force: true});
    cy.get('.gh-editor-title').click({force: true}).type(title);
    cy.get('.koenig-editor__editor').click({force: true}).type(body);
})

Then('The page {string} should be created', (postTitle) => {
    cy.visit(urlPage);
    // cy.get('.gh-post-list-title').contains(postTitle);
});

// I change title with old text "Post Test" for new text "Post Test 2"
When('I change title with old text {string} for new text {string}', (oldTitle, newTitle) => {
    cy.get('[href="#/pages/"]').click({force: true});
    cy.get('.gh-post-list-title').contains(oldTitle).click({force: true});
    cy.get('.gh-editor-title').click({force: true}).clear();
    cy.get('.gh-editor-title').click({force: true}).type(newTitle);
})
// The page "Page Test" should be created
Then('The page {string} should be updated', (postTitle) => {
    cy.visit(urlPage);
    cy.get('.gh-post-list-title').contains(postTitle);
});

// I published a specific post with title "Post Test"
When('I published a specific post with title {string}', (pageTitle) => {
    cy.get('[href="#/pages/"]:nth(1)').click({force: true});
    cy.get('.gh-post-list-title').contains(pageTitle).click({force: true});
    cy.get('.view-actions').contains('Publish').click();
    // cy.get('.gh-publishmenu-dropdown > .gh-publishmenu-radio').contains('Set it live now').click();
    cy.get('button > span').contains('Publish').click();
})

Then('The page {string} should be published', (pageTitle) => {
    cy.visit(urlPage);
    cy.get('.gh-post-list-title').contains(pageTitle);
    cy.get('.gh-post-list-status').contains('Published');
});

// I delete a "Post Test"
When('I delete a {string}', (pageTitle) => {
    // cy.wait(2000)
    cy.reload()
    cy.visit(urlPage);
    cy.get('.gh-post-list-title').contains(pageTitle).click({force: true});
    cy.get('.post-settings').click();
    cy.get('button > span').contains('Delete page').click();
    cy.get('.modal-footer > button').contains('Delete').click();
});

Then('The page {string} should not be found', () => {
    cy.get('h3').contains("You haven't created any pages yet!")
});

Before(() => {
  cy.deletePages();
});
