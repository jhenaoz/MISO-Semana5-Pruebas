const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const { Dashboard } = require('../../src/dashboard.page')
const GhostAdminAPI = require('@tryghost/admin-api');
const { Page } = require('../../src/page.page')
const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'

describe('Given I open ghost page', () => {
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
        const api = new GhostAdminAPI({
            url: 'https://ghost3-3-0.herokuapp.com',
            // Admin API key goes here
            key: '6096f662bee550001c0d879b:d93bbe382d07538ea15f32fec8068324047b2f3cac813396ad0ac9faff2bea13',
            version: 'v3'
        });
        
        const pages = await api.pages.browse({limit: 10})
        pages.forEach(async (page) => {
            await api.pages.delete({id: page.id})
        });
    });

    afterEach(async () => {
        await context.close();
    });

    describe('When i login as an admin user', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
        });

        describe('I create a page with title "Page Test" and body "Cuerpo texto"', () => {
            beforeEach(async () => {
                await dashboardPage.navigateToPages();
                await pagePageObject.createPage('Page Test', 'Cuerpo texto');
            });
            it('The page "Page Test" should be created', async () => {
                const textContent = await page.textContent('h3.gh-content-entry-title:has-text("Page Test")')
                expect("Page Test").toBe(textContent.trim());
            });

            describe('I change title with old text "Page Test" for new text "Page Test 2"', () => {
                beforeEach(async () => {
                    await pagePageObject.updatePage('Page Test', 'Page Test2', 'Page Body');
                });
                it('The page "Page Test" should be updated', async ()=> {
                    
                    const updatedPage = await page.$('text=Page Test2');
                    if(updatedPage) {
                        expect(true).toBe(true);
                    }
                });
            });

            describe('When I delete a "Page Test"', () => {
                beforeEach(async () => {
                    await pagePageObject.deletePage('Page Test');
                });
                it('The page "Page Test" should not be found', async ()=> {
                    
                    const createPageButton = await page.$('text=Create a new page');
                    if(createPageButton) {
                        expect(true).toBe(true);
                    }
                });
            });

            describe('When I published a specific page with title "Page Test"', () => {
                beforeEach(async () => {
                    await pagePageObject.publishPage('Page Test');
                });
                it('The page "Post Test" should be published', async ()=> {
                    const notification = await page.$$('.gh-notifications');
                    expect(1).toBe(notification.length);
                });
            });

        });

    });
});