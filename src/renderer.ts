import TabCollection from './tab_collection';
import Tab from './tab';

class TabRenderer {
  tab: Tab;
  $tab: JQuery<HTMLElement>;

  constructor(tab: Tab) {
    this.tab = tab;
  }

  render($tabCollection) {
    var $tab = this.$tab = $tabCollection.append("<li class='subcontainer'></li>")
      .children(":last-child")
      .click(() => this.tab.highlight());

    $tab.append(`<img class="favicon" src="${this.tab.favIconUrl}">`); 
    $tab.append(`<text class="title">${this.escapeHtml(this.truncate(this.tab.title))}</text>`);

    $tab.append('<input class="delTab" type="button" value="&#10005"></input>')
         .children(":last-child")
         .click((e) => this.tab.close(e, () => $tab.remove()));

    $tab.append('<input class="pinTab" type="button"></input>')
      .children(":last-child")
      .click((e) => this.tab.pin(e));

    $tab.append(`<text class="link">${this.escapeHtml(this.truncate(this.tab.url))}</text>`);

  }

  show(condition: (tab: Tab) => Boolean) {
    if (condition(this.tab)) {
      this.$tab.show();
    } else {
      this.$tab.hide();
    }
  }
  
  private truncate(string: String) {
    var result = string;

    if (string.length > 40) {
      result = string.substring(0,40) + "...";
    }

    return result;
  }

  // TODO: find a better/easier way to escape HTML?
  private escapeHtml(string: String) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };

    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
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
    let $searchForm = $container.append("<form class='searchForm'><input class='searchInput' type='text' autofocus placeholder='Search'></form>").children(":last-child");
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