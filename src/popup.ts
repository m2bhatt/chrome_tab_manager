import * as moment from 'moment';
import * as $ from 'jquery';

$(function() {
  function displayUrlsOfOpenTabs() {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
      tabs.forEach((tab) => {
        var $wrapper = $("<div class='container'></div>"); 
        var $image = $(`<img class="favicon" src="${tab.favIconUrl}">`).appendTo($wrapper); 
        var $title = $(`<li class="title">${tab.title}</li>`).appendTo($wrapper);
        var $url = $(`<li class="link">${tab.url}</li>`).appendTo($wrapper);

        $wrapper.click(onWrapperClick);
        $('#open-tabs').append($wrapper);
      });
    });
  }
  displayUrlsOfOpenTabs();

  function onWrapperClick(event) {
    var index = $(`.${event.target.className}`).index(event.target);
    chrome.tabs.highlight({tabs:[index]});
  }
});
