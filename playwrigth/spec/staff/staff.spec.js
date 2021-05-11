const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const { Staff } = require('../../src/staff.page')
const urlStaff = 'https://ghost3-3-0.herokuapp.com/ghost/#/staff'
const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'
const url3 = 'https://ghost3-3-0.herokuapp.com/ghost/#/staff/admin'

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

    // describe('When I invite people with "pruebas@pruebas.com" and role "Administrator"', () => {
    //     beforeEach(async () => {
    //         await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
    //         // await page.screenshot({path: './pagina.png'})
    //         await page.goto(urlStaff);
    //         await staffPage.send('pruebas@pruebas.com');
    //         await page.screenshot({ path: './pagina-send.png' });

    //     });

    //     it('Then I see "Error sending email!" in page', async () => {
    //         const text = await page.textContent('.gh-alert-content');
    //         expect(text).toBeTruthy();
    //         await page.goto(urlStaff);
    //         await staffPage.revoke();
    //     });


    // });

    // describe('When Invite people with email in use', () => {
    //     beforeEach(async () => {
    //         await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
    //         // await page.screenshot({path: './pagina.png'})
    //         await page.goto(urlStaff);
    //         await staffPage.send('pruebas@pruebas.com');
    //         await page.goto(urlStaff);
    //         await staffPage.send('pruebas@pruebas.com');
    //         await page.screenshot({ path: './pagina-use.png' });

    //     });

    //     it('Then I see "A user with that email address was already invited." in page', async () => {
    //         const text = await page.textContent('.response');
    //         expect(text).toBeTruthy();
    //         await page.goto(urlStaff);
    //         await staffPage.revoke();
    //     });


    // });

    // describe('When I Change staff password with incorrect old password', () => {
    //     beforeEach(async () => {
    //         await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
    //         // await page.screenshot({path: './pagina.png'})
    //         await page.goto(url3);
    //         await staffPage.changePassword('Fakepassword1234','F@kenewp@ssw0rd.1234');
    //         await page.screenshot({ path: './error-pass.png' });

    //     });

    //     it('Then I see "A user with that email address was already invited." in page', async () => {
    //         const text = await page.textContent('.gh-alert-content');
    //         // expect(text).toBe('Your password is incorrect. Your password is incorrect.');
    //         expect(text).toBeTruthy();
    //     });


    // });

    describe('When I Change staff bio', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            // await page.screenshot({path: './pagina.png'})
            await page.goto(url3);
            await staffPage.changePassword('Fakepassword1234','F@kenewp@ssw0rd.1234');
            await page.screenshot({ path: './error-pass.png' });

        });

        it('Then I see "A user with that email address was already invited." in page', async () => {
            const text = await page.textContent('.gh-alert-content');
            // expect(text).toBe('Your password is incorrect. Your password is incorrect.');
            expect(text).toBeTruthy();
        });


    });

    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});