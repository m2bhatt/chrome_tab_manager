import TabCollection from './tab_collection';
import Tab from './tab';

describe(TabCollection, () => {
  it('supports searching by exact title', () => {
    // let tabCollection = new TabCollection([
    //     {title: "Hello World", pinned: false},
    //     {title: "Goodbye World", pinned: false}
    // ], {chrome: {tabs: {}}});
    // let matches = tabCollection.search("Hello World");

    // expect(matches).toBeInstanceOf(TabCollection);
    // expect(matches.length()).toBe(1);
  });

  it('supports searching by partial title', () => {
    // let tabCollection = new TabCollection([
    //     {title: "Hello World", pinned: false},
    //     {title: "Goodbye World", pinned: false}
    // ], {chrome: {tabs: {}}});
    // let matches = tabCollection.search("Hello");

    // expect(matches).toBeInstanceOf(TabCollection);
    // expect(matches.length()).toBe(1);
  });

  // Test forEach, append, and new TabCollection
});