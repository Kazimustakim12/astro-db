/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const { addDynamicIconSelectors } = require('@iconify/tailwind')
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx,astro,js}',
		'./components/**/*.{ts,tsx,astro,js}',
		'./app/**/*.{ts,tsx,astro,js}',
		'./src/**/*.{ts,tsx,astro,js}',
		'./node_modules/preline/preline.js',
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'node_modules/preline/dist/*.js'
	],
	prefix: '',
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				md: '2rem',
				lg: '2rem',
				xl: '2rem',
				'2xl': '2rem'
			},
			center: true
		},
		extend: {
			fontFamily: {
				plus: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				// dbgreen: {
				// 	50: '#ebfff5',
				// 	100: '#d5fee9',
				// 	200: '#a6fdd0',
				// 	300: '#73fdb5',
				// 	400: '#51fd9f',
				// 	500: '#40fd91',
				// 	600: '#37fe89',
				// 	700: '#2ce276',
				// 	800: '#20c867',
				// 	900: '#00ad56'
				// },
				dbgreen: {
					50: '#f1fcf2',
					100: '#defae4',
					200: '#bef4c9',
					300: '#8bea9f',
					400: '#52d66f',
					500: '#28b247',
					600: '#1d9c3a',
					700: '#1b7a30',
					800: '#1a612b',
					900: '#175026',
					950: '#072c11'
				}
			},
			animation: {
				marquee: 'marquee var(--duration) linear infinite',
				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
			},
			keyframes: {
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-100% - var(--gap)))' }
				},
				'marquee-vertical': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(calc(-100% - var(--gap)))' }
				}
			}
		}
	},
	plugins: [
		addDynamicIconSelectors(),
		require('preline/plugin'),
		require('tailwindcss-animate'),
		function ({ addComponents }) {
			addComponents({
				'.container': {
					maxWidth: '100%',
					'@screen sm': {
						maxWidth: '640px'
					},
					'@screen md': {
						maxWidth: '100%'
					},
					'@screen lg': {
						maxWidth: '1024px'
					},
					'@screen xl': {
						maxWidth: '1280px'
					},
					'@screen 2xl': {
						maxWidth: '1536px'
					}
				}
			})
		}
	]
}
