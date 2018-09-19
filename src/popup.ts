import * as moment from 'moment';
import * as $ from 'jquery';

$(function() {
  function displayUrlsOfOpenTabs() {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
      tabs.forEach((tab) => {
        $('#open-tabs').append(`<li>${tab.title}</li>`)
      });
    });
  }

  displayUrlsOfOpenTabs();
});
