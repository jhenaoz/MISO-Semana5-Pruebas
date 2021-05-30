class Tags {
    constructor(page) {
        this.page = page;
      }

    async create(tagName) {
        await this.page.fill('#tag-name', tagName);
        await this.page.click('text=Save');
        return true;
    }
    async createWithColor(tagName,color)
    {
        await this.page.fill('#tag-name', tagName);
        await this.page.fill('input[name="accent-color"]', color);
        await this.page.click('text=Save');
        return true; 
    }

    async delete(tagName) {
        await this.page.click('button:has-text(\'Delete tag\')');
        await this.page.click('.modal-footer > button:has-text(\'Delete\')');
        return true;
    }
}

module.exports = { Tags };