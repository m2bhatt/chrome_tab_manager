import Tab from './tab';
import TabCollection from './tab_collection'
import Renderer from './renderer';
import * as jQuery from 'jquery';
import { JSDOM } from 'jsdom';

describe(Renderer, () => {
    var $ = null;
    var chrome = {
        tabs: {
          update: null,
          remove: null,
        }
    };

    beforeEach(() => {
        $ = jQuery(new JSDOM(`<body></body>`).window);
    })
    
    test('render an empty collection', () => {
      new Renderer($('body')).render(createTabCollection());
      expect($('.container').length).toBeGreaterThan(0);
    });
    
    test('it renders the title of the tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createTab(chrome)
        ]));
        expect($('.title').text()).toEqual('Google');
    });
    
    test('it renders the favicon of the tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createTab(chrome)
        ]));
        expect($('.favicon').attr('src')).toEqual('https://google.com/fav.ico');
    });

    test('it renders a button for pinning a tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createTab(chrome)
        ]));
        expect($('.container .pinTab').length).toBeGreaterThan(0);
    });

    test('it renders a button for closing a tab', () => {
        new Renderer($('body')).render(createTabCollection([
            createTab(chrome)
        ]));
        expect($('.container .delTab').length).toBeGreaterThan(0);
    });

    test('it removes the tab from the tab collection when the tab is closed', () => {
        let remove = jest.fn((_, callback) => {
            if(callback) callback();
        });

        new Renderer($('body')).render(createTabCollection([
            createTab({ tabs: {
                remove: remove,
                update: null
            }})
        ]));
        $('.container .delTab').click();

        expect($('.container .subcontainer').length).toEqual(0);
    });

    // -- Helper functions --

    function createTabCollection(tabs: Tab[] = []) {    
        return new TabCollection(tabs)
    }
    
    function createTab(chrome: { tabs: { update: any, remove: any } }): Tab {
        return new Tab({
            title: 'Google',
            favIconUrl: 'https://google.com/fav.ico',
            url: 'google.com',
            pinned: false
        }, { chrome });
    }
});