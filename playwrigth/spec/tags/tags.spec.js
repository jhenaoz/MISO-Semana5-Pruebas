const playwright = require('playwright');
const { Login } = require('../../src/login.page')
const { Tags } = require('../../src/tags.page')
const GhostAdminAPI = require('@tryghost/admin-api');
const url = 'https://ghost3-3-0.herokuapp.com/ghost/#/signin';
const tagsUrl = 'https://ghost3-3-0.herokuapp.com/ghost/#/tags/new';
const tagsUrlBase = 'https://ghost3-3-0.herokuapp.com/ghost/#/tags';
const internalTagUrl = 'https://ghost3-3-0.herokuapp.com/ghost/#/tags?type=internal';

describe('Given I open ghost page Tags', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let tagsPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch({headless:false});     
        context = await browser.newContext({recordVideo: { dir: 'videos/' } });//{ 
        page = await context.newPage();
        loginPage = new Login(page);
        tagsPage = new Tags(page);
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
        
        api.tags.browse({limit: 10})
          .then((tags) => {
            tags.forEach((tag) => {
              console.log('TAGS', tag.id);
              api.tags.delete({id: tag.id})
            })
          })
        .catch(error => console.error(error))
    });
    describe('I create a tags with title "Tags Test" and body "Cuerpo texto"', () => {
        let nameTag = 'Tags Test';
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            let text = await page.textContent('.gh-user-email');
            await page.goto(tagsUrl);
            await page.screenshot({path: './tags-page.png'});
            text = await page.textContent('#tag-name');
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click('text=\'Public tags\'');
            await page.screenshot({path: './tags-page-create.png'});
        });

        it('Then The tags "Tags Test" should be created', async () => {
            const text_ = await page.textContent('.gh-tag-list-name');
            expect(text_).toContain(nameTag);
        });
    });

    describe('I delete an internal tag a "Tags Test"', () => {
        let nameTag = 'Tags Test';
        beforeEach(async () => {
            await loginPage.login('admin-user@mailsac.com', 'Test4echo!');
            let text = await page.textContent('.gh-user-email');
            await page.goto(tagsUrl);
            text = await page.textContent('#tag-name');
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click('text=\'Public tags\'');
            text = await page.click('.gh-tag-list-name:has-text(\''+nameTag+'\')');
            await tagsPage.delete(nameTag);
            await page.screenshot({path: './tags-page-delete.png'});
            await page.goto(tagsUrlBase);
            await page.screenshot({path: './tags-page-delete_.png'});       
        });

        it('The tag "Tags Test" should not be found', async () => {
            await page.goto(tagsUrlBase);
            const text = await page.textContent('.gh-tags-placeholder');
            expect(text).not.toContain('Tags Test');
        });
    });

    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});














