import Tab, {ChromeTab} from './tab';
import Renderer from './renderer'

export default class TabCollection {
    readonly tabs: Tab[];
   // readonly length: number;
    readonly options;

    constructor(tabs: ChromeTab[], options = { chrome: { tabs: null } }) {
        this.options = options;
        this.tabs = [];
        tabs.forEach((tab) => {
            this.tabs.push(new Tab(tab, options));
        });
       // this.length = this.tabs.length;
    }

    length() {
        return this.tabs.length;
    };

    search(query) {
        let tabCollection = new TabCollection ([], this.options);
        for (let tab of this.tabs) {
            if (tab.title.indexOf(query) !== -1) {
                tabCollection.tabs.push(tab);
            } 
        }
        return tabCollection;
    }

    // render($) {
    //     this.tabs.forEach((tab) => {
    //         var $tabInfo = tab.render($);
    //         $('#open-tabs').append($tabInfo);
    //     });
    // }
}