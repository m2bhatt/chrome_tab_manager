export interface ChromeTab {
    id?: number;
    pinned: boolean;
    url?: string;
    favIconUrl?: string;
    title?: string;
}

export default class Tab {
    id: number;
    pinned: boolean;
    title: string;
    url: string;
    favIconUrl: string;
    tabs: any;

    constructor(chromeTab: ChromeTab, options = { chrome: { tabs: null } }) {
        this.id = chromeTab.id;
        this.pinned = chromeTab.pinned;
        this.title = chromeTab.title;
        this.url = chromeTab.url;
        this.favIconUrl = chromeTab.favIconUrl;
        this.tabs = options.chrome.tabs;
        
        if (!this.tabs) {
            this.tabs = chrome.tabs;
        }
    }

    close(callback = undefined) {
        this.tabs.remove(this.id, callback);
    }

    pin() {
        this.tabs.update(this.id, {pinned: !this.pinned});
        this.pinned = !this.pinned;
    }
}