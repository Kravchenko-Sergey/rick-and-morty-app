import React from 'react'

export const themes = {
	dark: 'dark',
	light: 'light'
}

type ThemeContextType = {
	theme: string
	setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = React.createContext<ThemeContextType>({
	theme: '',
	setTheme: () => {}
})
