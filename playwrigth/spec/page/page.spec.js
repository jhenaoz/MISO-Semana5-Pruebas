const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const { Dashboard } = require('../../src/dashboard.page')
const GhostAdminAPI = require('@tryghost/admin-api');
const { Page } = require('../../src/page.page')
const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'

fdescribe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let dashboardPage;
    let pagePageObject;
    jasmine.DEFAULT_TIMEOUT_INTERVAL =200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        loginPage = new Login(page);
        dashboardPage = new Dashboard(page);
        pagePageObject= new Page(page);
        await page.goto(url);
    });

    afterEach(async () => {
        await context.close();
        const api = new GhostAdminAPI({
            url: 'https://ghost3-3-0.herokuapp.com',
            // Admin API key goes here
            key: '6096f662bee550001c0d879b:d93bbe382d07538ea15f32fec8068324047b2f3cac813396ad0ac9faff2bea13',
            version: 'v3'
        });
        
        api.pages.browse({limit: 10})
          .then((pages) => {
            pages.forEach((page) => {
              console.log('PAGE', page.id);
              api.pages.delete({id: page.id})
            })
          })
        .catch(error => console.error(error))
    });

    describe('When i login as an admin user', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
        });

        describe('I create a page with title "Page Test" and body "Cuerpo texto"', () => {
            beforeEach(async () => {
                await dashboardPage.navigateToPages();
            });
            it('The page "Page Test" should be created', async () => {
                await pagePageObject.createPage('Page Test', 'Cuerpo texto');
                const textContent = await page.textContent('h3.gh-content-entry-title:has-text("Page Test")')
                expect("Page Test").toBe(textContent.trim());
            });
        });

    });
});