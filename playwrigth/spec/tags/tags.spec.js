const playwright = require('playwright');
const config = require('config');
const { Login } = require('../../src/login.page')
const { Tags } = require('../../src/tags.page')
const GhostAdminAPI = require('@tryghost/admin-api');
const { Mockaroo } = require('../../src/mockaroo/mockaroo')
const url = `${config.url}`;
const tagsUrl = `${url}/#/tags/new`;
const tagsUrlBase = `${url}/#/tags`;

describe('Given I open ghost page Tags', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let tagsPage;
    let tagsInfo = Mockaroo.getDataTag();
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
            url: `${config.urlApi}`,
            // Admin API key goes here
            key: `${config.key}`,
            version: `${config.version}`
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
   

    describe('I create a tags mocks', () => {
        tagsInfo.forEach(postInfo => {
            let nameTag = postInfo.split(",")[0];
            describe(`When I create a tags with name ${nameTag}`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    let text = await page.textContent('.gh-user-email');
                    await page.goto(tagsUrl);
                    await page.screenshot({path: `${config.imagePath}/tags-page.png`});
                    text = await page.textContent('#tag-name');
                    await tagsPage.create(nameTag);
                    await page.goto(tagsUrlBase);
                    text = await page.click('text=\'Public tags\'');
                    await page.screenshot({path:`${config.imagePath}/tags-page-create.png`});
                });
        
                it('Then The tags "'+nameTag+'" should be created', async () => {
                    const text_ = await page.textContent('.gh-tag-list-name');
                    expect(text_).toContain(nameTag);
                });
            });
        });
    });

    describe('I create a internal tags mocks', () => {
        tagsInfo.forEach(postInfo => {
            let nameTag = "#"+postInfo.split(",")[0];
            describe(`When I create a internal tags with name ${nameTag} `, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    let text = await page.textContent('.gh-user-email');
                    await page.goto(tagsUrl);
                    await page.screenshot({path: `${config.imagePath}/tags-page.png`});
                    text = await page.textContent('#tag-name');
                    await tagsPage.create(nameTag);
                    await page.goto(tagsUrlBase);
                    text = await page.click('text=\'Internal tags\'');
                    await page.screenshot({path:`${config.imagePath}/tags-page-create.png`});
                });
        
                it('Then The tags "'+nameTag+'" should be created', async () => {
                    const text_ = await page.textContent('.gh-tag-list-name');
                    expect(text_).toContain(nameTag);
                });
            });
        });
    });


    describe('I create a tags with color mocks', () => {
        tagsInfo.forEach(postInfo => {
            let nameTag = postInfo.split(",")[0];
            let color = postInfo.split(",")[1].replace("#","");
            describe(`When I create a tags with name ${nameTag} and color ${color}`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    let text = await page.textContent('.gh-user-email');
                    await page.goto(tagsUrl);
                    await page.screenshot({path: `${config.imagePath}/tags-page.png`});
                    text = await page.textContent('#tag-name');
                    await tagsPage.createWithColor(nameTag,color);
                    await page.goto(tagsUrlBase);
                    text = await page.click('text=\'Public tags\'');
                    await page.screenshot({path:`${config.imagePath}/tags-page-create.png`});
                });
        
                it('Then The tags "'+nameTag+'" should be created', async () => {
                    const text_ = await page.textContent('.gh-tag-list-name');
                    expect(text_).toContain(nameTag);
                });
            });
        });
    });

    describe('I create a internal tags with color  mocks', () => {
        tagsInfo.forEach(postInfo => {
            let nameTag = "#"+postInfo.split(",")[0]
            let color = postInfo.split(",")[1].replace("#","");
            describe(`When I create a internal tags with name ${nameTag} and color ${color}`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    let text = await page.textContent('.gh-user-email');
                    await page.goto(tagsUrl);
                    await page.screenshot({path: `${config.imagePath}/tags-page.png`});
                    text = await page.textContent('#tag-name');
                    await tagsPage.createWithColor(nameTag,color);
                    await page.goto(tagsUrlBase);
                    text = await page.click('text=\'Internal tags\'');
                    await page.screenshot({path:`${config.imagePath}/tags-page-create.png`});
                });
        
                it('Then The tags "Tags Test" should be created', async () => {
                    const text_ = await page.textContent('.gh-tag-list-name');
                    expect(text_).toContain(nameTag);
                });
            });
        });
    });
    



    describe('I create a tags with title "Tags Test" and body "Cuerpo texto"', () => {
        let nameTag = 'Tags Test';
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            let text = await page.textContent('.gh-user-email');
            await page.goto(tagsUrl);
            await page.screenshot({path: `${config.imagePath}/tags-page.png`});
            text = await page.textContent('#tag-name');
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click('text=\'Public tags\'');
            await page.screenshot({path:`${config.imagePath}/tags-page-create.png`});
        });

        it('Then The tags "Tags Test" should be created', async () => {
            const text_ = await page.textContent('.gh-tag-list-name');
            expect(text_).toContain(nameTag);
        });
    });

    describe('I delete  tag a "Tags Test"', () => {
        let nameTag = 'Tags Test';
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            let text = await page.textContent('.gh-user-email');
            await page.goto(tagsUrl);
            text = await page.textContent('#tag-name');
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click('text=\'Public tags\'');
            text = await page.click('.gh-tag-list-name:has-text(\''+nameTag+'\')');
            await tagsPage.delete(nameTag);
            await page.screenshot({path: `${config.imagePath}/tags-detail-delete.png`});
            await page.goto(tagsUrlBase);
            await page.screenshot({path: `${config.imagePath}/tags-page-delete.png`});       
        });

        it('The tag "Tags Test" should not be found', async () => {
            await page.goto(tagsUrlBase);
            const text = await page.textContent('.gh-tags-placeholder');
            expect(text).not.toContain(nameTag);
        });
    });


    describe('I create a internal tags with title "Tags Test" and body "Cuerpo texto"', () => {
        let nameTag = '#Tags Test';
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            let text = await page.textContent('.gh-user-email');
            await page.goto(tagsUrl);
            await page.screenshot({path: `${config.imagePath}/internal-tags-page.png`});
            text = await page.textContent('#tag-name');
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click('text=\'Internal tags\'');
            await page.screenshot({path:`${config.imagePath}/internal-tags-page-create.png`});
        });

        it('Then The tags "Internal Tags Test" should be created', async () => {
            const text_ = await page.textContent('.gh-tag-list-name');
            expect(text_).toContain(nameTag);
        });
    });

    describe('I delete an internal tag a "Tags Test"', () => {
        let nameTag = '#Tags Test';
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            let text = await page.textContent('.gh-user-email');
            await page.goto(tagsUrl);
            text = await page.textContent('#tag-name');
            await tagsPage.create(nameTag);
            await page.goto(tagsUrlBase);
            text = await page.click('text=\'Internal tags\'');
            text = await page.click('.gh-tag-list-name:has-text(\''+nameTag+'\')');
            await tagsPage.delete(nameTag);
            await page.screenshot({path: `${config.imagePath}/internal-tags-detail-delete.png`});
            await page.goto(tagsUrlBase);
            await page.screenshot({path: `${config.imagePath}/internal-tags-page-delete.png`});       
        });

        it('The tag "Internal Tags Test" should not be found', async () => {
            await page.goto(tagsUrlBase);
            const text = await page.textContent('.gh-tags-placeholder');
            expect(text).not.toContain(nameTag);
        });
    });

    

    afterEach(async () => {
        console.log('Browser Context Closed!')
        await context.close();
    });
});



