class Tags {
    constructor(page) {
        this.page = page;
      }

    async create(tagName) {
        await this.page.fill('#tag-name', tagName);
        await this.page.click('text=Save');
        //await page.$eval(".gh-btn", el => el.classList.contains(""))
        return true;
    }

    async delete(tagName) {
        await this.page.click('.gh-tag-list-name:has('+tagName+')');
        await this.page.click('button:has(Delete tag)');
        await this.page.click('.modal-footer > button:has(Delete)');
        return true;
    }
}

module.exports = { Tags };
