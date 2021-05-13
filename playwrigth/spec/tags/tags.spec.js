const playwright = require('playwright');
const config = require('config');
const util = require('util');
const { Login } = require('../../src/login.page')
const { Tags } = require('../../src/tags.page')
const GhostAdminAPI = require('@tryghost/admin-api');
const url = `${config.url}`;
const urlLogin = `${url}/#/signin`;
const tagsUrl = `${url}/#/tags/new`;
const tagsUrlBase = `${url}/#/tags`;
const internalTagUrl = `${url}/#/tags?type=internal`;
describe('Given I open ghost page Tags', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let tagsPage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();     
        context = await browser.newContext({recordVideo: { dir: 'videos/' } });//{ 
        page = await context.newPage();
        loginPage = new Login(page);
        tagsPage = new Tags(page);
        await page.goto(url);
    });

    afterEach(async () => {
        await context.close();
        const api = new GhostAdminAPI({
            url: config.urlApi,
            // Admin API key goes here
            key: config.key,
            version: config.version
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
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            let text = await page.textContent(config.tags.playwrigth.create.emailUser);
            await page.goto(tagsUrl);
            await page.screenshot({path: './tags-page.png'});
            text = await page.textContent(config.tags.playwrigth.create.tagName);
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click(config.tags.playwrigth.create.publicTags);
            await page.screenshot({path: './tags-page-create.png'});
        });

        it('Then The tags "Tags Test" should be created', async () => {
            const text_ = await page.textContent(config.tags.playwrigth.create.listTagsName);
            expect(text_).toContain(nameTag);
        });
    });

    describe('I delete an internal tag a "Tags Test"', () => {
        let nameTag = 'Tags Test';
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            let text = await page.textContent(config.tags.playwrigth.create.emailUser);
            await page.goto(tagsUrl);
            text = await page.textContent(config.tags.playwrigth.create.tagName);
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click(config.tags.playwrigth.create.tagName);
            text = await page.click(util.format(config.tags.playwrigth.delete.listTagsNameItem,nameTag));
            await tagsPage.delete(nameTag);
            await page.screenshot({path: './tags-page-delete.png'});
            await page.goto(tagsUrlBase);
            await page.screenshot({path: './tags-page-delete_.png'});       
        });

        it('The tag "Tags Test" should not be found', async () => {
            await page.goto(tagsUrlBase);
            const text = await page.textContent(config.tags.playwrigth.delete.tagsPlaceHolder);
            expect(text).not.toContain(nameTag);
        });
    });

    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});














