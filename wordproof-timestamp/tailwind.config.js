module.exports = {
    corePlugins: {
        preflight: false,
    },
    theme: {
        fill: theme => ({
            'white': theme('colors.white'),
        }),
        extend: {
            colors: {
                yellowAccent: '#FDDD7E',
                wordproof: '#00CBA9',
                wordproofLight: '#00d5bc',
                wordproofVeryLight: '#a8e4d2',
                wordproofDark: '#009e86',
                blueish: '#f8faff',
                darkblue: '#0017B1'
            }
        },
        spacing: {
            px: '1px',
            '0': '0',
            '1': '4px',
            '2': '8px',
            '3': '12px',
            '4': '16px',
            '5': '20px',
            '6': '24px',
            '8': '32px',
            '10': '40px',
            '12': '48px',
            '16': '64px',
            '20': '80px',
            '24': '96px',
            '32': '128px',
            '40': '160px',
            '48': '192px',
            '56': '224px',
            '64': '256px',
        },
        fontSize: {
            'xs': '12px',
            'sm': '14px',
            'base': '16px',
            'lg': '18px',
            'xl': '20px',
            '2xl': '24px',
            '3xl': '30px',
            '4xl': '36px',
            '5xl': '48px',
            '6xl': '64px',
        },
        maxWidth: {
            '3xl': '768px',
            '4xl': '896px',
            '1/4': '25%',

        },
        borderRadius: {
            'none': '0',
            'sm': '2px',
            default: '4px',
            'lg': '8px',
            'full': '9999px',
        },
    }
};
