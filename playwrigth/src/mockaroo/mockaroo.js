const sycnRequest = require('sync-request');
class Mockaroo {
    constructor() { }

    static getData(url) {
        const reponse = sycnRequest('GET', `${url}`)
        let rta = reponse.getBody('utf8').split("\n");
        rta.shift()
        rta.pop()
        return rta;
    }
}

module.exports = { Mockaroo };