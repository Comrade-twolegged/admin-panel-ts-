import { createSlice } from "@reduxjs/toolkit";

type Theme = 'light' | 'dark';

const localTheme = localStorage.getItem('theme');
const parsedTheme = localTheme ? JSON.parse(localTheme) : 'light';
const initialState: { theme: Theme } = {
    theme: parsedTheme,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', JSON.stringify(state.theme));
        },
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;