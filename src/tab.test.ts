import Tab from './tab';

describe(Tab, () => {
    var chrome = {
        tabs: {
            update: null,
            remove: null,
        }
    }

    beforeEach(() => {
        chrome.tabs.update = jest.fn();
        chrome.tabs.remove = jest.fn();
    })

    test('can be instantiated from a Chrome Tab', () => {
        expect(createTab()).toBeInstanceOf(Tab);
    });

    // test('it can pin a tab', () => {
    //     let tab = createTab();

    //     tab.pin();

    //     expect(chrome.tabs.update).toBeCalledTimes(1);
    //     expect(chrome.tabs.update).toBeCalledWith(expect.any(Number), expect.objectContaining({ pinned: true }));
    // });

    // test('it can close a tab', () => {
    //     let tab = createTab();

    //     tab.close();

    //     expect(chrome.tabs.remove).toBeCalledTimes(1);
    // });

    // test('it can unpin a tab', () => {
    //     let tab = createTab();

    //     tab.pin();
    //     tab.pin();

    //     expect(chrome.tabs.update).toBeCalledTimes(2);
    //     expect(chrome.tabs.update).toBeCalledWith(expect.any(Number), expect.objectContaining({ pinned: false }));
    // });

    it('supports searching by exact title', () => {
        let tab = createTab("Hello World");
        expect(tab.query("Hello World")).toBeTruthy();
      });
    
      it('supports searching by partial title', () => {
        let tab = createTab("Hello World");
        expect(tab.query("Hell")).toBeTruthy();
      });
    
      it('search is case insensitive', () => {
        let tab = createTab("Hello World");
        expect(tab.query("hell")).toBeTruthy();
      })

    // -- Helper functions --

    function createTab(title = 'Google') {
        return new Tab(createChromeTab(title), { chrome });
    }

    function createChromeTab(title = 'Google') {
        return {
            id: 1,
            title: title,
            favIconUrl: 'https://google.com/fav.ico',
            url: 'google.com',
            pinned: false
        };
    }
})