export interface ChromeTab {
    id?: number;
    index?: number;
    pinned: boolean;
    url?: string;
    favIconUrl?: string;
    title?: string;
}

export default class Tab {
    id: number;
    index: number;
    pinned: boolean;
    title: string;
    url: string;
    favIconUrl: string;
    tabs: any;

    constructor(chromeTab: ChromeTab, options = { chrome: { tabs: null } }) {
        this.id = chromeTab.id;
        this.index = chromeTab.index;
        this.pinned = chromeTab.pinned;
        this.title = chromeTab.title;
        this.url = chromeTab.url;
        this.favIconUrl = chromeTab.favIconUrl;
        this.tabs = options.chrome.tabs;
        
        if (!this.tabs) {
            this.tabs = chrome.tabs;
        }
    }

    close(e: Event, callback = undefined) {
        e.stopPropagation();
        this.tabs.remove(this.id, callback);
    }

    pin(e: Event) {
        e.stopPropagation();
        this.tabs.update(this.id, {pinned: !this.pinned});
        this.pinned = !this.pinned;
    }

    highlight(callback = undefined) {
        this.tabs.highlight({tabs: this.index}, callback);
    }

    query(query) {
        return this.title.toUpperCase().indexOf(query.toUpperCase()) !== -1
    }
}