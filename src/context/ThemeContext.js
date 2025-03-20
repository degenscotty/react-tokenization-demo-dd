import React, { createContext, useContext, useState } from "react"

const ThemeContext = createContext()

const darkThemeColors = {
    background: "rgba(15, 15, 20, 1)", // Deep navy black
    backgroundLight: "rgba(30, 30, 40, 1)", // Soft dark blue
    text: "rgba(235, 235, 245, 1)", // Warm off-white
    accent: "rgba(80, 150, 255, 1)", // Electric blue (popping accent)
    red: "rgba(255, 85, 100, 1)", // Vivid crimson red
    green: "rgba(50, 200, 120, 1)", // Bright mint green
}

const lightThemeColors = {
    background: "rgba(250, 250, 255, 1)", // Soft white with a blue tint
    backgroundLight: "rgba(235, 235, 245, 1)", // Cool light gray
    text: "rgba(25, 25, 35, 1)", // Dark navy gray for soft contrast
    accent: "rgba(0, 120, 255, 1)", // Vibrant cobalt blue
    red: "rgba(230, 70, 80, 1)", // Bold red with warmth
    green: "rgba(40, 170, 90, 1)", // Rich emerald green
}

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {})

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev)
    const colors = isDarkMode ? darkThemeColors : lightThemeColors

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
