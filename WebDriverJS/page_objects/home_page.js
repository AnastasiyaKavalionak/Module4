'use strict';

class Home {

    constructor () {
        this.url = 'https://www.tolkiensociety.org/';
        this.openPage = function () {
            return browser.get(this.url);
        }
        this.menuContainer = element(by.id('cssmenu'));
    }
}

module.exports = Home;
