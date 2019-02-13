import TabCollection from './tab_collection';
import Tab from './tab';

const ARROW_DOWN = 40;
const ARROW_UP = 38;
const ENTER = 13;

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
         .click((e: Event) => {
           e.stopPropagation();
           this.tab.close(() => $tab.remove())
         });

    $tab.append('<input class="pinTab" type="button"></input>')
      .children(":last-child")
      .click((e: Event) => {
        e.stopPropagation();
        this.tab.pin();
      });

    $tab.append(`<text class="link">${this.escapeHtml(this.truncate(this.tab.url))}</text>`);
  }

  select() {

  }

  deselect() {

  }

  open() {

  }

  isVisible() {
    return this.$tab.is(":visible");
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

  selectNextTab() {

  }

  selectPreviousTab() {

  }

  openSelectedTab() {

  }

  select(selectedTab) {
    let visibleTabs = []
    for(let tabRenderer of this.tabRenderers) {
      if (tabRenderer.isVisible()) visibleTabs.push(tabRenderer.tab);
    }

    visibleTabs[selectedTab].highlight();
  }
}

class SearchFormRenderer {
  searchCallback = null;

  constructor(searchCallback) {
    this.searchCallback = searchCallback;
  }

  render($container) {
    let $inputField = $container.append("<input class='searchInput' type='text' autofocus placeholder='Search' />").children(":last-child");
    $inputField.on("change keyup", (event) => this.search(event));
  }

  search(event) {
    if (event.keyCode == ARROW_UP || event.keyCode == ARROW_DOWN) return;

    event.preventDefault();
    let query = (event.target as HTMLInputElement).value;
    this.searchCallback(query);
  }
}

export default class Renderer {
  $app: JQuery<HTMLElement>;
  
  constructor($app: JQuery<HTMLElement>) {
    this.$app = $app;
  }

  render(tabCollection: TabCollection) {
    let searchFormRenderer = new SearchFormRenderer((query) => tabCollectionRenderer.filter(query))
    searchFormRenderer.render(this.$app);

    let tabCollectionRenderer = new TabCollectionRenderer(tabCollection)
    tabCollectionRenderer.render(this.$app);

    var selectedTab = 0;
    this.$app.keyup((event) => {
      if (event.keyCode == ARROW_DOWN) {
        selectedTab += 1 // can be removed once selectNextTab is implemented
        tabCollectionRenderer.selectNextTab();
      } else if (event.keyCode == ARROW_UP) {
        selectedTab -= 1 // can be removed once selectPreviousTab is implemented
        tabCollectionRenderer.selectPreviousTab();
      } else if (event.keyCode == ENTER) {
        tabCollectionRenderer.select(selectedTab); // can be removed once openSelectedTab is implemented
        tabCollectionRenderer.openSelectedTab();
      }
    });
  }
}