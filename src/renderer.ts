import TabCollection from './tab_collection';
import Tab from './tab';

class TabRenderer {
  tab: Tab;
  $tab: JQuery<HTMLElement>;

  constructor(tab: Tab) {
    this.tab = tab;
  }

  render($tabCollection) {
    var $tab = this.$tab = $tabCollection.append("<li class='subcontainer'></li>").children(":last-child");

    $tab.append(`<img class="favicon" src="${this.tab.favIconUrl}">`); 
    $tab.append(`<text class="title">${this.tab.title.substring(0,35)}</text>`)

    $tab.append('<input class="delTab" type="button" value="x"></input>')
         .children(":last-child")
         .click(() => this.tab.close(() => $tab.remove()));

    $tab.append('<input class="pinTab" type="button" value="p"></input>')
      .children(":last-child")
      .click(() => this.tab.pin());
  }

  show(condition: (tab: Tab) => Boolean) {
    if (condition(this.tab)) {
      this.$tab.show();
    } else {
      this.$tab.hide();
    }
  }
}

class TabCollectionRenderer {
  tabs: TabCollection;
  tabRenderers: TabRenderer[];

  constructor(tabs: TabCollection) {
    this.tabs = tabs;
    this.tabRenderers = [];
  }

  render($container) {
    let $tabCollection = $container.append("<ul class='container'></ul>").children(":last-child");
    this.tabs.forEach(tab => {
      let tabRenderer = new TabRenderer(tab);
      this.tabRenderers.push(tabRenderer);
      tabRenderer.render($tabCollection);
    });
  }

  filter(query) {
    for(let tabRenderer of this.tabRenderers) {
      tabRenderer.show((tab) => tab.query(query))
    }
  }
}

class SearchFormRenderer {
  searchCallback = null;

  render($container) {
    let $searchForm = $container.append("<form class='searchInput'><input type='text' placeholder='Search tabs'></form>").children(":last-child");
    $searchForm.submit((event) => this.search(event));
  }

  search(eventOrCallback) {
    if (typeof eventOrCallback == "function") {
      this.searchCallback = eventOrCallback;
    } else {
      eventOrCallback.preventDefault();
      let query = (eventOrCallback.target.children[0] as HTMLInputElement).value;
      this.searchCallback(query);
    }
  }
}

export default class Renderer {
  $app: JQuery<HTMLElement>;
  
  constructor($app: JQuery<HTMLElement>) {
    this.$app = $app;
  }

  render(tabCollection: TabCollection) {
    let searchFormRenderer = new SearchFormRenderer()
    searchFormRenderer.render(this.$app);

    let tabCollectionRenderer = new TabCollectionRenderer(tabCollection)
    tabCollectionRenderer.render(this.$app);

    searchFormRenderer.search((query) => tabCollectionRenderer.filter(query));
  }
}