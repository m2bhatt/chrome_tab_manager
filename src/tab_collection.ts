import Tab from './tab';
//import Renderer from './renderer'

export default class TabCollection {
    readonly tabs: Tab[];

    constructor(tabs: Tab[] = []) {
        this.tabs = [];
        tabs.forEach((tab) => {
            this.tabs.push(tab);
        });
    }

    static async intializeWithChromeAPI(chrome): Promise<TabCollection> {
        return new Promise<TabCollection>(resolve => {
            let tabCollection = new TabCollection([]);
            chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
                for (let tab of tabs) tabCollection.append(new Tab(tab, { chrome }));
                resolve(tabCollection);
            });
        })
    }

    length() {
        return this.tabs.length;
    };

    append(tab: Tab) {
        this.tabs.push(tab)
    }

    forEach(iterator: (tab: Tab) => void) {
        this.tabs.forEach(iterator);
    }

    search(query) {
        let tabCollection = new TabCollection ([]);
        for (let tab of this.tabs) {
            if (tab.title.toUpperCase().indexOf(query.toUpperCase()) !== -1) { // toUppcase() for case insensitive
                tabCollection.tabs.push(tab);
            }
        }
        return tabCollection;
    }
}   