class Staff {
    constructor(page) {
        this.page = page;
    }

    async send(user) {
        await this.page.click(".gh-btn-green > span");
        await this.page.fill('#new-user-email', user);
        await this.page.selectOption('select#new-user-role', { Option: 'Administrator' });
        await this.page.click('text=Send invitation now');
        await this.page.waitForTimeout(4000);
        return true;
    }
    async revoke() {
        await this.page.click('.red-hover');
        await this.page.waitForTimeout(3000);
        return true;
    }
    async changePassword(oldPassword, newPassword) {
        await this.page.fill('#user-password-old', oldPassword);
        await this.page.fill('#user-password-new', newPassword);
        await this.page.fill('#user-new-password-verification', newPassword);
        await this.page.click(".gh-btn-red > span");
        await this.page.waitForTimeout(3000);
        return true;
    }
    async changeBio(bio) {
        //await this.page.fill('#user-bio', '');
        await this.page.fill('#user-bio', bio);
        await this.page.click(".gh-btn-blue > span");
        await this.page.waitForTimeout(3000);
        return true;
    }
}


module.exports = { Staff };
