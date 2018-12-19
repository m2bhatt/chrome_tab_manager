import Tab from './tab';
import TabCollection from './tab_collection'
import Renderer from './renderer';
import * as jQuery from 'jquery';
import { JSDOM } from 'jsdom';

describe(Renderer, () => {
    var DOM = new JSDOM(`<body></body>`);
    var $ = null;
    var chrome = {
        tabs: {
          update: null,
          remove: null,
        }
    }

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

    test('it renders a button for pinning a tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createChromeTab()
        ]));
        expect($('.container .pinTab').length).toBeGreaterThan(0);
    });

    test('it renders a button for closing a tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createChromeTab()
        ]));
        expect($('.container .delTab').length).toBeGreaterThan(0);
    });

    // -- Helper functions --

    function createTabCollection(tabs: Tab[] = []) {    
        return new TabCollection(tabs)
    }
    
    function createChromeTab(): Tab {
        return new Tab({
            title: 'Google',
            favIconUrl: 'https://google.com/fav.ico',
            url: 'google.com',
            pinned: false
        }, { chrome });
    }
});