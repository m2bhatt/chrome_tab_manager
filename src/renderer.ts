//import Tab, {ChromeTab} from './tab';
import TabCollection from './tab_collection';

export default class Renderer {
    tabCollection: TabCollection;

    constructor(tabCollection: TabCollection) {
        this.tabCollection = tabCollection;     
    }

    render($) {
        this.tabCollection.tabs.forEach((tab) => {
            //var $tabInfo = tab.render($);
            var $wrapper = $("<div class='container'></div>");
            var $li = $("<li class='subcontainer'></li>").appendTo($wrapper);
            var $image = $(`<img class="favicon" src="${tab.favIconUrl}">`).appendTo($li);
            var $title = $(`<text class="title">${tab.title}</text>`).appendTo($li);
            var $pinTab = $('<input class="pinTab" type="button" value="p"></input>').appendTo($li);
            $pinTab.click(tab.pin.bind(this));
            var $url = $(`<li class="link">${tab.url}</li>`).appendTo($wrapper);
            var $delTab = $('<input class="delTab" type="button" value="x"></input>').appendTo($li);
            $delTab.click(tab.close.bind(this, $wrapper)); 
            $('#open-tabs').append($wrapper);
        });
    }
}