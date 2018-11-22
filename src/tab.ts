interface ChromeTab {
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

    render($) {
        var $wrapper = $("<div class='container'></div>");
        var $li = $("<li class='subcontainer'></li>").appendTo($wrapper);
        var $image = $(`<img class="favicon" src="${this.favIconUrl}">`).appendTo($li); 
        var $title = $(`<text class="title">${this.title}</text>`).appendTo($li);
        var $delTab = $('<input class="delTab" type="button" value="x"></input>').appendTo($li);
        $delTab.click(this.close.bind(this, $wrapper));
        var $pinTab = $('<input class="pinTab" type="button" value="p"></input>').appendTo($li);
        $pinTab.click(this.pin.bind(this));
        var $url = $(`<li class="link">${this.url}</li>`).appendTo($wrapper);

        return $wrapper;
    }

    close(element) {
        this.tabs.remove(this.id, () => element.remove());
    }

    pin() {
        this.tabs.update(this.id, {pinned: !this.pinned});
        this.pinned = !this.pinned;
    }
}