class Post {
    constructor(page) {
        this.page = page;
    }

    async post(postTitle, postBody) {
        await this.page.fill('.gh-editor-title', postTitle);
        await this.page.fill('.koenig-editor__editor', postBody);
        return true;
    }

    async search(postTitle) {
        await this.page.click(`text=${postTitle}`);
        return true;
    }

    async publish(postTitle) {
        await this.page.click(`text=${postTitle}`);
        await this.page.click('.view-actions');
        await this.page.click('.gh-publishmenu-button > span');
        await this.page.waitForTimeout(3000);
        return true;
    }

    async remove(postTitle) {
        await this.page.click(`text=${postTitle}`);
        await this.page.click('.post-settings');
        await this.page.click('.settings-menu-delete-button > span');
        await this.page.click('.gh-btn-red > span');
        return true;
    }
}

module.exports = { Post };