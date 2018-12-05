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

    test('it can pin a tab', () => {
        let tab = createTab();

        tab.pin();

        expect(chrome.tabs.update).toBeCalledTimes(1);
        expect(chrome.tabs.update).toBeCalledWith(expect.any(Number), expect.objectContaining({ pinned: true }));
    });

    test('it can close a tab', () => {
        let tab = createTab();

        tab.close();

        expect(chrome.tabs.remove).toBeCalledTimes(1);
    });

    test('it can unpin a tab', () => {
        let tab = createTab();

        tab.pin();
        tab.pin();

        expect(chrome.tabs.update).toBeCalledTimes(2);
        expect(chrome.tabs.update).toBeCalledWith(expect.any(Number), expect.objectContaining({ pinned: false }));
    });

    // -- Helper functions --

    function createTab() {
        return new Tab(createChromeTab(), { chrome });
    }

    function createChromeTab() {
        return {
            id: 1,
            title: 'Google',
            favIconUrl: 'https://google.com/fav.ico',
            url: 'google.com',
            pinned: false
        };
    }
})