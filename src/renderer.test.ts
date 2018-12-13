import Tab, { ChromeTab } from './tab';
import TabCollection from './tab_collection'
import Renderer from './renderer';
import * as jQuery from 'jquery';
import { JSDOM } from 'jsdom';

describe(Renderer, () => {
    var DOM = new JSDOM(`<body></body>`);
    var $ = null;

    beforeEach(() => {
        $ = jQuery(DOM.window);
    })
    
    test('render an empty collection', () => {
      new Renderer($('body')).render(createTabCollection());
      expect($('.container').length).toBeGreaterThan(0);
    });
    
    test('it renders the title of the tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createChromeTab()
        ]));
        expect($('.title').text()).toEqual('Google');
    });

    test('it renders the favicon of the tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createChromeTab()
        ]));
        expect($('.favicon').attr('src')).toEqual('https://google.com/fav.ico');
    });

    // -- Helper functions --

    function createTabCollection(tabs: ChromeTab[] = []) {    
        return new TabCollection(tabs, {chrome: {tabs: {}}})
    }
    
    function createChromeTab(): ChromeTab {
        return {
            title: 'Google',
            favIconUrl: 'https://google.com/fav.ico',
            url: 'google.com',
            pinned: false
        };
    }
});