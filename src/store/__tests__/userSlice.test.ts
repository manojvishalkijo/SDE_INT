import userReducer, { toggleCategory, toggleTheme, toggleBookmark } from '../userSlice';

describe('userSlice reducer', () => {
  const initialState = {
    favoriteCategories: ['Technology'],
    theme: 'light' as 'light' | 'dark',
    bookmarkedItems: [],
    searchQuery: '',
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      favoriteCategories: ['Technology', 'Trending', 'Movies'],
      theme: 'dark',
      bookmarkedItems: [],
      searchQuery: '',
    });
  });

  it('should handle toggleCategory', () => {
    const actual = userReducer(initialState, toggleCategory('Sports'));
    expect(actual.favoriteCategories).toContain('Sports');
    
    // Toggle again to remove
    const toggledOff = userReducer(actual, toggleCategory('Sports'));
    expect(toggledOff.favoriteCategories).not.toContain('Sports');
  });

  it('should handle toggleTheme', () => {
    const actual = userReducer(initialState, toggleTheme());
    expect(actual.theme).toEqual('dark');
  });

  it('should handle toggleBookmark', () => {
    const actual = userReducer(initialState, toggleBookmark('item-1'));
    expect(actual.bookmarkedItems).toContain('item-1');

    const toggledOff = userReducer(actual, toggleBookmark('item-1'));
    expect(toggledOff.bookmarkedItems).not.toContain('item-1');
  });
});
