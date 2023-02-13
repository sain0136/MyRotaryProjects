/** @type {import('tailwindcss').Config} */
export const content = [
"./index.html",
"./src/**/*.{vue,js,ts,jsx,tsx}",
"./node_modules/flowbite/**/*.js",
];
export const theme = {
extend: {
typography: {
DEFAULT: {
css: {
color: "#212427",
a: {
color: "#212427",
"&:hover": {
color: "#ffb607",
},
},
},
},
},
colors: {
"primary-color": "#ffb607",
"primary-black": "#212427",
"primary-white": "#F5F5FA",
"primary-green": "#5cb85c",
"primary-error": "#ff3333",
},
fontFamily: {
baseSans: [
"Space Grotesk",
"-apple-system",
"BlinkMacSystemFont",
'"Segoe UI"',
"Roboto",
'"Helvetica Neue"',
"Arial",
'"Noto Sans"',
"sans-serif",
'"Apple Color Emoji"',
'"Segoe UI Emoji"',
'"Segoe UI Symbol"',
'"Noto Color Emoji"',
],
},
},
};
export const plugins = [require("flowbite/plugin"), require("flowbite-typography")];
