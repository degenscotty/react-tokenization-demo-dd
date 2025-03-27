import React, { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

const darkThemeColors = {
    background: "#121212",
    backgroundSecondary: "#1E1E1E",
    backgroundLight: "#1E1E1E",
    backgroundDark: "#0A0A0A",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    accent: "#FFB800",
    accentHover: "#FFC733",
    border: "#2A2A2A",
    button: "#1E1E1E",
    buttonHover: "#2A2A2A",
    green: "#4ADE80",
    red: "#FF4C4C",
    cardBg: "#1E1E1E",
    cardHighlight: "#2A2A2A",
    glass: "rgba(30, 30, 30, 0.6)",
    shadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
}

const lightThemeColors = {
    background: "#EFE6D9", // Light beige/tan background from the image
    backgroundSecondary: "#F5F0E8", // Slightly lighter beige for secondary backgrounds
    backgroundLight: "#FFFFFF",
    backgroundDark: "#E5DCD0",
    text: "#8C583C", // Brown text color for main content
    textSecondary: "#A67B60", // Lighter brown for secondary text
    accent: "#EE952A", // Reddish-brown accent color from the Foundation branding
    accentHover: "#F3A84C", // Lighter version of accent for hover states
    border: "#D3C5B6", // Light brown border color
    button: "#B27553", // Button background color like the "Trade Now" button
    buttonHover: "#96532A", // Darker brown for button hover state
    green: "#6A8D73", // Earthy green that matches the theme
    red: "#C25D45", // Earthy red that matches the theme
    cardBg: "#F5F0E8", // Same as backgroundSecondary
    cardHighlight: "#FFFFFF", // White highlight for cards
    glass: "rgba(245, 240, 232, 0.7)", // Semi-transparent version of backgroundSecondary
    shadow: "0 10px 25px rgba(140, 88, 60, 0.1)", // Shadow using text color with low opacity
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

        // Add smooth transitions to all elements
        document.documentElement.style.setProperty("--transition-speed", "0.3s")
        document.documentElement.style.setProperty(
            "--transition-timing",
            "cubic-bezier(0.4, 0, 0.2, 1)",
        )
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
