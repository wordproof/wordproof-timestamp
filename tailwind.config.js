module.exports = {
	content: ['./resources/**/*.{html,js}'],
	purge: [ './resources/**/*.{html,js}' ],
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {},
	},
};
