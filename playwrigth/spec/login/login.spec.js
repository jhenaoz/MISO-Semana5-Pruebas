const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'

describe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL =200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        loginPage = new Login(page);
        await page.goto(url);
    });

    describe('When i login as and admin user', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            await page.screenshot({path: './pagina.png'})
        });

        it('Then I see "admin-user@mailsac.com" in the home page', async () => {
            const text = await page.textContent('.gh-user-email');

            expect(text).toBe('admin-user@mailsac.com');
        });
    });

    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});