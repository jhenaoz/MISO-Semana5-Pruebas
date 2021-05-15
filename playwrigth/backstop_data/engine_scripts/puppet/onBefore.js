const config = require('config');

module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);
  //login
  await page.waitForSelector('#ember8');
  await page.type('#ember8', config.adminUser.email);
  await page.type('#ember10', config.adminUser.password);
  await page.click('#ember12');
};
