/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			...defaultTheme.fontFamily,
			sans: ['Myriad Pro', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				primary: '#00B9FF',
				secondary: '#ff3e00',
				'primary-shadow': '#0183B4',
				'secondary-shadow': '#BBBBBB',
				'app-white': '#ffffff',
				'app-black': '#000000',
				'disabled-bg': '#EBEBEB',
				'disabled-text': '#7A7A7A',
			},
			fontFamily: {
				test: ['Ebrima', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
