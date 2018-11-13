import * as moment from 'moment';
import * as $ from 'jquery';
import Tab from './tab';

var tabs;

$(function() {
  function displayUrlsOfOpenTabs() {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
      tabs = tabs;
      tabs.forEach((tab) => {
        var $tabInfo = new Tab(tab).render($);
      //  $tabInfo.click(onWrapperClick);

        $('#open-tabs').append($tabInfo);
      });
    });
  }
  displayUrlsOfOpenTabs();

  function onWrapperClick(event) {
    var index = $(`.${event.target.className}`).index(event.target);
    chrome.tabs.highlight({tabs:[index]});
  }

  // function onDeleteClick(event) {
  //   var index = $(":button").index(event.target);
  //   chrome.tabs.remove({tabs:[index]});
  // }
});
