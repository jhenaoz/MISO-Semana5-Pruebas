class Mockaroo {
    constructor(page) {
        this.page = page;
      }

    async Mockaroo(username, password) {
        await this.page.fill('#ember8', username);
        await this.page.fill('#ember10', password);
        await this.page.click('#ember12');
        return true;
    }
}

module.exports = { Mockaroo };