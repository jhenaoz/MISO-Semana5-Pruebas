class Login {
    constructor(page) {
        this.page = page;
      }

    async login(username, password) {
        await this.page.fill('#ember8', username);
        await this.page.fill('#ember10', password);
        await this.page.click('#ember12');
        return true;
    }
}

module.exports = { Login };
