const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const { Staff } = require('../../src/staff.page')
const config = require('config');
const url = `${config.url}/#/signin`;
const urlStaff = `${config.url}/#/staff`;
const url3 = `${config.url}/#/staff/admin`;

fdescribe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        loginPage = new Login(page);
        staffPage = new Staff(page);
        await page.goto(url);
    });

    fdescribe('When I invite people with "pruebas@pruebas.com" and role "Administrator"', () => {
        beforeEach(async () => {
            await loginPage.login(config.editorUser.email, config.editorUser.password);
            await page.goto(urlStaff);
            await staffPage.send('pruebas@pruebas.com');
            await page.screenshot({ path: `${config.imagePath}/pagina-send.png` });

        });

        it('Then I see "Error sending email!" in page', async () => {
            const text = await page.textContent('.gh-alert-content');
            expect(text).toBeTruthy();
            await page.goto(urlStaff);
            await staffPage.revoke();
        });


    });

    describe('When Invite people with email in use', () => {
        beforeEach(async () => {
            await loginPage.login(config.editorUser.email, config.editorUser.password);
            // await page.screenshot({path: './pagina.png'})
            await page.goto(urlStaff);
            await staffPage.send('pruebas@pruebas.com');
            await page.goto(urlStaff);
            await staffPage.send('pruebas@pruebas.com');
            await page.screenshot({ path: './pagina-use.png' });

        });

        it('Then I see "A user with that email address was already invited." in page', async () => {
            const text = await page.textContent('.response');
            expect(text).toBeTruthy();
            await page.goto(urlStaff);
            await staffPage.revoke();
        });


    });

    describe('When I Change staff password with incorrect old password', () => {
        beforeEach(async () => {
            await loginPage.login(config.editorUser.email, config.editorUser.password);
            // await page.screenshot({path: './pagina.png'})
            await page.goto(url3);
            await staffPage.changePassword('Fakepassword1234','F@kenewp@ssw0rd.1234');
            await page.screenshot({ path: './error-pass.png' });

        });

        it('Then I see "A user with that email address was already invited." in page', async () => {
            const text = await page.textContent('.gh-alert-content');
            expect('Your password is incorrect. Your password is incorrect.').toBe(text.trim());
            // expect(text).toBeTruthy();
        });


    });

    describe('When I Change staff bio', () => {
        beforeEach(async () => {
            await loginPage.login(config.editorUser.email, config.editorUser.password);
            // await page.screenshot({path: './pagina.png'})
            await page.goto(url3);
            await staffPage.changeBio('Test BIO2');
            await page.screenshot({ path: './error-pass.png' });

        });

        it('Then I see "A user with that email address was already invited." in page', async () => {
            // const text = await page.textContent('#user-bio');
            const text = await page.$eval("#user-bio", el => el.value);
            expect(text).toBe('Test BIO2');
            // expect(text).toBeTruthy();
        });

    });

    describe('When I delete unsent email', () => {
        beforeEach(async () => {
            await loginPage.login(config.editorUser.email, config.editorUser.password);
            // await page.screenshot({path: './pagina.png'})
            await page.goto(urlStaff);
            await staffPage.send('pruebas@pruebas.com');
            await page.screenshot({ path: './pagina-send.png' });

        });

        it('Then I see "Invitation revoked" in page', async () => {
            await page.goto(urlStaff);
            await staffPage.revoke();
            const text = await page.textContent('.gh-notification-content');
            expect('Invitation revoked').toBeTruthy(text.trim());
        });


    });
    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});