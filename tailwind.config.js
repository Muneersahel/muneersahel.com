/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,ts}'],
	safelist: ['active'],
	important: true,
	theme: {
		fontFamily: {
			header: ['Inter', 'sans-serif'],
			body: [
				'Inter',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica',
				'Arial',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
			],
		},

		screens: {
			xs: '375px',
			...defaultTheme.screens,
		},

		container: {
			center: true,
			padding: '1rem',
		},

		shadows: {
			default: '0 2px 18px rgba(0, 0, 0, 0.06)',
			md: '0 -3px 36px rgba(0, 0, 0, 0.12)',
		},

		extend: {
			colors: {
				transparent: 'transparent',
				primary: '#007641',
				secondary: '#252426',
				white: '#ffffff',
				black: '#000000',
				yellow: '#f9e71c',
				lila: '#e6e5ec',
				'hero-gradient-from': 'rgba(46, 174, 85, 0.95)',
				'hero-gradient-to': 'rgba(47, 144, 65, 0.93)',
				'blog-gradient-from': '#8f9098',
				'blog-gradient-to': '#222222',
			},

			spacing: {
				13: '3.25rem',
				15: '3.75rem',
				17: '4.25rem',
				18: '4.5rem',
				19: '4.75rem',
				42: '10.5rem',
				76: '19rem',
				84: '21rem',
				88: '22rem',
				92: '23rem',
				100: '25rem',
				104: '26rem',
				108: '27rem',
				112: '28rem',
				116: '29rem',
				120: '30rem',
				124: '31rem',
				128: '32rem',
				132: '33rem',
				136: '34rem',
				140: '35rem',
				144: '36rem',
				148: '37rem',
				152: '38rem',
				156: '39rem',
				160: '40rem',
				164: '41rem',
				168: '42rem',
				172: '43rem',
				176: '44rem',
				180: '45rem',
				184: '46rem',
				188: '47rem',
				190: '48rem',
				194: '49rem',
				200: '50rem',
				204: '51rem',
			},
			zIndex: {
				'-1': '-1',
				60: '60',
				70: '70',
			},
			inset: {
				'2/5': '40%',
			},
		},
	},
	plugins: [],
};
