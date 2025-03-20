import React, { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

const darkThemeColors = {
    background: "rgba(10, 10, 18, 1)", // Darker background for better contrast
    backgroundLight: "rgba(28, 28, 38, 1)", // Slightly lighter for components
    backgroundDark: "rgba(18, 18, 28, 1)", // Darker variant for certain elements
    text: "rgba(240, 240, 250, 1)", // Brighter white for better readability
    textSecondary: "rgba(180, 180, 210, 1)", // Secondary text color
    accent: "rgba(88, 130, 252, 1)", // Vibrant blue accent
    accentHover: "rgba(100, 145, 255, 1)", // Lighter accent for hover states
    red: "rgba(255, 85, 100, 1)", // Vivid crimson red
    green: "rgba(50, 200, 120, 1)", // Bright mint green
    border: "rgba(70, 70, 90, 1)", // More visible border color
    cardBg: "rgba(35, 35, 45, 1)", // Specific card background
}

const lightThemeColors = {
    background: "rgba(247, 248, 252, 1)", // Crisp light background
    backgroundLight: "rgba(255, 255, 255, 1)", // White for components
    backgroundDark: "rgba(240, 242, 250, 1)", // Slightly darker for certain elements
    text: "rgba(20, 22, 36, 1)", // Dark text for better contrast
    textSecondary: "rgba(80, 82, 100, 1)", // Secondary text color
    accent: "rgba(32, 90, 220, 1)", // Deeper blue for better visibility
    accentHover: "rgba(40, 100, 230, 1)", // Hover state for accent
    red: "rgba(220, 60, 80, 1)", // Bold red
    green: "rgba(30, 160, 90, 1)", // Rich emerald green
    border: "rgba(210, 215, 230, 1)", // More visible border color
    cardBg: "rgba(252, 253, 255, 1)", // Specific card background
}

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem("theme")
        return savedTheme
            ? savedTheme === "dark"
            : window.matchMedia("(prefers-color-scheme: dark)").matches
    })

    // Save theme preference to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")

        // Add a class to the document body to help with global styling
        document.body.classList.toggle("dark-theme", isDarkMode)
        document.body.classList.toggle("light-theme", !isDarkMode)
    }, [isDarkMode])

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
