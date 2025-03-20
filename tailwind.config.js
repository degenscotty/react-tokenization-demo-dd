/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Adjust this based on your file structure
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Segoe UI"],
                serif: ["Segoe UI"],
                mono: ["Segoe UI"],
            },
        },
    },
    plugins: [],
}
