import * as $ from 'jquery';
import TabCollection from './tab_collection';
import Tab from './tab';

export default class Renderer {
  tabCollection: TabCollection;

  constructor(tabCollection: TabCollection) {
    this.tabCollection = tabCollection;
  }

  // <form class="searchInput"><input type="text" placeholder="Search tabs">
  // </form>
  render($container: JQuery<HTMLElement>) {
    let $tabCollection = $container.append("<ul class='container'></ul>").children(":last-child");
    this.tabCollection.forEach(tab => this.renderTab(tab).appendTo($tabCollection));
    $tabCollection.appendTo($container);
  }
  
  private renderTab(tab: Tab) {
    var $tab = $("<li class='subcontainer'></li>");

    $(`<img class="favicon" src="${tab.favIconUrl}">`).appendTo($tab); 
    $(`<text class="title">${tab.title.substring(0,35)}</text>`).appendTo($tab);

    $('<input class="delTab" type="button"><img="./images/push-pin-white"></input>')
      .appendTo($tab)
      .click(tab.close.bind(this));

    $('<input class="pinTab" type="button" value="p"></input>')
      .appendTo($tab)
      .click(tab.pin.bind(this));

    $(`<li class="link">${tab.url.substring(0,45)}</li>`).appendTo($tab);

    return $tab;
  }
}