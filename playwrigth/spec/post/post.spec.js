const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const { Post } = require('../../src/post.page')

const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'
const urlPost = 'https://ghost3-3-0.herokuapp.com/ghost/#/posts';
const urlEPost = 'https://ghost3-3-0.herokuapp.com/ghost/#/editor/post/';

describe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let postPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        loginPage = new Login(page);
        postPage = new Post(page);
        await page.goto(url);
    });

    describe('When I create a post with title "Post Test" and body "Cuerpo texto"', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            await page.screenshot({path: './post-page.png'});
            await page.goto(urlEPost);
            await postPage.post('Post Test', 'Cuerpo texto');
            await page.screenshot({path: './post-page-create.png'});
        });

        it('Then The post "Post Test" should be created', async () => {
            await page.goto(urlPost);
            const text = await page.textContent('.gh-post-list-title');
            expect(text).toContain('Post Test');
        });
    });

    describe('When I change title with old text "Post Test 1" for new text "Post Test 2"', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            await page.goto(urlEPost);
            await postPage.post('Post Test 1', 'Cuerpo texto 1');

            await page.goto(urlPost);
            await postPage.search('Post Test 1');
            await postPage.post('Post Test 2', 'Cuerpo texto 2');
            await page.screenshot({path: './post-page-update.png'});
        });

        it('Then the post "Post Test" should be updated', async () => {
            await page.goto(urlPost);
            const text = await page.textContent('.gh-post-list-title');
            expect(text).toContain('Post Test 2');
        });
    });

    describe('When I published a specific post with title "Post Test 3"', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            await page.goto(urlEPost);
            await postPage.post('Post Test 3', 'Cuerpo texto 3');

            await page.goto(urlPost);
            await postPage.publish('Post Test 3');
            await page.screenshot({path: './post-page-publish.png'});
        });

        it('Then the post "Post Test 3" should be published', async () => {
            await page.goto(urlPost);
            const text = await page.textContent('.gh-post-list-status');
            expect(text).toContain('Published');
        });
    });

    describe('When I delete a "Post Test 4"', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            await page.goto(urlEPost);
            await postPage.post('Post Test 4', 'Se va a borrar');

            await page.goto(urlPost);
            await postPage.remove('Post Test 4');
            await page.screenshot({path: './post-page-delete.png'});
        });

        it('Then the post "Post Test 4" should not be found', async () => {
            await page.goto(urlPost);
            const text = await page.textContent('.gh-post-list-title');
            expect(text).not.toContain('Post Test 4');
        });
    });

    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});