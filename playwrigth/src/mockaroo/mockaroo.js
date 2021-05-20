const sycnRequest = require('sync-request');
class Mockaroo {
    constructor() {

    }

    static getDataPost() {
        const reponse = sycnRequest('GET', 'https://my.api.mockaroo.com/test_schema.json?key=e4c63dd0')
        let rta = reponse.getBody('utf8').split("\n");
        rta.shift()
        rta.pop()
        return rta;
    }

    static getDataTag() {
        const reponse = sycnRequest('GET', 'https://my.api.mockaroo.com/tags.json?key=afe00610')
        let rta = reponse.getBody('utf8').split("\n");
        rta.shift()
        rta.pop()
        return rta;

    }
}

module.exports = { Mockaroo };