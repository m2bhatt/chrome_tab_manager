import * as $ from 'jquery';
import TabCollection from './tab_collection';
import Renderer from './renderer'

$(async function() {
  let tabCollection = await TabCollection.intializeWithChromeAPI(chrome);
  new Renderer(tabCollection).render($('#tab-manager'));
});