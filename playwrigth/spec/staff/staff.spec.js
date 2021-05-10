const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/staff'
const url2 = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin'
const url3 = 'https://ghost3-3-0.herokuapp.com/ghost/#/staff/admin'

describe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let page2;
    let loginPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL =200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        page2 = await context.newPage();
        loginPage = new Login(page);
        await page.goto(url2);
    });

    describe('When i login as and admin user', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            // await page.screenshot({path: './pagina.png'})
        });


        describe('When I go to the staff page',  () => {
            beforeEach(async () => {
                await page2.goto(url);
                await page2.click("button");
                await page2.screenshot({path: './pagina4.png'})
                await page2.fill('#new-user-email', 'pruebas@pruebas.com');
                await page.selectOption('#new-user-role', 'Administrator');
                await page2.click(":has-text(\"Send invitation now\")");
                await page2.screenshot({path: './pagina2.png'})
            });
            
            it('Then I see "Error sending email!" in page', async () => {
                const text = await page2.textContent('div');
                expect(text).toBe('Error sending email!');
                await page2.screenshot({path: './pagina3.png'})
            });
        
        });
        
        
    });

    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});