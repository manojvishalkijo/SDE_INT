import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  favoriteCategories: string[];
  theme: 'light' | 'dark';
  bookmarkedItems: string[];
  searchQuery: string;
}

const initialState: UserState = {
  favoriteCategories: ['Technology', 'Trending', 'Movies'],
  theme: 'dark', // Modern default
  bookmarkedItems: [],
  searchQuery: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.favoriteCategories.includes(category)) {
        state.favoriteCategories = state.favoriteCategories.filter(c => c !== category);
      } else {
        state.favoriteCategories.push(category);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.bookmarkedItems.includes(id)) {
        state.bookmarkedItems = state.bookmarkedItems.filter(i => i !== id);
      } else {
        state.bookmarkedItems.push(id);
      }
    },
    reorderBookmarks: (state, action: PayloadAction<string[]>) => {
      state.bookmarkedItems = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  },
});

export const { toggleCategory, setTheme, toggleTheme, toggleBookmark, reorderBookmarks, setSearchQuery } = userSlice.actions;
export default userSlice.reducer;
