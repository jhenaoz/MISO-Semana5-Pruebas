const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const { Tags } = require('../../src/tags.page')

const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin';
const tagsUrl = 'https://ghost3-3-0.herokuapp.com/ghost/#/tags';
const internalTagUrl = 'https://ghost3-3-0.herokuapp.com/ghost/#/tags?type=internal';

describe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

    beforeEach(async () => {
        browser = await playwright['chrome'].launch(   {headless: false});
           
            
        context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        
        loginPage = new Login(page);
        tagsPage = new Tags(page);
        await page.goto(url);
    });
    describe('I create a tags with title "Tags Test" and body "Cuerpo texto"', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            await page.goto(tagsUrl);
            //await page.goto(internalTagUrl);
            await page.screenshot({path: './tags-page.png'});
            await tagsPage.create('Tags Test');
            await page.screenshot({path: './tags-page-create.png'});
        });

        it('Then The tags "Tags Test" should be created', async () => {
            const text = await page.textContent('.gh-tag-list-name');
            expect(text).toContain('Tags Test');
        });
    });

    

   /* describe('I delete a "Tags Test"', () => {
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            await page.goto(tagsUrl);
            await page.screenshot({path: './tags-page.png'});
            await tagsPage.delete('Tags Test');
            await page.screenshot({path: './tags-page-delete.png'});
        });

        it('The post "Tags Test" should not be found', async () => {
            await page.goto(tagsUrl);
            const text = await page.textContent('.gh-tag-list-name');
            expect(text).not.toContain('Tags Test');
        });
    });
*/
    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});