import Tab, { ChromeTab } from './tab';
import TabCollection from './tab_collection'
import Renderer from './renderer';
import * as jQuery from 'jquery';
import { JSDOM } from 'jsdom';

function createTabCollection(tabs: ChromeTab[] = []) {    
    return new TabCollection(tabs)
}

function createTab(chromeTabsApiMock = {}) {
    return new Tab(createChromeTab(), {chrome: {tabs: chromeTabsApiMock}})
}

function createChromeTab(): ChromeTab {
    return {
        title: 'Google',
        favIconUrl: 'https://google.com/fav.ico',
        url: 'google.com',
        pinned: false
    };
}

var DOM = new JSDOM(`<body></body>`);
var $ = null;

beforeEach(() => {
    $ = jQuery(DOM.window);
})

test('render an empty collection', () => {
  new Renderer(createTabCollection()).render($('body'));
  expect($('.container').length).toBeGreaterThan(0);
});

test('it renders the title of the tab', () => {
    let tab = createTab();
    new Renderer(createTabCollection([tab])).render($('body'));
    expect($('li text').text()).toBe('Google');
//    expect($("#subcontainer")[1]).toBe('Google');
});
