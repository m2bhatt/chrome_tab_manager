export default class Tab {
    chromeTab: any;

    constructor(chromeTab) {
        this.chromeTab = chromeTab;
    }

    render($) {
        var $wrapper = $("<div class='container'></div>");
        var $li = $("<li class='subcontainer'></li>").appendTo($wrapper);
        var $image = $(`<img class="favicon" src="${this.chromeTab.favIconUrl}">`).appendTo($li); 
        var $title = $(`<text class="title">${this.chromeTab.title}</text>`).appendTo($li);
        var $url = $(`<li class="link">${this.chromeTab.url}</li>`).appendTo($wrapper);

        return $wrapper;
    }
}