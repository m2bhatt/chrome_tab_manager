import Tab from './tab';
import * as jQuery from 'jquery';
import { JSDOM } from 'jsdom';

function createTab() {
    return new Tab(createChromeTab(), {chrome: {tabs: {}}})
}

function createChromeTab() {
    return {
        title: 'Google',
        favIconUrl: 'https://google.com/fav.ico',
        url: 'google.com'
    };
}

var DOM = new JSDOM(`<!DOCTYPE html>`);
var $ = null;

beforeEach(() => {
    $ = jQuery(DOM.window);
})

test('can be instantiated from a Chrome Tab', () => {
  expect(createTab()).toBeInstanceOf(Tab);
});

test('it renders a wrapper', () => {
    let tab = createTab();
    expect(tab.render($)[0].tagName).toBe('DIV');
});

test('it renders the title of the tab', () => {
    let tab = createTab();
    expect($('li text', tab.render($)).text()).toBe('Google');
});

test('it renders the fav icon of the tab', () => {
    let tab = createTab();
    expect($('li img', tab.render($))[0]["src"]).toBe('https://google.com/fav.ico');
});

test('it renders the url', () => {
    let tab = createTab();
    // $('li', tab.render($))[1] returns `undefined`?
    expect($('li', tab.render($)).eq(1).text()).toBe('google.com');
});