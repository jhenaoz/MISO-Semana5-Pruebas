class Page {
    constructor(page) {
        this.page = page;
      }

    async publishPage(pageTitle) {
        await this.page.click(`h3.gh-content-entry-title:has-text("${pageTitle}")`);
        await this.page.click('text=Publish');
        await this.page.click('.gh-publishmenu-button');
    }

    async createPage(title, body) {
        await this.page.click('text=New page');
        await this.page.fill('textarea', title);
        await this.page.fill('.koenig-editor__editor', body);
        await this.page.click('a:has-text("Pages")');
    }
}

module.exports = { Page };
