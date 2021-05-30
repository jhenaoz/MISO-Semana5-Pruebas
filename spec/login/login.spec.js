const config = require('config');
const playwright = require('playwright');
const { Login } = require('../../src/login.page');
const { MysqlHelper } = require('../../src/mysql/mysql')
const url = `${config.url}/#/signin`;

describe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL =200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new Login(page);
        await page.goto(url);
    });

    afterEach(async () => {
        await context.close();
        MysqlHelper.cleanIpCounter();
    });

    describe('When i login as an admin user', () => {
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            await page.screenshot({ path: `${config.imagePath}/pagina-login.png` });

        });

        it('Then I see "admin-user@mailsac.com" in the home page', async () => {
            const text = await page.textContent('.gh-user-email');
            await page.screenshot({ path: `${config.imagePath}/pagina-dashboard.png` });
            expect(text).toBe(config.adminUser.email);
        });

        it('Then I see admin section in the home page', async () => {
            const text = await page.textContent('.gh-user-email');
            const settingsSection = await page.textContent('.gh-nav-settings>.gh-nav-list-h');
            expect(settingsSection).toBe('Settings');
            expect(text).toBe(config.adminUser.email);
        });
    });

    describe('When i login as an editor user', () => {
        beforeEach(async () => {
            await loginPage.login(config.editorUser.email, config.editorUser.password);
        });

        it('Then I see "staff-user@mailsac.com" in the home page', async () => {
            const text = await page.textContent('.gh-user-email');
            
            expect(text).toBe(config.editorUser.email);
        });
    });
});