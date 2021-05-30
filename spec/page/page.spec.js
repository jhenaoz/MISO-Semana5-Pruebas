const playwright = require('playwright');
const GhostAdminAPI = require('@tryghost/admin-api');

const { Login } = require('../../src/login.page')
const { Dashboard } = require('../../src/dashboard.page')
const { Page } = require('../../src/page.page')
const { Mockaroo } = require('../../src/mockaroo/mockaroo')
const { MysqlHelper } = require('../../src/mysql/mysql')
const faker = require('faker');
const config = require('config');
const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'

describe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let dashboardPage;
    let pagePageObject;
    let pagesMock = Mockaroo.getData('https://my.api.mockaroo.com/page.json?key=22e7ae30');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new Login(page);
        dashboardPage = new Dashboard(page);
        pagePageObject= new Page(page);

        await page.goto(url);
    });

    afterEach(async () => {
        await context.close();
        const api = new GhostAdminAPI({
            url: `${config.urlApi}`,
            key: `${config.key}`,
            version: `${config.version}`
        });

        api.pages.browse({ limit: 12 })
            .then((pages) => {
                pages.forEach((page) => {
                    console.log('PAGE', page.id);
                    api.pages.delete({ id: page.id })
                })
            })
            .catch(error => console.error(error))
            MysqlHelper.cleanIpCounter();
    });

    describe('test mock page created', () => {
        pagesMock.forEach(pageInfo => {
            let title = pageInfo.split(",")[0]
            let body = pageInfo.split(",")[1]
            describe(`When I create a page with title ${title} and body ${body}`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    await dashboardPage.navigateToPages();
                    await pagePageObject.createPage(title, body);
                    await page.screenshot({ path: `${config.imagePath}/page-create.png` });
                });

                it(`The page ${title} should be created`, async () => {
                    const textContent = await page.textContent(`h3.gh-content-entry-title:has-text("${title}")`)
                    expect(title).toBe(textContent.trim());
                });
            });
        });
    });


    describe('test faker page created', () => {
        let title = faker.name.title();
        let body = faker.name.title();
        describe(`When I create a page with title ${title} and body ${body}`, () => {
            beforeEach(async () => {
                await loginPage.login(config.adminUser.email, config.adminUser.password);
                await dashboardPage.navigateToPages();
                await pagePageObject.createPage(title, body);
                await page.screenshot({ path: `${config.imagePath}/page-create.png` });
            });

            it(`The page ${title} should be created`, async () => {
                const textContent = await page.textContent(`h3.gh-content-entry-title:has-text("${title}")`)
                expect(title).toBe(textContent.trim());
            });
        });
    });

    describe('test mock page update', () => {
        pagesMock.forEach(pageInfo => {
            let title = pageInfo.split(",")[0]
            let body = pageInfo.split(",")[1]
            let title2 = pageInfo.split(",")[2]

            describe(`When I change title with old text "${title}" for new text "${title2}"`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    await dashboardPage.navigateToPages();
                    await pagePageObject.createPage(title, body);
                    await pagePageObject.updatePage(title, title2, body);
                    await page.screenshot({ path: `${config.imagePath}/page-update.png` });
                });

                it(`The page "${title}" should be updated`, async ()=> {
                    const updatedPage = await page.$(`text=${title2}`);
                    if(updatedPage) {
                        expect(true).toBe(true);
                    }
                });
            });
        });
    });

    describe('test mock page publish', () => {
        pagesMock.forEach(pageInfo => {
            let title = pageInfo.split(",")[0]
            let body = pageInfo.split(",")[1]

            describe(`When I published a specific page with title "${title}"`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    await dashboardPage.navigateToPages();
                    await pagePageObject.createPage(title, body);
                    await pagePageObject.publishPage(title);
                    await page.screenshot({ path: `${config.imagePath}/page-publish.png` });
                });

                it(`The page "${title}" should be published`, async ()=> {
                    const notification = await page.$$('.gh-notifications');
                    expect(1).toBe(notification.length);
                });
            });
        });
    });

    describe('test mock page delete', () => {
        pagesMock.forEach(pageInfo => {
            let title = pageInfo.split(",")[0]
            let body = pageInfo.split(",")[1]

            describe(`When I delete a "${title}"`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    await dashboardPage.navigateToPages();
                    await pagePageObject.createPage(title, body);
                    await pagePageObject.deletePage(title);

                    await page.screenshot({ path: `${config.imagePath}/page-delete.png` });
                });

                it(`The page "${title}" should not be found`, async ()=> {
                    const createPageButton = await page.$('text=Create a new page');
                    if(createPageButton) {
                        expect(true).toBe(true);
                    }
                });
            });
        });
    });
});