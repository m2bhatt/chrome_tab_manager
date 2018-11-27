import Renderer from "./renderer"
import Tab from './tab';
import * as jQuery from 'jquery';
import { JSDOM } from 'jsdom';
import TabCollection from "./tab_collection";

function createTab(tabs = {}) {
    return new Tab(createChromeTab(), {chrome: {tabs: tabs}})
}

function createChromeTab() {
    return {
        title: 'Google',
        favIconUrl: 'https://google.com/fav.ico',
        url: 'google.com',
        pinned: false
    };
}

var DOM = new JSDOM(`<!DOCTYPE html>`);
var $ = null;

beforeEach(() => {
    $ = jQuery(DOM.window);
})

test('it renders a wrapper', () => {
    let tab = createTab();
    let tabCollection = new TabCollection([tab]);
    let renderer = new Renderer(tabCollection);
    expect(renderer.render($)[0].tagName).toBe('DIV');
});

// test('it renders an li element', () => {
//     let tab = createTab();
//  //   expect(tab.render($)[1].tagName).toBe('LI');
// })

// test('it renders the title of the tab', () => {
//     let tab = createTab();
//     expect($('li text', tab.render($)).text()).toBe('Google');
// });

// test('it renders the fav icon of the tab', () => {
//     let tab = createTab();
//     expect($('li img', tab.render($))[0]["src"]).toBe('https://google.com/fav.ico');
// });

// test('it renders the url', () => {
//     let tab = createTab();
//     expect($('li', tab.render($)).eq(1).text()).toBe('google.com');
// });

// test('it renders the pin button', () => {
//     let tab = createTab();
//     expect($('#container > ul > li').eq(2).hasClass("pinTab")).toEqual(true);
// });

// test('it renders the close button', () => {
//     let tab = createTab();
//     expect($('#container > ul > li').eq(3).hasClass("delTab")).toEqual(true);
// });

