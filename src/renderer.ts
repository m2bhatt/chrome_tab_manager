import TabCollection from './tab_collection';
import Tab from './tab';

export default class Renderer {
  $app: JQuery<HTMLElement>;
  
  constructor($app: JQuery<HTMLElement>) {
    this.$app = $app;
  }

  render(tabCollection: TabCollection) {
    let $search = this.$app.append("<form class='searchInput'><input type='text' placeholder='Search tabs'></form>").children(":last-child");
    let $tabCollection = this.$app.append("<ul class='container'></ul>").children(":last-child");
    tabCollection.forEach(tab => this.renderTab(tab, $tabCollection));
    let renderer = this;
 
    $search.submit((input) => {
      input.preventDefault();

      let query = (input.target.children[0] as HTMLInputElement).value;
      let filteredTabCollection = tabCollection.search(query);
      $tabCollection.remove();
      renderer.render(filteredTabCollection);
    })
  }
  
  private renderTab(tab: Tab, $tabCollection) {
    var $tab = $tabCollection.append("<li class='subcontainer'></li>").children(":last-child");

    $tab.append(`<img class="favicon" src="${tab.favIconUrl}">`); 
    $tab.append(`<text class="title">${tab.title.substring(0,35)}</text>`)

    $tab.append('<input class="delTab" type="button" value="x"></input>')
         .children(":last-child")
         .click(() => tab.close(() => $tab.remove()));

    $tab.append('<input class="pinTab" type="button" value="p"></input>')
      .children(":last-child")
      .click(() => tab.pin());

    // $(`<li class="link">${tab.url.substring(0,45)}</li>`).appendTo($tab);

    return $tab;
  }

  private handleClickEvent() {

  }
}