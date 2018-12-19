import TabCollection from './tab_collection';
import Tab from './tab';

describe(TabCollection, () => {
  var chrome = {
    tabs: {
      update: null,
      remove: null,
    }
  }

  it('supports searching by exact title', () => {
    let tabCollection = new TabCollection([
        createTab("Hello World"),
        createTab("Goodbye World")
    ]); // , {chrome: {tabs: {}}});
    let matches = tabCollection.search("Hello World");

    expect(matches).toBeInstanceOf(TabCollection);
    expect(matches.length()).toBe(1);
  });

  it('supports searching by partial title', () => {
    let tabCollection = new TabCollection([
       createTab("Hello World"),
       createTab("Goodbye World")
    ]); //, {chrome: {tabs: {}}});
    let matches = tabCollection.search("Hello");

    expect(matches).toBeInstanceOf(TabCollection);
    expect(matches.length()).toBe(1);
  });

  // Test forEach, append, and new TabCollection

  // -- Helper functions --

  function createTab(title) {
    return new Tab(createChromeTab(title), { chrome });
}

function createChromeTab(title) {
    return {
        id: 1,
        title: title,
        favIconUrl: 'https://google.com/fav.ico',
        url: 'google.com',
        pinned: false
    };
}
});