class Page {
    constructor(page) {
        this.page = page;
      }

    async updatePage(oldPageTitle, title, body) {
        await this.page.click(`h3.gh-content-entry-title:has-text("${oldPageTitle}")`);
        await this.page.fill('textarea', title);
        await this.page.fill('.koenig-editor__editor', body);
        await this.page.click('a:has-text("Pages")');
    }

    async deletePage(pageTitle) {
        await this.page.click(`h3.gh-content-entry-title:has-text("${pageTitle}")`);
        await this.page.click('.post-settings');
        await this.page.click('.settings-menu-delete-button');
        await this.page.click('.gh-btn-red');
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
