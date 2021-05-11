class Page {
    constructor(page) {
        this.page = page;
      }

    async createPage(title, body) {
        await this.page.click('text=New page');
        await this.page.fill('textarea', title);
        await this.page.fill('.koenig-editor__editor', body);
        await this.page.click('a:has-text("Pages")');
        return true;
    }
}

module.exports = { Page };
