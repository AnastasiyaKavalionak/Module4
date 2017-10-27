'use strict';

require('chromedriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const By = webdriver.By;
const until = webdriver.until;

const menuTabs = ['Home', 'Blog', 'Events', 'The Author', 'The Society', 'Membership', 'Contact Us', 'Press'];
const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

driver.manage().window().maximize();
driver.get('https://www.tolkiensociety.org/');
driver.wait(until.elementLocated(By.css('div#cssmenu'), 10000, 'time for downloading is over'));
let menu = driver.findElements(By.css('ul#menu-main-menu > li > a'));
menu.then(menuLinks => {
    let check = menuLinks.filter(function (link) {
        return menuTabs.some(function (menuTab) {
            return link.getAttribute('innerHTML').then(result => {
                return result === menuTab;
            });
        });
    });
    if (check.length === menuTabs.length) {
        console.log('menu of full size is right');
        return true;
    } else {
        console.log(`menu of full size have mistakes`);
        return false;
    }
}).then(resultOfChecking => {
    if (resultOfChecking) {
        console.log('start clicking');
        menuTabs.map(function (tab) {
            menu.then(menuLinks => {
                menuLinks.map(function (link) {
                    link.getAttribute('innerHTML').then(result => {
                        if (result === tab) {
                            driver.actions().click(link);
                            driver.wait(until.elementLocated(By.css('title')), 10000, 'time for downloading is over');
                            if (!driver.findElement(By.css('title')).then(title => title.getAttribute('innerHTML')).then(title => title.indexOf(tab) != -1)) {
                                console.log(`wrong link of ${tab}`);
                            } else {
                                console.log('pos ' + tab);
                            }
                        }
                    });
                });
            });
        });
    }
}).catch(err => {
    console.log(err);
    return false;
});

driver.quit();