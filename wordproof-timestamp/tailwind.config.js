module.exports = {
    theme: {
        fill: theme => ({
            'white': theme('colors.white'),
        }),
        extend: {
            colors: {
                yellowAccent: '#FDDD7E',
                wordproof: '#00CBA9',
                wordproofLight: '#00d5bc',
                wordproofDark: '#009e86',
                blueish: '#f8faff',
                darkblue: '#0017B1'
            }
        },
        corePlugins: {
            preflight: true,
        }
    }
};
