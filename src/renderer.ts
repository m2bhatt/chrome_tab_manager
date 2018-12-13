import TabCollection from './tab_collection';
import Tab from './tab';

export default class Renderer {
  $app: JQuery<HTMLElement>;
  
  constructor($app: JQuery<HTMLElement>) {
    this.$app = $app;
  }

  // <form class="searchInput"><input type="text" placeholder="Search tabs">
  // </form>
  render(tabCollection: TabCollection) {
    let $tabCollection = this.$app.append("<ul class='container'></ul>").children(":last-child");
    tabCollection.forEach(tab => this.renderTab(tab, $tabCollection));
  }
  
  private renderTab(tab: Tab, $tabCollection) {
    var $tab = $tabCollection.append("<li class='subcontainer'></li>").children(":last-child");

    $tab.append(`<img class="favicon" src="${tab.favIconUrl}">`); 
    $tab.append(`<text class="title">${tab.title.substring(0,35)}</text>`)

    // $('<input class="delTab" type="button"><img="./images/push-pin-white"></input>')
    //   .appendTo($tab)
    //   .click(tab.close.bind(this));

    // $('<input class="pinTab" type="button" value="p"></input>')
    //   .appendTo($tab)
    //   .click(tab.pin.bind(this));

    // $(`<li class="link">${tab.url.substring(0,45)}</li>`).appendTo($tab);

    return $tab;
  }
}