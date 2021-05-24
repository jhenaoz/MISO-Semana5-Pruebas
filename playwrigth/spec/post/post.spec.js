const playwright = require('playwright');
const GhostAdminAPI = require('@tryghost/admin-api');

const { Login } = require('../../src/login.page')
const { Post } = require('../../src/post.page')
const { Mockaroo } = require('../../src/mockaroo/mockaroo')
const { MysqlHelper } = require('../../src/mysql/mysql')
const faker = require('faker');
const config = require('config');
const url = `${config.url}/#/signin`;
const urlPost = `${config.url}/#/posts`;
const urlEPost = `${config.url}/#/editor/post/`;

const posts = [
    {title: 'title1', content: 'content1'},
    {title: 'title2', content: 'content2'},
    {title: 'title3', content: 'content3'},
    {title: 'title4', content: 'content4'},
];

describe('Given I open ghost page', () => {
    let browser;
    let context;
    let page;
    let loginPage;
    let postPage;
    let postTitles = Mockaroo.getData('https://my.api.mockaroo.com/test_schema.json?key=e4c63dd0');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        page = await context.newPage();
        loginPage = new Login(page);
        postPage = new Post(page);
        mockaroo = new Mockaroo();

        await page.goto(url);
    });

    describe('test mock', () => {
        // console.log(postTitles);
        postTitles.forEach(postInfo => {
            let title = postInfo.split(",")[0]
            let body = postInfo.split(",")[1]
            describe(`When I create a post with title ${title} and body ${body}`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    await page.goto(urlEPost);
                    await postPage.post(title, body);
                    await page.screenshot({ path: `${config.imagePath}/post-page-create.png` });
                });

                it(`Then The post ${title} should be created`, async () => {
                    await page.goto(urlPost);
                    const text = await page.textContent('.gh-post-list-title');
                    expect(text).toContain(title);
                });
            });
        });
    });

    describe('When I change title with old text info from faker', () => {
        for (let i = 0; i<3;i++) {
            let name = faker.name.title();
            let body = faker.name.title();
            let name2 = faker.name.title();
            let body2 = faker.name.title();
            describe('When I change title with old text "'+name+'" for new text "'+name2+'" ', () => {
        
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    await page.goto(urlEPost);
                    await postPage.post(name, body);
        
                    await page.goto(urlPost);
                    await postPage.search(name);
                    await postPage.post(name2, body2);
                    await page.screenshot({ path: `${config.imagePath}/post-page-update.png` });
                });
        
                it('Then the post "Post Test" should be updated', async () => {
                    await page.goto(urlPost);
                    const text = await page.textContent('.gh-post-list-title');
                    expect(text).toContain(name2);
                });
            });
        }
    });

    describe('Faker Describe', () => {
        posts.forEach(post => {
            describe(`When I change title with old text "${post.title}" for new text "Post Test 2"`, () => {
                beforeEach(async () => {
                    await loginPage.login(config.adminUser.email, config.adminUser.password);
                    await page.goto(urlEPost);
                    await postPage.post(post.title, post.content);
                    await page.click('a:text("Posts")');
                    await postPage.search(post.title);
                    await postPage.post('Post Test 2', 'Cuerpo texto 2');
                    await page.screenshot({ path: `${config.imagePath}/post-page-update.png` });
                });
        
                it(`Then the post "${post.title}" should be updated`, async () => {
                    await page.goto(urlPost);
                    const text = await page.textContent('.gh-post-list-title');
                    expect(text).toContain('Post Test 2');
                });
            });
        })
    });


    describe('When I published a specific post with title "Post Test 3"', () => {
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            await page.goto(urlEPost);
            await postPage.post('Post Test 3', 'Cuerpo texto 3');

            await page.goto(urlPost);
            await postPage.publish('Post Test 3');
            await page.screenshot({ path: `${config.imagePath}/post-page-publish.png` });
        });

        it('Then the post "Post Test 3" should be "Published"', async () => {
            await page.goto(urlPost);
            const text = await page.textContent('.gh-post-list-status');
            expect(text).toContain('Published');
        });
    });

    describe('When I delete a "Post Test 4"', () => {
        beforeEach(async () => {
            await loginPage.login(config.adminUser.email, config.adminUser.password);
            await page.goto(urlEPost);
            await postPage.post('Post Test 4', 'Se va a borrar');

            await page.goto(urlPost);
            await postPage.remove('Post Test 4');
            await page.screenshot({ path: `${config.imagePath}/post-page-delete.png` });
        });

        it('Then the post "Post Test 4" should not be found', async () => {
            await page.goto(urlPost);
            const text = await page.textContent('h3');
            expect(text).toContain('You haven\'t written any posts yet!');
        });
    });

    afterEach(async () => {
        await context.close();
        const api = new GhostAdminAPI({
            url: `${config.urlApi}`,
            key: `${config.key}`,
            version: `${config.version}`
        });

        api.posts.browse({ limit: 10 })
            .then((posts) => {
                posts.forEach((post) => {
                    console.log('POST', post.id);
                    api.posts.delete({ id: post.id })
                })
            })
            .catch(error => console.error(error))
        MysqlHelper.cleanIpCounter();
    });
});