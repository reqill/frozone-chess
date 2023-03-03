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
				'primary-light': '#00C2FF',
				'primary-disabled': '#94BECE',
				'primary-shadow': '#0183B4',
				'primary-shadow-light': '#00A0D0',
				'primary-shadow-disabled': '#7A9FAC',
				'secondary-shadow': '#BBBBBB',
				'app-white': '#ffffff',
				'app-bg': '#F3F3F3',
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
