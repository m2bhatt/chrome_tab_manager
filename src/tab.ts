export default class Tab {
    chromeTab: any;
    tabs: any;

    constructor(chromeTab, options = { chrome: { tabs: null } }) {
        this.chromeTab = chromeTab;
        this.tabs = options.chrome.tabs;
        
        if (!this.tabs) {
            this.tabs = chrome.tabs;
        }
    }

    render($) {
        var $wrapper = $("<div class='container'></div>");
        var $li = $("<li class='subcontainer'></li>").appendTo($wrapper);
        var $image = $(`<img class="favicon" src="${this.chromeTab.favIconUrl}">`).appendTo($li); 
        var $title = $(`<text class="title">${this.chromeTab.title}</text>`).appendTo($li);
        var $delTab = $('<input class="delTab" type="button" value="x"></input>').appendTo($li);
        $delTab.click(this.close.bind(this, $wrapper));
        var $pinTab = $('<input class="pinTab" type="button" value="p"></input>').appendTo($li);
        $pinTab.click(this.pin.bind(this));
        var $url = $(`<li class="link">${this.chromeTab.url}</li>`).appendTo($wrapper);

        return $wrapper;
    }

    close(element) {
        this.tabs.remove(this.chromeTab.id, () => element.remove());
    }

    pin() {
        this.tabs.update(this.chromeTab.id, {pinned: true})  
    }
}