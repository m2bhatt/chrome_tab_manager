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
    ]);
    let matches = tabCollection.search("Hello World");

    expect(matches).toBeInstanceOf(TabCollection);
    expect(matches.length()).toBe(1);
  });

  it('supports searching by partial title', () => {
    let tabCollection = new TabCollection([
       createTab("Hello World"),
       createTab("Goodbye World")
    ]);
    let matches = tabCollection.search("Hello");

    expect(matches).toBeInstanceOf(TabCollection);
    expect(matches.length()).toBe(1);
  });

  it('search is case insensitive', () => {
    let tabCollection = new TabCollection([
      createTab("Hello World"),
      createTab("Goodbye World")
    ]);
    let matches = tabCollection.search("HELLO");

    expect(matches).toBeInstanceOf(TabCollection);
    expect(matches.length()).toBe(1);
  })

  // it('pinned tab appears at the top of the collection', () => {
  //   let tabCollection = new TabCollection([
  //     createTab("Hello World"),
  //     createTab("Goodbye World") //with pinned status
  //   ]);
  //   let matches = ;

  //   expect(matches).toBeInstanceOf(TabCollection);
  //   expect(matches.length()).toBe(1);
  // })

  // Test forEach, append, and new TabCollection

  it('creates a new TabCollection', () => {
    let tabCollection = new TabCollection([
      createTab("Hello World")
    ]);

    expect(tabCollection.length()).toBe(1);
  })

  // it('it can iterate through a TabCollection', () => {
  //   let tabCollection = new TabCollection([
  //     createTab("Hello World"),
  //     createTab("Bye World")
  //   ]);
  //   let matches = forEach(tabCollection);

  //   expect();
  // })

  it('append adds a tab to the TabCollection', () => {
    let tabCollection = new TabCollection();
    let tab = createTab("Hello World");
    tabCollection.append(tab)

    expect(tabCollection.tabs[0].title).toBe("Hello World");
    expect(tabCollection.length()).toBe(1);
  })

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