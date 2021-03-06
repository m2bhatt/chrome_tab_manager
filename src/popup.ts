import * as moment from 'moment';
import * as $ from 'jquery';
import Tab from './tab';
import TabCollection from './tab_collection';

var tabs;

$(function() {
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
    let tabCollection = new TabCollection(tabs);
    tabCollection.render($);
  });
});