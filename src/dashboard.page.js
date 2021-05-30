class Dashboard {
    constructor(page) {
        this.page = page;
      }

    async navigateToTags() {
        await this.page.click('.gh-nav-manage>li:nth-child(4)');
        await this.page.textContent('h2:has-text("Tags")');
    }

    async navigateToPages() {
        await this.page.click('.gh-nav-manage>li:nth-child(3)');
        await this.page.textContent('h2:has-text("Pages")');
    }

    async navigateToPosts() {
        await this.page.click('.gh-nav-manage>li:nth-child(2)');
        await this.page.textContent('h2:has-text("Posts")');
    }
}

module.exports = { Dashboard };
