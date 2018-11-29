import Tab, {ChromeTab} from './tab';
//import Renderer from './renderer'

export default class TabCollection {
    readonly tabs: Tab[];
    readonly options;

    constructor(tabs: ChromeTab[], options = { chrome: { tabs: null } }) {
        this.options = options;
        this.tabs = [];
        tabs.forEach((tab) => {
            this.tabs.push(new Tab(tab, options));
        });
    }

    static async intializeWithChromeAPI(chrome): Promise<TabCollection> {
        return new Promise<TabCollection>(resolve => {
            let tabCollection = new TabCollection([]);
            chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs: ChromeTab[]) => {
                for (let tab of tabs) tabCollection.append(tab);
                resolve(tabCollection);
            });
        })
    }

    length() {
        return this.tabs.length;
    };

    append(tab: ChromeTab) {
        this.tabs.push(new Tab(tab, this.options))
    }

    forEach(iterator: (tab: Tab) => void) {
        this.tabs.forEach(iterator);
    }

    search(query) {
        let tabCollection = new TabCollection ([], this.options);
        for (let tab of this.tabs) {
            if (tab.title.indexOf(query) !== -1) {
                tabCollection.tabs.push(tab);
            } 
        }
        return tabCollection;
    }
}