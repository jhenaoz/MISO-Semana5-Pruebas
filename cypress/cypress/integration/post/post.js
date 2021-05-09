import { Given, Then, When, After } from "cypress-cucumber-preprocessor/steps";

const url1 = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'
const urlPost = 'https://ghost3-3-0.herokuapp.com/ghost/#/posts';
const urlDraft= 'https://ghost3-3-0.herokuapp.com/ghost/#/posts?type=draft';

Given('I open ghost page', () => {
    cy.visit(url1)
})

When('I login with {string} and password {string}', (username, password) => {
    cy.login(username,password)
})

// I create a post with title "Post Test" and body "Cuerpo texto"
When(`I create a post with title {string} and body {string}`, (title, body) => {
    cy.get('[href="#/posts/"]').click({force: true});
    cy.get('[href="#/editor/post/"]').click({force: true});
    cy.get('.gh-editor-title').click({force: true}).type(title);
    cy.get('.koenig-editor__editor').click({force: true}).type(body);
})

Then('The post {string} should be created', (postTitle) => {
    cy.visit(urlPost);
    cy.get('.gh-post-list-title').contains(postTitle);
});

// I change title with old text "Post Test" for new text "Post Test 2"
When('I change title with old text {string} for new text {string}', (oldTitle, newTitle) => {
    cy.get('[href="#/posts/"]:nth(1)').click({force: true});
    cy.get('.gh-post-list-title').contains(oldTitle).click({force: true});
    cy.get('.gh-editor-title').click({force: true}).clear();
    cy.get('.gh-editor-title').click({force: true}).type(newTitle);
})

Then('The post {string} should be updated', (postTitle) => {
    cy.visit(urlPost);
    cy.get('.gh-post-list-title').contains(postTitle);
});

// I published a specific post with title "Post Test"
When('I published a specific post with title {string}', (postTitle) => {
    cy.get('[href="#/posts/"]').click({force: true});
    cy.get('.gh-post-list-title').contains(postTitle).click({force: true});
    cy.get('.view-actions').contains('Publish').click();
    // cy.get('.gh-publishmenu-dropdown > .gh-publishmenu-radio').contains('Set it live now').click();
    cy.get('button > span').contains('Publish').click();
})

Then('The post {string} should be published', (postTitle) => {
    cy.visit(urlPost);
    cy.get('.gh-post-list-title').contains(postTitle);
    cy.get('.gh-post-list-status').contains('Published');
});

// I delete a "Post Test"
When('I delete a {string}', (postTitle) => {
    cy.visit(urlPost);
    cy.get('.gh-post-list-title').contains(postTitle).click({force: true});
    cy.get('.post-settings').click();
    cy.get('button > span').contains('Delete post').click();
    cy.get('.modal-footer > button').contains('Delete').click();
});

Then('The post {string} should not be found', () => {
    cy.get('h3').contains("You haven't written any posts yet!")
});

When('I published a draft post with title {string}', (postTitle) => {
    cy.visit(urlDraft)
    cy.get('.gh-post-list-title').contains(postTitle).click({force: true});
    cy.get('.view-actions').contains('Publish').click();
    // cy.get('.gh-publishmenu-dropdown > .gh-publishmenu-radio').contains('Set it live now').click();
    cy.get('button > span').contains('Publish').click();
});

After(() => {
    cy.deletePost();
  });
