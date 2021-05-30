const config = require('config');
const mysql = require('mysql');

class MysqlHelper {
    
    constructor() {
    }
    
    static cleanIpCounter() {
        const connection = mysql.createConnection(config.mysql);
        connection.connect();
        
        connection.query(`UPDATE ${config.mysql.database}.brute set count=0`, function (error, results, fields) {
            if (error) throw error;
        });
        connection.end();
    }
}

module.exports = { MysqlHelper };