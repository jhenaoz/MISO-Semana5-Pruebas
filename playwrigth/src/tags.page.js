const config = require('config');
class Tags {
    constructor(page) {
        this.page = page;
      }

    async create(tagName) {
        await this.page.fill(config.tags.playwrigth.create.tagName, tagName);
        await this.page.click(config.tags.playwrigth.create.textSave);
        return true;
    }

    async delete(tagName) {
        /*
  await this.page.click(config.tags.playwrigth.delete.button);
        await this.page.click(config.tags.playwrigth.delete.modal);
        return true;
        */
        await this.page.click('button:has-text(\'Delete tag\')');
        await this.page.click('.modal-footer > button:has-text(\'Delete\')');
        return true;
    }
}

module.exports = { Tags };
