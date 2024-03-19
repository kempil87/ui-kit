/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export const colors = {
  bg: '#0a0a0b',
  primary: '#50DCFE',
  lime: '#CBFF00',
  green: '#7EED00',
  blue: '#4F59F9',
  violet: '#8112FF',
  red: '#FF604B',
  grey: '#A0A0A0',
  light_grey: '#F4F4F4',
  gold: '#FFC300',
  border: '#27272a',
  accent: '#18181c',
  placeholder: '#828283'
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors
    },
    screens: {
      m320: '320px',
      m375: '375px',
      m475: '475px',
      m492: '492px',
      m576: '576px',
      m595: '595px',
      xl1400: '1400px',
      xl1600: '1600px',
      menu: '1280px',
      pagination730: '730px',
      cont: '1250px',
      ...defaultTheme.screens
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      default: '3px'
    },
    borderWidth: {
      ...defaultTheme.borderWidth,
      '3': '3px'
    },
    fontSize: {
      ...defaultTheme.fontSize,
      '10': '10px'
    },
    zIndex: {
      ...defaultTheme.zIndex,
      'full':'999'
    },
  },
  variants: {
    extend: {},
    lineClamp: ['responsive', 'hover']
  },
  plugins: [
    function({ addUtilities, theme, addVariant }) {
      const spacing = theme('width');

      const sizeUtility = Object.entries(spacing).reduce(
        (acc, [key, value]) => {
          acc[`.size-${key.replace(/[./]/g, '\\$&')}`] = {
            width: value,
            height: value
          };
          acc[`.min-size-${key.replace(/[./]/g, '\\$&')}`] = {
            'min-width': value,
            'min-height': value
          };
          acc[`.max-size-${key.replace(/[./]/g, '\\$&')}`] = {
            'max-width': value,
            'max-height': value
          };
          return acc;
        },
        {}
      );

      addVariant('children', '& > *');
      addVariant('children-after', '& > *:after');

      addUtilities({
        ...sizeUtility,
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        '.flex-between': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        '.pos-abs': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        '.pos-abs-x': {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        },
        '.pos-abs-y': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        },
      });
    }
  ],
  corePlugins: {
    container: false
  },
  future: {
    hoverOnlyWhenSupported: true
  }
};
